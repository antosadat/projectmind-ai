const MAX_TASKS = 3000;
const STALE_HOURS = 30;

const SCHEMA = `CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  file_name TEXT,
  source_type TEXT NOT NULL DEFAULT 'manual',
  data_date TEXT,
  last_updated_at TEXT NOT NULL,
  record_count INTEGER NOT NULL DEFAULT 0,
  data_quality REAL NOT NULL DEFAULT 100,
  version INTEGER NOT NULL DEFAULT 1,
  source_hash TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS refreshes (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  source_file TEXT,
  source_object_key TEXT,
  source_hash TEXT,
  data_date TEXT,
  uploaded_at TEXT NOT NULL,
  processed_at TEXT NOT NULL,
  records_received INTEGER NOT NULL DEFAULT 0,
  records_valid INTEGER NOT NULL DEFAULT 0,
  records_rejected INTEGER NOT NULL DEFAULT 0,
  changed_records INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL,
  error_message TEXT,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS project_tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  task_key TEXT NOT NULL,
  task TEXT NOT NULL,
  status TEXT,
  stream TEXT,
  pic TEXT,
  eta TEXT,
  priority TEXT,
  dependency TEXT,
  action TEXT,
  percent TEXT,
  impact TEXT,
  issue TEXT,
  alert TEXT,
  refresh_id TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(refresh_id) REFERENCES refreshes(id) ON DELETE CASCADE,
  UNIQUE(project_id, task_key)
);

CREATE TABLE IF NOT EXISTS task_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  task_key TEXT NOT NULL,
  refresh_id TEXT NOT NULL,
  task TEXT NOT NULL,
  status TEXT,
  stream TEXT,
  pic TEXT,
  eta TEXT,
  priority TEXT,
  dependency TEXT,
  action TEXT,
  percent TEXT,
  impact TEXT,
  issue TEXT,
  alert TEXT,
  captured_at TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY(refresh_id) REFERENCES refreshes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT NOT NULL,
  object_key TEXT NOT NULL UNIQUE,
  file_name TEXT NOT NULL,
  content_type TEXT,
  size_bytes INTEGER NOT NULL DEFAULT 0,
  etag TEXT,
  uploaded_at TEXT NOT NULL,
  FOREIGN KEY(project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS audit_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id TEXT,
  event_type TEXT NOT NULL,
  actor TEXT,
  detail TEXT,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_refresh_project_date ON refreshes(project_id, processed_at DESC);
CREATE INDEX IF NOT EXISTS idx_tasks_project_status ON project_tasks(project_id, status);
CREATE INDEX IF NOT EXISTS idx_history_project_task ON task_history(project_id, task_key, captured_at DESC);
CREATE INDEX IF NOT EXISTS idx_documents_project ON documents(project_id, uploaded_at DESC);
CREATE INDEX IF NOT EXISTS idx_audit_project ON audit_logs(project_id, created_at DESC);`;

export async function ensureSchema(db){
  if(!db) throw new Error('ProjectMind D1 binding is not configured');
  await db.exec(SCHEMA);
}

function clean(v,max=2000){
  return String(v ?? '').trim().slice(0,max);
}
function id(v){return clean(v,120);}
function taskKey(t){
  return (clean(t.task,500).toLowerCase()+'|'+clean(t.stream||'General',200).toLowerCase()).slice(0,700);
}
function nowIso(){return new Date().toISOString();}
function freshness(lastUpdated){
  if(!lastUpdated)return {status:'NO DATA',ageMinutes:null};
  const ageMinutes=Math.max(0,Math.round((Date.now()-new Date(lastUpdated).getTime())/60000));
  return {status:ageMinutes<=STALE_HOURS*60?'FRESH':'STALE',ageMinutes};
}
async function actorFrom(ctx){
  try{
    const i=ctx?.access?.getIdentity ? await ctx.access.getIdentity() : null;
    return i?.email || i?.user_uuid || 'authenticated-user';
  }catch(e){return 'authenticated-user'}
}
export async function requireAccess(ctx){
  if(!ctx?.access?.getIdentity)return null;
  try{return await ctx.access.getIdentity()}catch(e){return null}
}

export async function listProjects(db){
  await ensureSchema(db);
  const p=await db.prepare(`SELECT id,name,file_name,source_type,data_date,last_updated_at,record_count,data_quality,version,source_hash,created_at FROM projects ORDER BY name`).all();
  const projects=[];
  for(const row of p.results||[]){
    const t=await db.prepare(`SELECT task,task_key,status,stream,pic,eta,priority,dependency,action,percent,impact,issue,alert,updated_at FROM project_tasks WHERE project_id=? ORDER BY id`).bind(row.id).all();
    projects.push({...row,freshness:freshness(row.last_updated_at),tasks:t.results||[]});
  }
  return projects;
}

export async function getProject(db,projectId){
  await ensureSchema(db);
  const p=await db.prepare(`SELECT id,name,file_name,source_type,data_date,last_updated_at,record_count,data_quality,version,source_hash,created_at FROM projects WHERE id=?`).bind(id(projectId)).first();
  if(!p)return null;
  const t=await db.prepare(`SELECT task,task_key,status,stream,pic,eta,priority,dependency,action,percent,impact,issue,alert,updated_at FROM project_tasks WHERE project_id=? ORDER BY id`).bind(p.id).all();
  const r=await db.prepare(`SELECT id,source_file,source_object_key,source_hash,data_date,uploaded_at,processed_at,records_received,records_valid,records_rejected,changed_records,status,error_message FROM refreshes WHERE project_id=? ORDER BY processed_at DESC LIMIT 20`).bind(p.id).all();
  const d=await db.prepare(`SELECT object_key,file_name,content_type,size_bytes,etag,uploaded_at FROM documents WHERE project_id=? ORDER BY uploaded_at DESC LIMIT 50`).bind(p.id).all();
  return {...p,freshness:freshness(p.last_updated_at),tasks:t.results||[],refreshes:r.results||[],documents:d.results||[]};
}

export async function syncProject(db,payload,ctx){
  await ensureSchema(db);
  const projectId=id(payload.projectId);
  const name=clean(payload.projectName||'ProjectMind Project',300);
  const sourceFile=clean(payload.sourceFile||'',500);
  const sourceObjectKey=clean(payload.sourceObjectKey||'',1000);
  const sourceHash=clean(payload.sourceHash||'',200);
  const dataDate=clean(payload.dataDate||new Date().toISOString().slice(0,10),30);
  const input=Array.isArray(payload.tasks)?payload.tasks:[];
  if(!projectId)throw new Error('projectId is required');
  if(input.length>MAX_TASKS)throw new Error('Task limit exceeded');
  const tasks=input.map(t=>({
    task:clean(t?.task,500),
    status:clean(t?.status,100),
    stream:clean(t?.stream||'General',200),
    pic:clean(t?.pic||'TBC',200),
    eta:clean(t?.eta||'TBC',100),
    priority:clean(t?.priority||'Normal',100),
    dependency:clean(t?.dependency,1000),
    action:clean(t?.action,2000),
    percent:clean(t?.percent,50),
    impact:clean(t?.impact,2000),
    issue:clean(t?.issue,2000),
    alert:clean(t?.alert,1000)
  })).filter(t=>t.task);

  const received=input.length, valid=tasks.length, rejected=received-valid;
  const quality=received?Math.round(valid/received*10000)/100:100;
  const previous=await db.prepare(`SELECT task_key,status,pic,eta,priority,dependency,action,percent,impact,issue FROM project_tasks WHERE project_id=?`).bind(projectId).all();
  const old=new Map((previous.results||[]).map(x=>[x.task_key,x]));
  let changed=0;
  for(const t of tasks){
    const o=old.get(taskKey(t));
    if(!o || ['status','pic','eta','priority','dependency','action','percent','impact','issue'].some(k=>String(o[k]??'')!==String(t[k]??'')))changed++;
  }
  const refreshId='r'+Date.now().toString(36)+Math.random().toString(36).slice(2,8);
  const timestamp=nowIso();
  const actor=clean((await actorFrom(ctx))||'authenticated-user',300);
  const stmts=[
    db.prepare(`INSERT INTO projects(id,name,file_name,source_type,data_date,last_updated_at,record_count,data_quality,version,source_hash,created_at)
      VALUES(?,?,?,?,?,?,?,?,?, ?,?)
      ON CONFLICT(id) DO UPDATE SET name=excluded.name,file_name=excluded.file_name,source_type=excluded.source_type,data_date=excluded.data_date,last_updated_at=excluded.last_updated_at,record_count=excluded.record_count,data_quality=excluded.data_quality,version=projects.version+1,source_hash=excluded.source_hash`)
      .bind(projectId,name,sourceFile,'upload',dataDate,timestamp,valid,quality,1,sourceHash,timestamp),
    db.prepare(`INSERT INTO refreshes(id,project_id,source_file,source_object_key,source_hash,data_date,uploaded_at,processed_at,records_received,records_valid,records_rejected,changed_records,status)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)`)
      .bind(refreshId,projectId,sourceFile,sourceObjectKey,sourceHash,dataDate,timestamp,timestamp,received,valid,rejected,changed,'SUCCESS'),
    db.prepare(`DELETE FROM project_tasks WHERE project_id=?`).bind(projectId)
  ];
  for(const t of tasks){
    stmts.push(db.prepare(`INSERT INTO project_tasks(project_id,task_key,task,status,stream,pic,eta,priority,dependency,action,percent,impact,issue,alert,refresh_id,updated_at)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(projectId,taskKey(t),t.task,t.status,t.stream,t.pic,t.eta,t.priority,t.dependency,t.action,t.percent,t.impact,t.issue,t.alert,refreshId,timestamp));
    stmts.push(db.prepare(`INSERT INTO task_history(project_id,task_key,refresh_id,task,status,stream,pic,eta,priority,dependency,action,percent,impact,issue,alert,captured_at)
      VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(projectId,taskKey(t),refreshId,t.task,t.status,t.stream,t.pic,t.eta,t.priority,t.dependency,t.action,t.percent,t.impact,t.issue,t.alert,timestamp));
  }
  stmts.push(db.prepare(`INSERT INTO audit_logs(project_id,event_type,actor,detail,created_at) VALUES(?,?,?,?,?)`)
    .bind(projectId,'DATA_REFRESH',actor,JSON.stringify({sourceFile,dataDate,received,valid,rejected,changed}),timestamp));
  await db.batch(stmts);
  return {refreshId,projectId,recordsReceived:received,recordsValid:valid,recordsRejected:rejected,changedRecords:changed,quality,lastUpdatedAt:timestamp};
}

export async function storeDocument(env,request,projectId,fileName){
  if(!env.R2)throw new Error('ProjectMind R2 binding is not configured');
  const safe=clean(fileName||'project-file',180).replace(/[^a-zA-Z0-9._-]+/g,'_');
  const key=`projects/${id(projectId)}/${Date.now()}-${safe}`;
  const obj=await env.R2.put(key,request.body,{httpMetadata:{contentType:request.headers.get('content-type')||'application/octet-stream'},customMetadata:{projectId:id(projectId),originalName:safe}});
  const ts=nowIso();
  await ensureSchema(env.PROJECTMIND_DB);
  await env.PROJECTMIND_DB.prepare(`INSERT INTO documents(project_id,object_key,file_name,content_type,size_bytes,etag,uploaded_at) VALUES(?,?,?,?,?,?,?)`)
    .bind(id(projectId),key,safe,request.headers.get('content-type')||'application/octet-stream',Number(request.headers.get('content-length')||obj?.size||0),obj?.httpEtag||obj?.etag||'',ts).run();
  return {key,etag:obj?.httpEtag||obj?.etag||'',size:obj?.size||0,uploadedAt:ts};
}

export async function runFreshnessAudit(db){
  if(!db)return;
  await ensureSchema(db);
  const rows=await db.prepare(`SELECT id,name,last_updated_at FROM projects`).all();
  const ts=nowIso();
  for(const p of rows.results||[]){
    const f=freshness(p.last_updated_at);
    if(f.status==='STALE'){
      await db.prepare(`INSERT INTO audit_logs(project_id,event_type,actor,detail,created_at) VALUES(?,?,?,?,?)`)
        .bind(p.id,'DATA_STALE','SYSTEM',JSON.stringify({name:p.name,lastUpdatedAt:p.last_updated_at,ageMinutes:f.ageMinutes}),ts).run();
    }
  }
}
