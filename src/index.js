const html = String.raw`<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>ProjectMind AI · PMO Intelligence</title>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script>
<style>
:root{--bg:#07111f;--panel:#0e1b2d;--panel2:#11223a;--line:#22344d;--text:#eef4fb;--muted:#93a4b8;--blue:#4f8cff;--green:#35c98b;--amber:#ffbd45;--red:#ff647c}
*{box-sizing:border-box}body{margin:0;background:linear-gradient(180deg,#07111f,#0b1626);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}.app{max-width:1240px;margin:auto;padding:20px}
.top{display:flex;justify-content:space-between;align-items:center;gap:12px}.brand{display:flex;gap:12px;align-items:center}.logo{width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#4f8cff,#8a5cff);display:grid;place-items:center;font-size:22px}.brand h1{font-size:21px;margin:0}.brand p{margin:3px 0 0;color:var(--muted);font-size:13px}.online{font-size:13px;color:var(--green);background:#0e2b25;padding:8px 12px;border-radius:99px}
.hero{margin:22px 0;padding:22px;border:1px solid var(--line);border-radius:22px;background:rgba(14,27,45,.85)}.hero h2{margin:0 0 6px;font-size:25px}.hero p{margin:0;color:var(--muted)}
.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card{padding:18px;border:1px solid var(--line);background:var(--panel);border-radius:18px}.card .n{font-size:30px;font-weight:800;margin:10px 0 3px}.label{color:var(--muted);font-size:12px;letter-spacing:.03em}.red{color:var(--red)}.amber{color:var(--amber)}.green{color:var(--green)}.blue{color:var(--blue)}
.workspace{display:grid;grid-template-columns:1.1fr .9fr;gap:14px;margin-top:14px}.box{border:1px solid var(--line);background:var(--panel);border-radius:20px;padding:18px}.box h3{margin:0 0 14px;font-size:17px}
.chat{height:280px;overflow:auto;padding:4px 0}.msg{max-width:90%;padding:12px 14px;border-radius:15px;margin:8px 0;line-height:1.5;font-size:14px;white-space:pre-wrap}.bot{background:#16263c}.user{background:#285ea8;margin-left:auto}.compose{display:flex;gap:8px;margin-top:12px}.compose input{flex:1;border:1px solid var(--line);background:#091523;color:white;border-radius:14px;padding:14px;font-size:15px}.compose button,.btn{border:0;border-radius:14px;background:var(--blue);color:#fff;padding:11px 16px;font-weight:700;cursor:pointer}.btn.alt{background:#172b47;border:1px solid var(--line)}.btn:disabled{opacity:.6;cursor:wait}
.focus{padding:0;margin:0}.focus li{list-style:none;padding:13px 0;border-bottom:1px solid var(--line);font-size:14px}.focus li:last-child{border:0}.tag{display:inline-block;font-size:11px;padding:4px 8px;border-radius:99px;margin-right:7px}.tred{background:#351923;color:#ff9aaa}.tamb{background:#382b15;color:#ffd27c}.tblue{background:#172d4e;color:#8fb8ff}
.upload{margin-top:14px}.drop{border:1.5px dashed #3b5b83;border-radius:18px;padding:20px;text-align:center;background:#0a1728}.drop strong{display:block;margin-bottom:6px}.drop p{color:var(--muted);margin:6px 0 14px;font-size:13px}.file{display:none}.uploadrow{display:flex;gap:10px;align-items:center;flex-wrap:wrap}.filename{color:var(--muted);font-size:13px}
.analysis{margin-top:14px}.toolbar{display:flex;justify-content:space-between;gap:10px;align-items:center;margin-bottom:12px;flex-wrap:wrap}.toolbar p{margin:0;color:var(--muted);font-size:13px}.tablewrap{overflow:auto;border:1px solid var(--line);border-radius:14px;max-height:420px}table{width:100%;border-collapse:collapse;font-size:13px;min-width:820px}th,td{padding:11px 12px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}th{position:sticky;top:0;background:#13243b;color:#b9c9dc}.status{padding:4px 8px;border-radius:99px;font-size:11px;font-weight:700}.s-overdue{background:#351923;color:#ff9aaa}.s-risk{background:#382b15;color:#ffd27c}.s-track{background:#0e2b25;color:#77e2b6}.empty{color:var(--muted);padding:26px;text-align:center}
.report{margin-top:14px;background:#091523;border:1px solid var(--line);border-radius:16px;padding:16px;white-space:pre-wrap;line-height:1.55;font-size:14px;min-height:120px}.hidden{display:none}
@media(max-width:760px){.app{padding:14px}.grid{grid-template-columns:repeat(2,1fr)}.workspace{grid-template-columns:1fr}.hero h2{font-size:22px}.top{align-items:flex-start}.online{white-space:nowrap}.chat{height:230px}.drop{padding:16px}.compose button{padding:0 14px}}
</style></head><body><main class="app">
<header class="top"><div class="brand"><div class="logo">🧠</div><div><h1>ProjectMind AI</h1><p>PMO Intelligence & Project Delivery Advisor</p></div></div><div class="online" id="brain">● Checking AI Brain</div></header>

<section class="hero"><h2>Project control, prioritised.</h2><p>Upload your project tracker and turn delayed tasks into a prioritised recovery plan with issue, impact, next action, owner, dependencies and commitment dates.</p></section>

<section class="grid">
<div class="card"><div class="label">OVERDUE</div><div class="n red" id="overdue">53</div><div class="label">Recovery action required</div></div>
<div class="card"><div class="label">AT RISK</div><div class="n amber" id="risk">12</div><div class="label">Monitor closely</div></div>
<div class="card"><div class="label">COMPLETED</div><div class="n green" id="complete">84%</div><div class="label">Overall completion</div></div>
<div class="card"><div class="label">PMO FOCUS</div><div class="n blue" id="focusN">3</div><div class="label">Escalation items today</div></div>
</section>

<section class="workspace">
<div class="box"><h3>🤖 Ask ProjectMind AI</h3><div class="chat" id="chat"><div class="msg bot">I’m ready. Upload a tracker for data-driven analysis, or ask me to analyse delayed tasks, build a recovery plan, identify dependencies, prepare an escalation, or rewrite a PMO communication.</div></div><div class="compose"><input id="q" placeholder="Example: Create a recovery plan for delayed SIT tasks..." autocomplete="off"><button id="send">Ask</button></div></div>
<div class="box"><h3>🎯 Need Attention</h3><ul class="focus" id="focusList"><li><span class="tag tred">OVERDUE</span>53 delayed tasks require recovery plan and owner commitment.</li><li><span class="tag tamb">AT RISK</span>Dependencies need confirmation before the next testing cycle.</li><li><span class="tag tblue">PMO</span>Open concerns should have ETA, PIC and impact reflected in solution documents.</li></ul></div>
</section>

<section class="box upload"><h3>📥 Project Tracker → AI Analysis</h3>
<div class="drop"><strong>Upload Excel or CSV Project Tracker</strong><p>Supported: .xlsx, .xls, .csv · ProjectMind detects common columns such as Task, Status, PIC/Owner, ETA, Start Date and Due Date.</p><div class="uploadrow"><label class="btn" for="file">Choose File</label><input class="file" id="file" type="file" accept=".xlsx,.xls,.csv"><span class="filename" id="filename">No file selected</span><button class="btn alt" id="sample">Load Demo Data</button></div></div>
</section>

<section class="box analysis hidden" id="analysis">
<div class="toolbar"><div><h3>🧭 Recovery Plan Workspace</h3><p id="summaryLine"></p></div><div class="uploadrow"><button class="btn" id="analyseBtn">Generate AI Recovery Plan</button><button class="btn alt" id="exportBtn">Export CSV</button></div></div>
<div class="tablewrap"><table><thead><tr><th>Task</th><th>Current Status</th><th>PIC / Owner</th><th>Commit Date</th><th>Impact Analysis</th><th>Next Action / Recovery</th></tr></thead><tbody id="rows"></tbody></table></div>
<div class="report" id="report">Upload a tracker to generate the PMO recovery view.</div>
</section>
</main>

<script>
const chat=document.getElementById('chat'),q=document.getElementById('q'),send=document.getElementById('send'),brain=document.getElementById('brain');
const file=document.getElementById('file'),filename=document.getElementById('filename'),analysis=document.getElementById('analysis'),rowsEl=document.getElementById('rows'),report=document.getElementById('report');
let tasks=[],recovery=[];

function add(text,kind){const d=document.createElement('div');d.className='msg '+kind;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
async function ask(){
 const text=q.value.trim();if(!text)return;q.value='';add(text,'user');send.disabled=true;send.textContent='...';
 try{const r=await fetch('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:text,projectContext:tasks.slice(0,80)})});const j=await r.json();add(j.reply||j.error||'No response received.','bot')}
 catch(e){add('Connection error. Please try again.','bot')}finally{send.disabled=false;send.textContent='Ask'}
}
send.onclick=ask;q.addEventListener('keydown',e=>{if(e.key==='Enter')ask()});

function norm(v){return String(v??'').trim()}
function find(obj,names){const keys=Object.keys(obj);for(const n of names){const k=keys.find(x=>x.toLowerCase().replace(/[^a-z0-9]/g,'').includes(n));if(k&&norm(obj[k]))return norm(obj[k])}return ''}
function toDate(v){if(!v)return null;const d=new Date(v);return isNaN(d)?null:d}
function classify(t){
 const s=t.status.toLowerCase(),due=toDate(t.commitDate)||toDate(t.dueDate),today=new Date();today.setHours(0,0,0,0);
 if(/complete|closed|done|cancel/.test(s))return 'track';
 if(/delay|overdue|late|blocked/.test(s)||(due&&due<today))return 'overdue';
 if(/risk|issue|pending|hold/.test(s)||(due&&((due-today)/86400000)<=7))return 'risk';
 return 'track';
}
function enrich(t){
 const c=classify(t);
 let impact='Delivery timeline may be affected if the activity is not recovered within the committed window.';
 let action='Confirm root cause, dependency and owner; agree a recovery action with a dated checkpoint.';
 if(c==='overdue'){impact='High risk to the downstream milestone and dependent activities. Repeated slippage may require formal escalation and recovery planning.';action='Obtain a firm root cause, corrective action, accountable PIC and revised commitment date. Track daily until closure.'}
 if(c==='risk'){impact='May impact the next milestone if the dependency or pending decision is not resolved on time.';action='Validate dependency, remove blocker and set a short control checkpoint before the committed date.'}
 return {...t,class:c,impact,action}
}
function parseRows(raw){
 tasks=raw.map(x=>({
  task:find(x,['task','activity','item','description','workitem','taskname'])||'Unnamed task',
  status:find(x,['status','progress','state'])||'Open',
  owner:find(x,['pic','owner','assignee','responsible','lead'])||'TBC',
  commitDate:find(x,['commitdate','eta','targetdate','duedate','enddate','finishdate']),
  dueDate:find(x,['duedate','targetdate','enddate','finishdate']),
  stream:find(x,['stream','workstream','module','project']),
  dependency:find(x,['dependency','blocker','dependencies'])
 })).filter(x=>x.task!=='Unnamed task').map(enrich);
 recovery=tasks.filter(x=>x.class!=='track');
 render();
}
function render(){
 analysis.classList.remove('hidden');
 const o=tasks.filter(x=>x.class==='overdue').length,r=tasks.filter(x=>x.class==='risk').length,c=tasks.filter(x=>/complete|closed|done/.test(x.status.toLowerCase())).length;
 document.getElementById('overdue').textContent=o;document.getElementById('risk').textContent=r;document.getElementById('complete').textContent=tasks.length?Math.round(c/tasks.length*100)+'%':'0%';document.getElementById('focusN').textContent=Math.min(3,recovery.length);
 document.getElementById('summaryLine').textContent=tasks.length+' tasks loaded · '+o+' overdue · '+r+' at risk · '+c+' completed';
 rowsEl.innerHTML='';
 (recovery.length?recovery:tasks).slice(0,250).forEach(t=>{const tr=document.createElement('tr');const tag=t.class==='overdue'?'s-overdue':t.class==='risk'?'s-risk':'s-track';tr.innerHTML='<td>'+esc(t.task)+(t.stream?'<br><span class="label">'+esc(t.stream)+'</span>':'')+'</td><td><span class="status '+tag+'">'+esc(t.status)+'</span></td><td>'+esc(t.owner)+'</td><td>'+esc(t.commitDate||'TBC')+'</td><td>'+esc(t.impact)+'</td><td>'+esc(t.action)+(t.dependency?'<br><span class="label">Dependency: '+esc(t.dependency)+'</span>':'')+'</td>';rowsEl.appendChild(tr)});
 document.getElementById('focusList').innerHTML=[
  '<li><span class="tag tred">OVERDUE</span>'+o+' task(s) require owner commitment and recovery action.</li>',
  '<li><span class="tag tamb">AT RISK</span>'+r+' task(s) require dependency and blocker validation.</li>',
  '<li><span class="tag tblue">PMO</span>Recovery output is ready for escalation, tracker update and executive reporting.</li>'
 ].join('');
 report.textContent=localReport();
}
function localReport(){
 const o=tasks.filter(x=>x.class==='overdue'),r=tasks.filter(x=>x.class==='risk');
 const names=o.slice(0,5).map(x=>'• '+x.task+' — '+x.owner+' — Commit: '+(x.commitDate||'TBC')).join('\n')||'• No overdue tasks detected.';
 return 'PMO RECOVERY SUMMARY\n\nIssue: '+o.length+' overdue and '+r.length+' at-risk tasks identified from the uploaded tracker.\n\nImmediate action:\n1. Confirm root cause and accountable PIC for every overdue item.\n2. Validate dependencies and remove blockers before the next control checkpoint.\n3. Obtain a realistic committed date; do not leave ETA as TBC.\n4. Escalate repeated missed commitments with impact to the next milestone.\n\nPriority items:\n'+names;
}
function esc(v){return String(v??'').replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]))}

file.onchange=async()=>{const f=file.files[0];if(!f)return;filename.textContent=f.name;try{const data=await f.arrayBuffer();const wb=XLSX.read(data,{type:'array',cellDates:true});const ws=wb.Sheets[wb.SheetNames[0]];parseRows(XLSX.utils.sheet_to_json(ws,{defval:''}));report.textContent=localReport()}catch(e){report.textContent='Unable to read this file. Please use a standard Excel or CSV tracker.';analysis.classList.remove('hidden')}}
document.getElementById('sample').onclick=()=>{filename.textContent='ProjectMind demo tracker';parseRows([
 {Task:'SIT Defect Resolution',Status:'Delayed',PIC:'Partner A',ETA:'2026-09-05',Stream:'SIT',Dependency:'Environment stability'},
 {Task:'DHL SFTP Folder Configuration',Status:'At Risk',PIC:'Integration Team',ETA:'2026-09-07',Stream:'Integration',Dependency:'DHL confirmation'},
 {Task:'PB2 Solution Document Update',Status:'Open',PIC:'Business Analyst',ETA:'2026-09-12',Stream:'Solution',Dependency:'Open concerns closure'},
 {Task:'UAT Entry Criteria',Status:'Completed',PIC:'PMO',ETA:'2026-09-01',Stream:'Governance'}
 ])}
document.getElementById('analyseBtn').onclick=async()=>{
 if(!tasks.length)return;const b=document.getElementById('analyseBtn');b.disabled=true;b.textContent='Analysing...';report.textContent='ProjectMind is preparing the recovery analysis...';
 try{const res=await fetch('/api/analyze',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({tasks:recovery.slice(0,120)})});const j=await res.json();report.textContent=j.report||localReport()}catch(e){report.textContent=localReport()}finally{b.disabled=false;b.textContent='Generate AI Recovery Plan'}
}
document.getElementById('exportBtn').onclick=()=>{
 const h=['Task','Status','PIC/Owner','Commit Date','Impact Analysis','Next Action','Dependency'];
 const lines=[h,...(recovery.length?recovery:tasks).map(t=>[t.task,t.status,t.owner,t.commitDate,t.impact,t.action,t.dependency])].map(r=>r.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\n');
 const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([lines],{type:'text/csv'}));a.download='ProjectMind_Recovery_Plan.csv';a.click();URL.revokeObjectURL(a.href);
}
fetch('/api/health').then(r=>r.json()).then(j=>{brain.textContent=j.aiConfigured?'● AI Brain Online':'● Dashboard Online · Local analysis active';brain.style.color=j.aiConfigured?'var(--green)':'var(--amber)'}).catch(()=>{brain.textContent='● Connection unavailable';brain.style.color='var(--red)'});
</script></body></html>`;

const jsonHeaders={"content-type":"application/json; charset=UTF-8"};
function cleanTask(t){return {task:String(t.task||''),status:String(t.status||''),owner:String(t.owner||'TBC'),commitDate:String(t.commitDate||'TBC'),stream:String(t.stream||''),dependency:String(t.dependency||'')}}
function fallbackReport(tasks){
 const overdue=tasks.filter(t=>/delay|overdue|late|blocked/i.test(t.status));
 return `PMO RECOVERY SUMMARY

Issue: ${overdue.length} of ${tasks.length} analysed task(s) are flagged as delayed/overdue based on the submitted tracker.

Required next actions:
1. Confirm root cause, corrective action and accountable PIC for each delayed task.
2. Validate cross-stream dependencies and blockers before committing the revised date.
3. Replace any TBC ETA with a realistic commitment approved by the responsible owner.
4. Escalate repeated missed commitments where the next milestone, test cycle or solution document is impacted.
5. Track recovery through short checkpoints until closure.`;
}
export default {
 async fetch(request, env){
  const url=new URL(request.url);
  if(url.pathname==="/" || url.pathname==="/index.html") return new Response(html,{headers:{"content-type":"text/html; charset=UTF-8"}});
  if(url.pathname==="/api/health") return Response.json({status:"online",service:"ProjectMind AI Brain",version:"2.1",aiConfigured:Boolean(env.OPENAI_API_KEY)},{headers:jsonHeaders});

  if(url.pathname==="/api/chat" && request.method==="POST"){
   let body;try{body=await request.json()}catch{return Response.json({error:"Invalid JSON"},{status:400,headers:jsonHeaders})}
   const message=String(body.message||"").trim();if(!message)return Response.json({error:"Message is required"},{status:400,headers:jsonHeaders});
   if(!env.OPENAI_API_KEY)return Response.json({reply:"ProjectMind V2 is active. Tracker upload and local recovery analysis work now. Add OPENAI_API_KEY in Cloudflare Variables and secrets to activate the full AI PMO advisor."},{headers:jsonHeaders});
   const system="You are ProjectMind AI, a senior global PMO and project delivery advisor. Be practical, structured and concise. Focus on issue, impact, root cause, next action, owner, ETA, dependency, recovery plan and escalation when relevant. For professional messages, write natural business English. If project context is provided, use it directly.";
   try{
    const model=env.OPENAI_MODEL||"gpt-4.1-mini";
    const context=Array.isArray(body.projectContext)?JSON.stringify(body.projectContext.slice(0,80)):''; 
    const res=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model,messages:[{role:"system",content:system},{role:"user",content:message+(context?"\n\nProject tracker context:\n"+context:"")}],temperature:0.35})});
    const data=await res.json();if(!res.ok)return Response.json({error:data.error?.message||"AI request failed"},{status:502,headers:jsonHeaders});
    return Response.json({reply:data.choices?.[0]?.message?.content||"No AI response returned."},{headers:jsonHeaders});
   }catch{return Response.json({error:"Unable to reach AI service."},{status:502,headers:jsonHeaders})}
  }

  if(url.pathname==="/api/analyze" && request.method==="POST"){
   let body;try{body=await request.json()}catch{return Response.json({error:"Invalid JSON"},{status:400,headers:jsonHeaders})}
   const tasks=Array.isArray(body.tasks)?body.tasks.slice(0,120).map(cleanTask):[];
   if(!tasks.length)return Response.json({error:"No tasks supplied"},{status:400,headers:jsonHeaders});
   if(!env.OPENAI_API_KEY)return Response.json({report:fallbackReport(tasks),mode:"local"},{headers:jsonHeaders});
   const prompt="Create an executive-ready PMO recovery analysis from these delayed/at-risk tasks. Use sections: Executive Summary, Issue & Root Cause Gaps, Impact Analysis, Recovery Actions, Commitment Governance, Escalation Triggers. Be specific but do not invent facts not in the tracker.\n\nTasks:\n"+JSON.stringify(tasks);
   try{
    const model=env.OPENAI_MODEL||"gpt-4.1-mini";
    const res=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model,messages:[{role:"system",content:"You are a senior global PMO and recovery manager. Produce concise, decision-oriented analysis grounded only in the provided tracker."},{role:"user",content:prompt}],temperature:0.25})});
    const data=await res.json();if(!res.ok)return Response.json({report:fallbackReport(tasks),mode:"local"},{headers:jsonHeaders});
    return Response.json({report:data.choices?.[0]?.message?.content||fallbackReport(tasks),mode:"ai"},{headers:jsonHeaders});
   }catch{return Response.json({report:fallbackReport(tasks),mode:"local"},{headers:jsonHeaders})}
  }
  return new Response("Not found",{status:404});
 }
};