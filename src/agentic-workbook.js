const agenticScript = String.raw`(() => {
  const norm = v => String(v ?? '').toLowerCase().replace(/[^a-z0-9]/g,'');
  const headerWords = {
    task:/task|activity|action|item|deliverable|requirement|milestone|workstream|stream/i,
    status:/status|health|rag|state/i,
    owner:/pic|owner|responsible|assignee|accountable/i,
    date:/date|eta|finish|end|target|commit|deadline|due/i,
    risk:/risk|issue|blocker|dependency|attention|escalat/i
  };
  const classify = (name, rows) => {
    const text = (name+' '+rows.slice(0,12).flat().join(' ')).toLowerCase();
    if (/need.?attention|escalat/.test(text)) return 'Need Attention / Exception';
    if (/task.?pivot|pivot/.test(text)) return 'KPI / Pivot';
    if (/mpp|timeline|gantt|calendar|milestone/.test(text)) return 'Timeline / Milestone';
    if (/risk|raid|issue|blocker|dependency/.test(text)) return 'Risk / Issue / RAID';
    if (/solution|design|architecture/.test(text)) return 'Solution';
    if (/development|build|coding/.test(text)) return 'Development';
    if (/sit|system.?integration/.test(text)) return 'SIT';
    if (/uat|user.?acceptance/.test(text)) return 'UAT';
    if (/non.?functional|nft|performance|security|load.?test/.test(text)) return 'Non-Functional Test';
    if (/test|qa|quality|functional/.test(text)) return 'Functional Test';
    if (/environment|infra|readiness|connectivity|deployment|release/.test(text)) return 'Environment / Deployment';
    if (/change|cr|change.?request/.test(text)) return 'Change Management';
    if (/resource|capacity|staff/.test(text)) return 'Resource';
    if (/executive|summary|dashboard|management/.test(text)) return 'Executive / Summary';
    return 'General / Unclassified';
  };
  function analyzeSheet(name) {
    const raw = XLSX.utils.sheet_to_json(importBook.Sheets[name], {header:1, defval:'', raw:false, blankrows:false});
    const sample = raw.slice(0,80);
    let headerRow=-1, score=0;
    for(let i=0;i<Math.min(raw.length,20);i++){
      const h=raw[i].map(String);
      let s=0;
      Object.values(headerWords).forEach(rx=>{if(h.some(v=>rx.test(v)))s++});
      if(s>score){score=s;headerRow=i}
    }
    const headers=headerRow>=0?raw[headerRow].map(v=>String(v||'').trim()).filter(Boolean):[];
    const body=headerRow>=0?raw.slice(headerRow+1):raw;
    const text=body.flat().map(v=>String(v||'')).filter(Boolean);
    const statusCounts={};
    text.forEach(v=>{if(/delayed|overdue|late|blocked/i.test(v))statusCounts.Delayed=(statusCounts.Delayed||0)+1;
      else if(/at risk|risk|amber/i.test(v))statusCounts['At Risk']=(statusCounts['At Risk']||0)+1;
      else if(/completed|complete|done|closed/i.test(v))statusCounts.Completed=(statusCounts.Completed||0)+1;
      else if(/on track|green/i.test(v))statusCounts['On Track']=(statusCounts['On Track']||0)+1;});
    const taskHeaders=headers.filter(h=>headerWords.task.test(h));
    const dateHeaders=headers.filter(h=>headerWords.date.test(h));
    return {name,type:classify(name,sample),rows:raw.length,columns:Math.max(...raw.map(r=>r.length),0),headerRow:headerRow+1,headers:headers.slice(0,30),taskHeaders,dateHeaders,statusCounts};
  }
  function buildWorkbookIntelligence() {
    if(!importBook)return null;
    const sheets=importBook.SheetNames.map(analyzeSheet);
    const allText=sheets.map(s=>s.name+' ['+s.type+']: '+s.headers.join(', ')).join('\n');
    const exceptions=sheets.filter(s=>Object.keys(s.statusCounts).some(k=>k==='Delayed'||k==='At Risk'));
    const out={
      fileName:importFileName||'Workbook',
      worksheetCount:sheets.length,
      analyzedAt:new Date().toISOString(),
      sheets,
      exceptionSheets:exceptions.map(s=>({name:s.name,type:s.type,status:s.statusCounts})),
      projectCoverage:sheets.reduce((m,s)=>(m[s.type]=(m[s.type]||0)+1,m),{}),
      contextText:allText
    };
    const graph=buildImpactGraph(out);
    out.impactGraph=graph;
    out.impactSummary=impactSummary(graph);
    return out;
  }
  function workbookTasksAll() {
    if(!importBook)return [];
    const out=[];
    importBook.SheetNames.forEach(name=>{
      const meta=sheetMeta(importBook.Sheets[name],name);
      if(meta.usable>0){
        clean(meta.rows).forEach(t=>out.push({...t,sourceSheet:name}));
      }
    });
    const seen=new Set();
    return out.filter(t=>{const k=norm(t.task)+'|'+norm(t.stream)+'|'+norm(t.pic);if(seen.has(k))return false;seen.add(k);return true});
  }
  function buildImpactGraph(wi) {
    if(!importBook) return {nodes:[],edges:[],impacts:[]};
    const nodes=[], edges=[], byKey=new Map(), byName=new Map();
    const cleanKey=v=>String(v??'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    const addNode=(sheet,task,status,row)=> {
      const name=String(task||'').trim();
      if(!name) return null;
      const key=cleanKey(name);
      if(!key) return null;
      const id=sheet+'::'+row+'::'+key;
      const node={id,key,name,sheet,status:status||'Unknown',row};
      nodes.push(node);
      if(!byKey.has(key))byKey.set(key,[]);
      byKey.get(key).push(node);
      const short=key.replace(/\\b(the|a|an)\\b/g,'').trim();
      if(short){if(!byName.has(short))byName.set(short,[]);byName.get(short).push(node)}
      return node;
    };
    importBook.SheetNames.forEach(sheet=>{
      const raw=XLSX.utils.sheet_to_json(importBook.Sheets[sheet],{header:1,defval:'',raw:false,blankrows:false});
      let hi=-1,score=-1;
      for(let i=0;i<Math.min(raw.length,25);i++){
        const h=raw[i].map(v=>String(v||''));
        let s=0; if(h.some(v=>headerWords.task.test(v)))s++; if(h.some(v=>headerWords.status.test(v)))s++; if(h.some(v=>headerWords.owner.test(v)))s++; if(h.some(v=>headerWords.risk.test(v)))s++;
        if(s>score){score=s;hi=i}
      }
      if(hi<0)return;
      const headers=raw[hi].map((v,i)=>String(v||'').trim()||('Column '+(i+1)));
      const findCol=rx=>headers.findIndex(h=>rx.test(h));
      const ti=findCol(headerWords.task), si=findCol(headerWords.status), di=findCol(/dependency|blocker|prerequisite|upstream|preparation/i);
      if(ti<0)return;
      raw.slice(hi+1).forEach((r,idx)=>{
        const task=String(r[ti]||'').trim(); if(!task)return;
        const status=si>=0?String(r[si]||'').trim():'';
        const node=addNode(sheet,task,status,hi+idx+2); if(!node)return;
        if(di>=0){
          const dep=String(r[di]||'').trim();
          if(dep) node.dependency=dep;
        }
      });
    });
    const unique=(a,b,type,reason)=>{if(a&&b&&a.id!==b.id&&!edges.some(e=>e.from===a.id&&e.to===b.id&&e.type===type))edges.push({from:a.id,to:b.id,type,reason})};
    byKey.forEach(group=>{
      if(group.length>1) for(let i=1;i<group.length;i++) unique(group[0],group[i],'same_entity','Same normalized task across worksheets');
    });
    nodes.forEach(n=>{
      const dep=cleanKey(n.dependency||'');
      if(!dep)return;
      byKey.forEach((group,key)=>{ if(key && (dep.includes(key)||key.includes(dep))) group.forEach(target=>unique(n,target,'depends_on','Dependency text match')); });
    });
    const outgoing=new Map();
    edges.forEach(e=>{if(e.type!=='depends_on')return;if(!outgoing.has(e.to))outgoing.set(e.to,[]);outgoing.get(e.to).push(e.from)});
    const impacted=[];
    nodes.filter(n=>/delayed|overdue|at risk|risk|blocked/i.test(n.status)).forEach(source=>{
      const seen=new Set([source.id]),queue=[source.id],downstream=[];
      while(queue.length){
        const cur=queue.shift();
        (outgoing.get(cur)||[]).forEach(id=>{
          if(seen.has(id))return;seen.add(id);const hit=nodes.find(n=>n.id===id);if(hit){downstream.push(hit);queue.push(id)}
        });
      }
      if(downstream.length) impacted.push({source:{sheet:source.sheet,name:source.name,status:source.status},downstream:downstream.slice(0,20).map(n=>({sheet:n.sheet,name:n.name,status:n.status}))});
    });
    return {nodes:nodes.slice(0,2000),edges:edges.slice(0,4000),impacts:impacted.slice(0,100)};
  }
  function impactSummary(graph){
    const cross=[...new Set((graph.impacts||[]).flatMap(x=>x.downstream||[]).map(x=>x.sheet))];
    const delayed=(graph.impacts||[]).length;
    return {
      nodeCount:graph.nodes?.length||0,
      edgeCount:graph.edges?.length||0,
      impactedChains:delayed,
      downstreamWorksheets:cross,
      criticalChains:(graph.impacts||[]).slice(0,12)
    };
  }
  function renderWorkbookPanel(wi) {
    let el=document.getElementById('agenticWorkbookPanel');
    if(!el){
      const host=document.querySelector('#data .layout .panel');
      if(!host)return;
      el=document.createElement('div');el.id='agenticWorkbookPanel';el.style.marginTop='14px';host.appendChild(el);
    }
    if(!wi){el.innerHTML='';return}
    const counts=Object.entries(wi.projectCoverage).map(([k,v])=>'<span class="badge" style="margin:3px">'+esc(k)+': '+v+'</span>').join('');
    const rows=wi.sheets.map(s=>{
      const st=Object.entries(s.statusCounts).map(([k,v])=>k+' '+v).join(' · ');
      return '<tr><td>'+esc(s.name)+'</td><td>'+esc(s.type)+'</td><td>'+s.rows+'</td><td>'+esc(st||'—')+'</td></tr>';
    }).join('');
    el.innerHTML='<div class="panel" style="padding:14px"><div class="row"><h3 class="grow">🧠 Agentic Workbook Intelligence</h3><span class="badge">'+wi.worksheetCount+' worksheets analysed</span></div><div class="mini muted" style="margin-bottom:8px">'+esc(wi.fileName)+' · Default mode: all worksheets are analysed automatically</div><div style="margin-bottom:10px">'+counts+'</div><div class="mini muted" style="margin-bottom:10px">Cross-sheet graph: '+(wi.impactSummary?.nodeCount||0)+' nodes · '+(wi.impactSummary?.edgeCount||0)+' links · '+(wi.impactSummary?.impactedChains||0)+' impact chain(s)</div><div class="tablewrap" style="max-height:300px"><table><thead><tr><th>Worksheet</th><th>Detected Role</th><th>Rows</th><th>Status Signals</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>';
  }
  function activateAgenticWorkbook() {
    if(typeof importBook==='undefined'||!importBook)return;
    const wi=buildWorkbookIntelligence();
    if(!wi)return;
    const allTasks=workbookTasksAll();
    const p=project();
    p.workbookAnalysisMode='all-worksheets-by-default';
    p.workbook=wi;
    p.tasks=allTasks.length?allTasks:p.tasks;
    p.workbookTaskCount=allTasks.length;
    save(); renderWorkbookPanel(wi); render();
    document.getElementById('mapping').textContent='Default analysis: all '+wi.worksheetCount+' worksheets analysed automatically. '+allTasks.length+' task-like records consolidated for Project Intelligence.';
    const control=document.getElementById('sheetControl');
    if(control&&!document.getElementById('agenticAllBtn')){
      const b=document.createElement('button');b.id='agenticAllBtn';b.className='btn good';b.textContent='✓ Auto: All Worksheets Analysed';b.disabled=true;control.appendChild(b);
    }
  }
  const originalFileHandler=document.getElementById('file')?.onchange;
  const file=document.getElementById('file');
  if(file){file.addEventListener('change',()=>setTimeout(activateAgenticWorkbook,180));}
  window.addEventListener('projectmind:workbook-ready',()=>setTimeout(activateAgenticWorkbook,80));
  const originalContext=window.projectChatContext;
  if(typeof originalContext==='function'){
    window.projectChatContext=function(){
      const c=originalContext();
      const wi=project()?.workbook;
      if(wi)c.workbookIntelligence={fileName:wi.fileName,worksheetCount:wi.worksheetCount,sheets:wi.sheets,exceptionSheets:wi.exceptionSheets,projectCoverage:wi.projectCoverage,taskCount:project()?.workbookTaskCount||project()?.tasks?.length||0,impactSummary:wi.impactSummary,impactGraph:wi.impactGraph};
      return c;
    };
  }
  const oldAsk=document.getElementById('askAI')?.onclick;
  if(oldAsk) document.getElementById('askAI').onclick=async function(){
    const q=document.getElementById('question').value||'Analyse the complete workbook and identify PMO priorities.';
    const ans=document.getElementById('aiAnswer');ans.value='Analysing all worksheets...';
    try{
      const c=projectChatContext();
      const impact= c.workbookIntelligence?.impactSummary;
      const prompt=impact ? q+'\n\nWorkbook impact context: '+JSON.stringify(impact) : q;
      const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:prompt,history:[],context:c})});
      const d=await r.json();ans.value=d.reply||d.report||'No analysis returned.';
    }catch(e){ans.value='Unable to reach the analysis service. Local PMO workflow remains available.'}
  };
  const status=document.getElementById('mode');
  if(status&&importBook)status.textContent='● Agentic Workbook Intelligence · All Worksheets Active';
  window.__projectMindAgenticAllWorksheetsByDefault=true;
})();`;
export default agenticScript;
