const html = String.raw`<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#07111f"><title>ProjectMind AI Ultimate</title>
<script src="https://cdn.jsdelivr.net/npm/xlsx@0.18.5/dist/xlsx.full.min.js"></script><script src="https://cdn.jsdelivr.net/npm/pptxgenjs@3.12.0/dist/pptxgen.bundle.js"></script>
<style>
:root{--bg:#07111f;--panel:#0d1a2b;--panel2:#11243b;--line:#223a56;--text:#eef5fc;--muted:#91a4ba;--blue:#5791ff;--green:#39d49a;--amber:#ffc454;--red:#ff6b80}*{box-sizing:border-box}body{margin:0;background:radial-gradient(circle at top right,#12294a 0,#07111f 45%);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}.app{max-width:1440px;margin:auto;padding:18px}.top,.row{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.brand{display:flex;gap:12px;align-items:center}.logo{width:46px;height:46px;border-radius:15px;background:linear-gradient(135deg,#5791ff,#8b6cff);display:grid;place-items:center;font-size:22px}.brand h1{margin:0;font-size:22px}.brand p{margin:3px 0;color:var(--muted);font-size:12px}.pill{padding:7px 10px;border-radius:99px;background:#102d26;color:var(--green);font-size:12px}.tabs{display:flex;gap:8px;overflow:auto;margin:18px 0}.tabs button,.btn{border:1px solid var(--line);background:var(--panel);color:var(--text);padding:10px 13px;border-radius:11px;cursor:pointer}.tabs button.active,.btn.primary{background:var(--blue);border-color:var(--blue)}.btn.good{background:#103429;color:var(--green)}.btn.warn{background:#3a2d12;color:var(--amber)}.btn.danger{background:#3a1821;color:var(--red)}.hero{background:linear-gradient(135deg,#0e1d31,#132b49);border:1px solid var(--line);border-radius:20px;padding:22px;margin-bottom:16px}.hero h2{margin:0 0 8px;font-size:26px}.hero p,.muted{color:var(--muted)}.grid{display:grid;grid-template-columns:repeat(6,1fr);gap:12px}.card,.panel{background:linear-gradient(180deg,var(--panel),#0a1524);border:1px solid var(--line);border-radius:17px;padding:16px}.k{font-size:11px;color:var(--muted);text-transform:uppercase}.v{font-size:30px;font-weight:800;margin-top:6px}.red{color:var(--red)}.green{color:var(--green)}.amber{color:var(--amber)}.blue{color:var(--blue)}.section{display:none}.section.active{display:block}.layout{display:grid;grid-template-columns:1.45fr .85fr;gap:14px}.split{display:grid;grid-template-columns:1fr 1fr;gap:12px}.panel h3{margin:0 0 12px;font-size:16px}.grow{flex:1}.mini{font-size:12px}.tablewrap{overflow:auto;max-height:560px;border:1px solid var(--line);border-radius:13px}table{border-collapse:collapse;width:100%;font-size:12px}th,td{padding:10px;border-bottom:1px solid #1a2d43;text-align:left;white-space:nowrap}th{position:sticky;top:0;background:#102039;color:#a9bdd3}.tag,.badge{padding:4px 8px;border-radius:99px;font-size:11px;display:inline-block}.tag.red{background:#3b1721}.tag.green{background:#103226}.tag.amber{background:#3c2d10}.tag.blue,.badge{background:#102d4b}.alert,.projectline{padding:13px;border:1px solid var(--line);border-radius:12px;margin:8px 0;background:#0a1625}.alert{border-left:4px solid var(--amber)}.alert.critical{border-left-color:var(--red)}.alert.good{border-left-color:var(--green)}.projectline.active{border-color:var(--blue);background:#0d2138}.drop{border:1.5px dashed #3a5b7d;border-radius:14px;padding:20px;text-align:center;color:var(--muted)}input,select,textarea{background:#081524;color:var(--text);border:1px solid var(--line);border-radius:10px;padding:10px}textarea{width:100%;min-height:220px;resize:vertical}.footer{margin:18px 0 6px;color:#70849b;font-size:11px;text-align:center}.chat-fab{position:fixed;right:24px;bottom:24px;width:58px;height:58px;border:0;border-radius:50%;background:linear-gradient(135deg,#5791ff,#8b6cff);color:#fff;font-size:24px;cursor:pointer;box-shadow:0 14px 35px rgba(0,0,0,.35);z-index:1000}.chatbox{position:fixed;right:24px;bottom:94px;width:min(430px,calc(100vw - 32px));height:min(640px,calc(100vh - 120px));display:none;flex-direction:column;background:#0a1524;border:1px solid #2b4b70;border-radius:20px;box-shadow:0 25px 70px rgba(0,0,0,.48);overflow:hidden;z-index:1000}.chatbox.open{display:flex}.chathead{padding:15px 16px;background:linear-gradient(135deg,#10284a,#172947);display:flex;align-items:center;justify-content:space-between}.chatmsgs{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px}.msg{max-width:88%;padding:10px 12px;border-radius:14px;font-size:13px;line-height:1.45;white-space:pre-wrap}.msg.user{align-self:flex-end;background:#1d4f9a}.msg.agent{align-self:flex-start;background:#12243a;border:1px solid #24415f}.quick{display:flex;gap:6px;overflow:auto;padding:0 14px 10px}.quick button{white-space:nowrap;border:1px solid #29445f;background:#0f2033;color:#bcd0e5;border-radius:99px;padding:7px 9px;font-size:11px;cursor:pointer}.chatinput{display:flex;gap:8px;padding:12px;border-top:1px solid #223a56}.chatinput textarea{min-height:42px;height:42px;max-height:100px;padding:10px;font-size:13px}.chatinput button{border:0;border-radius:10px;background:#5791ff;color:#fff;padding:0 14px;cursor:pointer}@media(max-width:1000px){.grid{grid-template-columns:repeat(3,1fr)}.layout,.split{grid-template-columns:1fr}}@media(max-width:640px){.app{padding:12px}.grid{grid-template-columns:repeat(2,1fr)}.v{font-size:25px}.top{align-items:flex-start}.tabs button{white-space:nowrap}}
</style></head><body><div class="app">
<div class="top"><div class="brand"><div class="logo">🧠</div><div><h1>ProjectMind AI</h1><p>Ultimate PMO Operating System · Portfolio, Recovery & Executive Intelligence</p></div></div><div class="pill" id="mode">● Local Intelligence Active</div></div>
<div class="tabs" id="tabs"><button class="active" data-tab="command">Command Center</button><button data-tab="portfolio">Portfolio</button><button data-tab="tracker">Tracker</button><button data-tab="changes">Change Intelligence</button><button data-tab="recovery">Recovery Room</button><button data-tab="executive">Executive Brief</button><button data-tab="advisor">AI Advisor</button><button data-tab="data">Data & Governance</button></div>
<section class="section active" id="command"><div class="hero"><h2>Project control, prioritised.</h2><p>One operating view for delivery health, deteriorating commitments, overdue actions, recovery governance and executive decision support.</p></div><div class="grid" id="kpis"></div><div class="layout" style="margin-top:14px"><div class="panel"><h3>PMO Alert Centre</h3><div id="alerts"></div></div><div class="panel"><h3>Today’s Control Actions</h3><div id="today"></div></div></div></section>
<section class="section" id="portfolio"><div class="layout"><div class="panel"><div class="row"><h3 class="grow">Project Portfolio</h3><button class="btn primary" id="newProject">+ New Project</button></div><div id="projectList"></div></div><div class="panel"><h3>Portfolio Health</h3><div id="portfolioHealth"></div><hr style="border-color:var(--line)"><div class="mini muted">Local-first storage is active. The portfolio data model remains ready for a shared cloud persistence layer.</div></div></div></section>
<section class="section" id="tracker"><div class="panel"><div class="row"><h3 class="grow">Delivery Tracker</h3><select id="statusFilter"><option value="">All status</option><option>Delayed</option><option>Overdue</option><option>At Risk</option><option>On Track</option><option>Completed</option></select><button class="btn" id="exportCsv">Export CSV</button></div><div class="tablewrap"><table><thead><tr><th>Task</th><th>Status</th><th>Stream</th><th>PIC</th><th>ETA / Commit</th><th>Priority</th><th>Dependency / Blocker</th><th>PMO Action</th></tr></thead><tbody id="taskRows"></tbody></table></div></div></section>
<section class="section" id="changes"><div class="layout"><div class="panel"><h3>Reporting-cycle Change Intelligence</h3><div class="muted mini">Compares the current tracker against the most recent saved baseline.</div><div id="changeList" style="margin-top:12px"></div></div><div class="panel"><h3>Snapshot Control</h3><div class="row"><button class="btn good" id="saveSnapshot">Save Current Snapshot</button><button class="btn danger" id="clearSnapshots">Clear Project Snapshots</button></div><p class="mini muted">Snapshots capture status, PIC and commitment movement between reporting cycles.</p><div id="snapshotInfo"></div></div></div></section>
<section class="section" id="recovery"><div class="layout"><div class="panel"><h3>Recovery Plan</h3><div id="recoveryPlan"></div></div><div class="panel"><h3>Recovery Governance Rules</h3><div class="alert critical"><b>No silent ETA movement.</b><br><span class="mini muted">Any revised commitment must retain an accountable PIC and corrective action.</span></div><div class="alert"><b>Dependencies before dates.</b><br><span class="mini muted">Recovery is not credible until upstream blockers are visible and owned.</span></div><div class="alert good"><b>Close the loop.</b><br><span class="mini muted">Final solutions should be reflected in related solution documents before the next control point.</span></div></div></div></section>
<section class="section" id="executive"><div class="split"><div class="panel"><div class="row"><h3 class="grow">Executive Daily Brief</h3><button class="btn primary" id="generateBrief">Generate</button><button class="btn" id="copyBrief">Copy</button><button class="btn good" id="exportPpt">Export Executive PPT</button></div><textarea id="brief" placeholder="Generate an executive-ready project brief."></textarea></div><div class="panel"><h3>Management Focus</h3><div id="managementFocus"></div></div></div></section>
<section class="section" id="advisor"><div class="split"><div class="panel"><h3>Ask ProjectMind AI</h3><textarea id="question" placeholder="Example: Which delayed items should be escalated today, and why?"></textarea><div class="row" style="margin-top:10px"><button class="btn primary" id="askAI">Analyse Portfolio / Project</button></div><textarea id="aiAnswer" placeholder="Analysis will appear here." style="margin-top:12px"></textarea></div><div class="panel"><h3>Advisor Scope</h3><div class="alert"><b>Recovery planning</b><br><span class="mini muted">Prioritise delayed commitments and identify immediate corrective actions.</span></div><div class="alert"><b>Escalation logic</b><br><span class="mini muted">Separate delivery noise from issues requiring management intervention.</span></div><div class="alert"><b>Executive communication</b><br><span class="mini muted">Convert tracker data into concise, decision-oriented management updates.</span></div></div></div></section>
<section class="section" id="data"><div class="layout"><div class="panel"><h3>Import Project Tracker</h3><div class="drop"><input type="file" id="file" accept=".xlsx,.xls,.csv"><p>ProjectMind now scans every worksheet, detects the best tracker sheet and supports common PMO headers including Task, Status, Owner, Proposed End, Baseline Finish, Next Action, Dependency and Blocker.</p></div><div id="mapping" class="mini muted" style="margin-top:10px"></div><div id="sheetControl" class="row" style="margin-top:10px"></div></div><div class="panel"><h3>Data Quality & Governance</h3><div id="quality"></div><hr style="border-color:var(--line)"><div class="row"><button class="btn warn" id="demoData">Load Demo PMO Data</button><button class="btn danger" id="clearProject">Clear Current Project Data</button></div></div></div></section>
<button class="chat-fab" id="chatFab" title="Chat with ProjectMind Agent" aria-label="Open ProjectMind Agent">🧠</button>
<div class="chatbox" id="chatbox" role="dialog" aria-label="ProjectMind Agent">
  <div class="chathead"><div><b>ProjectMind Agent</b><div class="mini muted">Portfolio-aware PMO Agent</div></div><button class="btn" id="chatClose" aria-label="Close chat">×</button></div>
  <div class="chatmsgs" id="chatMsgs"></div>
  <div class="quick"><button data-q="Apa kondisi project saya saat ini?">Project health</button><button data-q="Apa prioritas saya hari ini?">Prioritas hari ini</button><button data-q="Buat recovery plan untuk task delayed">Recovery plan</button><button data-q="Apa yang harus saya escalate ke management?">Management escalation</button></div>
  <div class="chatinput"><textarea id="chatInput" placeholder="Tanya dengan bahasa apa pun..."></textarea><button id="chatSend">Send</button></div>
</div>
<div class="footer">ProjectMind AI Ultimate · PMO Operating System · Continuous enhancement foundation</div></div>
<script>
const K='projectmind-ultimate-v2';let state=JSON.parse(localStorage.getItem(K)||'{"projects":[{"id":"default","name":"ProjectMind Demo","tasks":[]}],"active":"default","snapshots":{}}');let importBook=null,importFileName='';
function save(){localStorage.setItem(K,JSON.stringify(state))}function project(){return state.projects.find(p=>p.id===state.active)||state.projects[0]}function esc(v){return String(v==null?'':v).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]))}function key(v){return String(v||'').toLowerCase().replace(/[^a-z0-9]/g,'')}
const aliases={task:['task','activity','item','taskname','actionitem','deliverable','requirement'],status:['status','health','rag'],stream:['stream','workstream','phase','area','process'],pic:['pic','owner','responsible','accountable','assignee'],eta:['eta','proposedend','commitdate','commitmentdate','targetdate','duedate','enddate','finishdate','proposedfinish','plannedfinish','baselinefinish'],dependency:['dependency','dependencies','blocker','blockers','preparationneeded'],action:['pmoaction','nextaction','recommendedaction','recommendation','remarks','issue'],priority:['priority','criticality'],percent:['percentcomplete','completion','progress'],delayed:['delayed'],risk:['risk'],impact:['impactanalysis','impact'],issue:['issue','blocker'],alert:['alert','escalation']};
function pick(row,n){let ks=Object.keys(row);for(const a of aliases[n]||[n]){let k=ks.find(x=>key(x)===a);if(k)return row[k]}return''}
function normStatus(v,row){let s=String(v||'').trim();if(/complete|done|closed/i.test(s))return'Completed';if(/delay|late|overdue/i.test(s))return/overdue/i.test(s)?'Overdue':'Delayed';if(/risk|block/i.test(s))return'At Risk';if(/track|progress/i.test(s))return'On Track';let pct=parseFloat(String(pick(row,'percent')).replace('%',''));if(!isNaN(pct)&&pct>=100)return'Completed';let d=String(pick(row,'delayed')||'');if(/^-/.test(d))return'Delayed';let e=pick(row,'eta');if(e){let dt=new Date(e);if(!isNaN(dt)&&dt<Date.now()&&pct<100)return'Delayed'}let pri=String(pick(row,'priority'));let r=String(pick(row,'risk'));if(/critical|high/i.test(pri)||/high|yes|risk/i.test(r))return'At Risk';return'On Track'}
function clean(rows){return rows.filter(r=>Object.values(r).some(v=>String(v).trim()!=='' )).map((r,i)=>{let task=pick(r,'task');if(!task)return null;let dep=[pick(r,'dependency'),pick(r,'risk')].filter(Boolean).join(' · ');return{task:String(task),status:normStatus(pick(r,'status'),r),stream:String(pick(r,'stream')||'General'),pic:String(pick(r,'pic')||'TBC'),eta:String(pick(r,'eta')||'TBC'),priority:String(pick(r,'priority')||'Normal'),dependency:String(dep),action:String(pick(r,'action')||''),percent:String(pick(r,'percent')||''),impact:String(pick(r,'impact')||''),issue:String(pick(r,'issue')||''),alert:String(pick(r,'alert')||'')}}).filter(Boolean)}
function sheetMeta(ws,name){let rows=XLSX.utils.sheet_to_json(ws,{header:1,defval:'',raw:false,blankrows:false}),best={score:-1,row:0,headers:[]};for(let i=0;i<Math.min(rows.length,12);i++){let h=rows[i].map(String);let score=0;Object.values(aliases).forEach(arr=>{if(h.some(x=>arr.includes(key(x))))score++});if(score>best.score)best={score,row:i,headers:h}}let objs=XLSX.utils.sheet_to_json(ws,{range:best.row,defval:'',raw:false,blankrows:false});let usable=objs.filter(r=>pick(r,'task')).length;return{name,score:best.score,headerRow:best.row+1,usable,rows:objs}}
function scanWorkbook(wb){return wb.SheetNames.map(n=>sheetMeta(wb.Sheets[n],n)).sort((a,b)=>(b.score*100+b.usable)-(a.score*100+a.usable))}
function findSheet(rx){return importBook&&importBook.SheetNames.find(n=>rx.test(n))}
function rawRowsOf(name,limit=500){if(!name)return[];return XLSX.utils.sheet_to_json(importBook.Sheets[name],{header:1,defval:'',raw:false,blankrows:false}).slice(0,limit)}
function rowsWithDetectedHeader(raw,required){let hi=-1;for(let i=0;i<Math.min(raw.length,30);i++){let h=raw[i].map(v=>String(v||'').trim());if(required.every(rx=>h.some(v=>rx.test(v)))){hi=i;break}}if(hi<0)return[];let h=raw[hi].map((v,i)=>String(v||'').trim()||('Column '+(i+1)));return raw.slice(hi+1).filter(r=>r.some(v=>String(v||'').trim())).map(r=>Object.fromEntries(h.map((k,i)=>[k,r[i]??''])))}
function parseNeedAttentionRaw(raw){return rowsWithDetectedHeader(raw,[/^Task Requiring Attention$/i,/^Attention Type$/i,/^Priority$/i,/Proposed End/i,/PMO Recommendation/i]).filter(r=>String(r['Task Requiring Attention']||'').trim())}
function parseTimelineRaw(raw){
  let strict=rowsWithDetectedHeader(raw,[/^Task$/i,/Workstream|Stream/i,/Proposed End|Baseline Finish|Finish Date/i]);
  if(strict.length)return strict;
  const known=['Connectivity Lower','Connectivity Prod','CRP','Data Migration','Deployment','Development','DR','GNG Decission','Go Live','Hypercare','Infra','Performance Test','Requirement Gathering','Security Test','Solution','Training','Production Connectivity','User Training Plan','Requirement Analysis','SIT','UAT','Testing Plan'];
  const norm=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]/g,'');
  const dateish=v=>{if(v instanceof Date&&!isNaN(v))return true;if(typeof v==='number'&&v>20000&&v<70000)return true;let x=String(v||'').trim();return /\d{1,2}[\/\-]\d{1,2}[\/\-]\d{2,4}|\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}|^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(x)};
  let out=[];
  raw.forEach((r,rowNo)=>{
    const vals=(r||[]).map(v=>String(v||'').trim());
    const joined=vals.join(' ');
    const stream=known.find(k=>norm(joined).includes(norm(k)));
    if(!stream)return;
    const dates=(r||[]).filter(dateish);
    if(!dates.length)return;
    const status=vals.find(v=>/delay|overdue|risk|track|complete/i.test(v))||'';
    out.push({Task:stream,Stream:stream,'Workstream':stream,'Start Date':dates[0]||'', 'Finish Date':dates[dates.length-1]||dates[0]||'',Status:status,_row:rowNo+1});
  });
  return out;
}
function rowsOf(name,limit=500){return rawRowsOf(name,limit)}
function workbookIntelligence(){
  if(!importBook)return{};
  const get=(rx)=>findSheet(rx);
  let out={sheets:importBook.SheetNames.slice()};
  out.timelineSheet=get(/mpp|timeline|calendar/i);out.needSheet=get(/need\s*attention/i);out.pivotSheet=get(/task\s*pivot|pivot/i);out.lowerSheet=get(/summary.*lower|lower.*summary/i);out.prodSheet=get(/summary.*prod|prod.*summary/i);
  out.timelineRaw=rawRowsOf(out.timelineSheet,500);out.needRaw=rawRowsOf(out.needSheet,500);out.pivotRaw=rawRowsOf(out.pivotSheet,500);
  out.timeline=parseTimelineRaw(out.timelineRaw);out.needAttention=parseNeedAttentionRaw(out.needRaw);
  out.lower=rowsOf(out.lowerSheet,200);out.prod=rowsOf(out.prodSheet,200);out.pivot=rowsOf(out.pivotSheet,400);
  return out
}
function envSummary(rows,mode){
  let total=0,ready=0,pending=0,check=0;
  rows.forEach(r=>{let vals=Object.values(r).map(v=>String(v||''));if(!vals.some(v=>v.trim()))return;total++;let txt=vals.join(' ').toLowerCase();if(/need to check|tbc|pending|blocked|not available|no connection/.test(txt))check++;else if(/available|ready|completed|yes/.test(txt))ready++;else pending++});
  return{total,ready,pending,check}
}
function healthFromPivot(rows){
  let out={};rows.forEach(r=>{let label=String(r['Row Labels']||r['Row labels']||'').trim(),count=r['Count of Status'];if(label&&count!==''&&!isNaN(Number(count)))out[label]=Number(count)});return out
}
function importSheet(name){if(!importBook)return;let m=sheetMeta(importBook.Sheets[name],name),tasks=clean(m.rows);if(!tasks.length){document.getElementById('mapping').textContent='No usable task rows detected in '+name+'. Choose another worksheet.';return}project().tasks=tasks;project().workbook=workbookIntelligence();save();document.getElementById('mapping').innerHTML='<b>Imported '+tasks.length+' task(s)</b> from worksheet <b>'+esc(name)+'</b> (header row '+m.headerRow+'). Executive export will also use: Timeline/MPP, Need Attention, Pivot Health, Testing, Integration Lower and Prod summaries when available.';render()}
function risk(t){return /delayed|overdue/i.test(t.status)?'red':/risk/i.test(t.status)?'amber':/complete/i.test(t.status)?'green':'blue'}
function changes(){let p=project(),sn=(state.snapshots[p.id]||[]);if(!sn.length)return[];let old=sn[sn.length-1].tasks||[],map=new Map(old.map(x=>[x.task,x])),out=[];p.tasks.forEach(t=>{let o=map.get(t.task);if(!o)out.push({type:'NEW',task:t.task,detail:'New task added'});else{let d=[];if(o.status!==t.status)d.push('Status: '+o.status+' → '+t.status);if(o.pic!==t.pic)d.push('PIC: '+o.pic+' → '+t.pic);if(o.eta!==t.eta)d.push('Commit: '+o.eta+' → '+t.eta);if(d.length){let bad=!/delayed|overdue|risk/i.test(o.status)&&/delayed|overdue/i.test(t.status);out.push({type:bad?'DETERIORATED':'CHANGED',task:t.task,detail:d.join(' · ')})}}});old.forEach(o=>{if(!p.tasks.some(x=>x.task===o.task))out.push({type:'REMOVED',task:o.task,detail:'Task no longer present'})});return out}
function metrics(){let t=project().tasks,ch=changes(),over=t.filter(x=>/delayed|overdue/i.test(x.status)).length,ar=t.filter(x=>/risk/i.test(x.status)).length,done=t.filter(x=>/complete/i.test(x.status)).length,missing=t.filter(x=>!x.pic||x.pic==='TBC'||!x.eta||x.eta==='TBC').length;return{total:t.length,over,risk:ar,done,missing,changed:ch.length,deter:ch.filter(x=>x.type==='DETERIORATED').length}}
function render(){let m=metrics();document.getElementById('kpis').innerHTML=[['Total',m.total,'blue'],['Delayed / Overdue',m.over,'red'],['At Risk',m.risk,'amber'],['Completed',m.done,'green'],['Changed',m.changed,'blue'],['Deteriorated',m.deter,'red']].map(x=>'<div class="card"><div class="k">'+x[0]+'</div><div class="v '+x[2]+'">'+x[1]+'</div></div>').join('');let a=[];if(!m.total)a.push(['critical','No delivery tracker loaded','Import the current project tracker to start PMO control.']);if(m.over)a.push(['critical',m.over+' delayed / overdue commitment(s)','Confirm root cause, accountable PIC, corrective action and recovery ETA.']);if(m.risk)a.push(['',m.risk+' at-risk item(s)','Validate mitigation, dependency and decision date.']);if(m.missing)a.push(['',m.missing+' governance gap(s)','PIC or ETA is missing / TBC.']);if(!a.length)a.push(['good','Portfolio is currently stable','No delayed or at-risk task detected.']);document.getElementById('alerts').innerHTML=a.map(x=>'<div class="alert '+x[0]+'"><b>'+esc(x[1])+'</b><br><span class="mini muted">'+esc(x[2])+'</span></div>').join('');
let now=project().tasks.filter(x=>/delayed|overdue|risk/i.test(x.status)).slice(0,10);document.getElementById('today').innerHTML=now.length?now.map(x=>'<div class="projectline"><b>'+esc(x.task)+'</b><div class="mini muted">'+esc(x.pic)+' · '+esc(x.eta)+' · '+esc(x.status)+'</div></div>').join(''):'<div class="muted mini">No immediate recovery item detected.</div>';
document.getElementById('projectList').innerHTML=state.projects.map(p=>'<div class="projectline '+(p.id===state.active?'active':'')+'" data-p="'+p.id+'"><b>'+esc(p.name)+'</b><div class="mini muted">'+p.tasks.length+' tasks · '+p.tasks.filter(x=>/delayed|overdue/i.test(x.status)).length+' delayed/overdue</div></div>').join('');document.querySelectorAll('[data-p]').forEach(e=>e.onclick=()=>{state.active=e.dataset.p;save();render()});
let q=document.getElementById('statusFilter').value.toLowerCase(),t=project().tasks.filter(x=>!q||x.status.toLowerCase()===q);document.getElementById('taskRows').innerHTML=t.map(x=>'<tr><td><b>'+esc(x.task)+'</b></td><td><span class="tag '+risk(x)+'">'+esc(x.status)+'</span></td><td>'+esc(x.stream)+'</td><td>'+esc(x.pic)+'</td><td>'+esc(x.eta)+'</td><td>'+esc(x.priority)+'</td><td>'+esc(x.dependency||'—')+'</td><td>'+esc(x.action||'—')+'</td></tr>').join('')||'<tr><td colspan="8" class="muted">No tasks available.</td></tr>';
let c=changes(),s=state.snapshots[project().id]||[];document.getElementById('changeList').innerHTML=c.length?c.map(x=>'<div class="alert '+(x.type==='DETERIORATED'?'critical':'')+'"><b>'+esc(x.type)+' · '+esc(x.task)+'</b><br><span class="mini muted">'+esc(x.detail)+'</span></div>').join(''):'<div class="muted mini">No comparison available. Save a snapshot, then load an updated tracker.</div>';document.getElementById('snapshotInfo').innerHTML=s.length?'<div class="mini muted">'+s.length+' snapshot(s). Latest: '+new Date(s[s.length-1].at).toLocaleString()+'</div>':'<div class="mini muted">No snapshot saved.</div>';
let rec=project().tasks.filter(x=>/delayed|overdue|risk/i.test(x.status));document.getElementById('recoveryPlan').innerHTML=rec.length?rec.map((x,i)=>'<div class="projectline"><span class="badge">P'+(i+1)+'</span> <b>'+esc(x.task)+'</b><div class="mini muted" style="margin-top:6px">Owner: '+esc(x.pic)+' · Current commitment: '+esc(x.eta)+' · '+esc(x.status)+'</div><div class="mini" style="margin-top:7px">'+esc(x.action||'Confirm root cause, corrective action, owner and recovery ETA.')+'</div></div>').join(''):'<div class="muted mini">No recovery action generated.</div>';
let score=m.total?Math.max(0,100-Math.round(m.missing/m.total*100)):0;document.getElementById('quality').innerHTML='<div class="v '+(score<70?'red':score<90?'amber':'green')+'">'+score+'%</div><div class="mini muted">Governance completeness based on PIC and ETA.</div><div class="alert"><b>Recommended control:</b><br><span class="mini muted">Replace TBC ownership and commitments before the next PMO control point.</span></div>';
let f=[];if(m.deter)f.push('Stop deterioration: '+m.deter+' item(s) worsened versus baseline.');if(m.over)f.push('Recover '+m.over+' delayed / overdue commitment(s).');if(m.risk)f.push('Control '+m.risk+' at-risk item(s) before they slip.');if(m.missing)f.push('Close '+m.missing+' governance gap(s).');if(!f.length)f.push('Maintain commitments and validate upcoming dependencies.');document.getElementById('managementFocus').innerHTML=f.map(v=>'<div class="alert">'+esc(v)+'</div>').join('');
let total=state.projects.length,tasks=state.projects.reduce((a,p)=>a+p.tasks.length,0),bad=state.projects.reduce((a,p)=>a+p.tasks.filter(x=>/delayed|overdue/i.test(x.status)).length,0);document.getElementById('portfolioHealth').innerHTML='<div class="v blue">'+total+'</div><div class="mini muted">Active project(s)</div><div class="v">'+tasks+'</div><div class="mini muted">Portfolio tasks</div><div class="v '+(bad?'red':'green')+'">'+bad+'</div><div class="mini muted">Delayed / overdue</div>'}
document.getElementById('tabs').onclick=e=>{if(e.target.tagName!=='BUTTON')return;document.querySelectorAll('.tabs button').forEach(x=>x.classList.remove('active'));e.target.classList.add('active');document.querySelectorAll('.section').forEach(x=>x.classList.remove('active'));document.getElementById(e.target.dataset.tab).classList.add('active')};
document.getElementById('statusFilter').onchange=render;
document.getElementById('newProject').onclick=()=>{let n=prompt('Project name');if(!n)return;let id='p'+Date.now();state.projects.push({id,name:n,tasks:[]});state.active=id;save();render()};
document.getElementById('file').onchange=e=>{let f=e.target.files[0];if(!f)return;let r=new FileReader();r.onload=ev=>{try{importBook=XLSX.read(new Uint8Array(ev.target.result),{type:'array',cellDates:true});importFileName=f.name;let all=scanWorkbook(importBook),best=all[0];document.getElementById('sheetControl').innerHTML='<label class="mini muted">Worksheet:</label><select id="sheetPick">'+all.map(x=>'<option value="'+esc(x.name)+'">'+esc(x.name)+' · '+x.usable+' task rows · score '+x.score+'</option>').join('')+'</select><button class="btn primary" id="importSelected">Import Selected Sheet</button>';document.getElementById('sheetPick').value=best.name;document.getElementById('importSelected').onclick=()=>importSheet(document.getElementById('sheetPick').value);document.getElementById('mapping').textContent='Workbook '+f.name+' scanned. Best match: '+best.name+' with '+best.usable+' task rows and header row '+best.headerRow+'. Import it or select another worksheet.';importSheet(best.name)}catch(err){document.getElementById('mapping').textContent='Unable to read this file: '+err.message}};r.readAsArrayBuffer(f)};
document.getElementById('saveSnapshot').onclick=()=>{let p=project();state.snapshots[p.id]=state.snapshots[p.id]||[];state.snapshots[p.id].push({at:Date.now(),tasks:JSON.parse(JSON.stringify(p.tasks))});save();render()};
document.getElementById('clearSnapshots').onclick=()=>{if(confirm('Clear all snapshots?')){state.snapshots[project().id]=[];save();render()}};
document.getElementById('clearProject').onclick=()=>{if(confirm('Clear current tracker?')){project().tasks=[];save();render()}};
document.getElementById('demoData').onclick=()=>{project().tasks=clean([{Task:'SIT defect resolution',Status:'Delayed',Stream:'Testing',Owner:'Vendor SIT Lead','Proposed End':'12 Sep',Dependency:'Environment stability','Next Action':'Daily defect burn-down and approved recovery plan',Priority:'Critical'},{Task:'Payment integration validation',Status:'At Risk',Stream:'Integration',Owner:'Integration Lead','Proposed End':'10 Sep',Blocker:'External API','Next Action':'Confirm client availability and fallback test window',Priority:'High'},{Task:'Solution document update',Status:'On Track',Stream:'Architecture',Owner:'Solution Architect','Proposed End':'09 Sep','Next Action':'Reflect final agreed solution before PB2'},{Task:'Environment readiness',Status:'Completed',Stream:'Platform',Owner:'Infra Lead','Proposed End':'Completed'}]);save();render()};
document.getElementById('exportCsv').onclick=()=>{let rows=[['Task','Status','Stream','PIC','ETA','Priority','Dependency','PMO Action'],...project().tasks.map(x=>[x.task,x.status,x.stream,x.pic,x.eta,x.priority,x.dependency,x.action])],csv=rows.map(r=>r.map(v=>'"'+String(v).replace(/"/g,'""')+'"').join(',')).join('\n'),a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));a.download='ProjectMind_'+project().name.replace(/\W+/g,'_')+'.csv';a.click()};
function brief(){let p=project(),m=metrics(),lines=['PROJECTMIND EXECUTIVE DAILY BRIEF','Project: '+p.name,'','Current position: '+m.over+' delayed/overdue, '+m.risk+' at risk, '+m.done+' completed out of '+m.total+' tracked item(s).'];if(m.deter)lines.push('Trend: '+m.deter+' item(s) deteriorated since the previous baseline.');if(m.missing)lines.push('Governance: '+m.missing+' item(s) have missing or TBC PIC/ETA.');lines.push('','Management attention:');p.tasks.filter(x=>/delayed|overdue|risk/i.test(x.status)).slice(0,8).forEach(x=>lines.push('- '+x.task+' | '+x.status+' | PIC: '+x.pic+' | Commitment: '+x.eta));lines.push('','Required actions today:','1. Confirm root cause and corrective action for each delayed commitment.','2. Validate dependencies before accepting any revised ETA.','3. Escalate repeated deterioration affecting the next milestone.','4. Reflect final solutions in all related solution documents.');return lines.join('\n')}
document.getElementById('generateBrief').onclick=()=>document.getElementById('brief').value=brief();document.getElementById('copyBrief').onclick=()=>navigator.clipboard.writeText(document.getElementById('brief').value);
function exportExecutivePpt(){
  if(!window.PptxGenJS){alert('PPT engine is still loading. Please try again in a moment.');return}
  const p=project(),wi=p.workbook||{},tasks=p.tasks||[],need=Array.isArray(wi.needAttention)?wi.needAttention:[],pvRaw=Array.isArray(wi.pivotRaw)?wi.pivotRaw:[],needRaw=Array.isArray(wi.needRaw)?wi.needRaw:[],pv=Array.isArray(wi.pivot)?wi.pivot:[];
  const pptx=new PptxGenJS();pptx.layout='LAYOUT_WIDE';pptx.author='ProjectMind AI';pptx.subject='Executive PMO Report';pptx.title=p.name+' - Executive PMO Report';pptx.company='ProjectMind AI';pptx.lang='en-US';pptx.theme={headFontFace:'Aptos Display',bodyFontFace:'Aptos',lang:'en-US'};
  const W=13.333,H=7.5,C={navy:'16324F',blue:'1E73BE',cyan:'21A4D8',ink:'183044',muted:'60758A',line:'D8E3EC',bg:'F7FAFC',white:'FFFFFF',red:'D94C5A',amber:'D69E2E',green:'2E9B73',paleBlue:'EAF4FB',paleRed:'FDEFF1',paleAmber:'FFF6E5',paleGreen:'ECF8F3'};
  const n=v=>{let x=Number(String(v).replace(/,/g,''));return isNaN(x)?0:x},statusColor=s=>/delay|overdue/i.test(s)?C.red:/risk/i.test(s)?C.amber:/complete/i.test(s)?C.green:C.blue;
  function bg(sl){sl.background={color:'F6F6F5'};sl.addText('PROJECTMIND AI',{x:10.65,y:.22,w:2.05,h:.22,fontSize:7.5,bold:true,color:'4A5560',align:'right',margin:0});sl.addText('EXECUTIVE PMO REPORT',{x:10.65,y:.43,w:2.05,h:.15,fontSize:5.5,color:'7A8792',align:'right',margin:0})}
  function title(sl,t,st){sl.addText(t,{x:.55,y:.34,w:10.4,h:.38,fontFace:'Aptos Display',fontSize:26,bold:true,color:'151A20',margin:0});if(st){sl.addShape(pptx.ShapeType.rect,{x:.75,y:1.0,w:11.55,h:.38,fill:{color:'F8F8F7',transparency:100},line:{color:'5E646B',width:.6}});sl.addText(st,{x:.85,y:1.10,w:11.2,h:.16,fontSize:8.5,color:'313942',margin:0});}sl.addShape(pptx.ShapeType.rect,{x:.75,y:1.46,w:1.0,h:.055,fill:{color:C.cyan},line:{color:C.cyan}})}
  function chip(sl,x,y,w,label,value,color,pale){sl.addShape(pptx.ShapeType.roundRect,{x,y,w,h:1.45,rectRadius:.08,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x,y,w:.055,h:1.45,fill:{color},line:{color}});sl.addShape(pptx.ShapeType.rect,{x:x+.22,y:y+.2,w:w-.42,h:.30,fill:{color:'F8F8F7',transparency:100},line:{color:'4F555C',width:.45}});sl.addText(String(label).toUpperCase(),{x:x+.32,y:y+.30,w:w-.62,h:.12,fontSize:7.2,color:'303840',margin:0});sl.addShape(pptx.ShapeType.rect,{x:x+.22,y:y+.58,w:w-.42,h:.68,fill:{color:'F8F8F7',transparency:100},line:{color:'4F555C',width:.45}});sl.addText(String(value),{x:x+.32,y:y+.79,w:w-.62,h:.30,fontSize:20,bold:true,color:'171D24',margin:0})}
  function parsePivot(){
    const labels=['At Risk','Completed','Delayed','On Track'],out={counts:{},months:[],matrix:{}};
    let countHeader=-1,monthHeader=-1;
    for(let i=0;i<pvRaw.length;i++){
      const r=pvRaw[i].map(v=>String(v||'').trim());
      const hasCount=r.some(v=>/^Count of Status$/i.test(v));
      const hasLabel=r.some(v=>/^Row Labels$/i.test(v));
      if(countHeader<0&&hasCount&&(hasLabel||r.some(v=>/^Status$/i.test(v))))countHeader=i;
      const monthCount=r.filter(v=>/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i.test(v)).length;
      if(monthHeader<0&&monthCount>=2&&(hasLabel||r.some(v=>/^Status$/i.test(v))))monthHeader=i;
    }
    const readLabelRow=(r)=>labels.find(x=>r.some(v=>String(v||'').trim().toLowerCase()===x.toLowerCase()));
    if(countHeader>=0){
      for(let i=countHeader+1;i<Math.min(pvRaw.length,countHeader+30);i++){
        const r=pvRaw[i].map(v=>String(v||'').trim()),lab=readLabelRow(r);
        if(!lab)continue;
        const nums=r.filter(v=>/^-?\d+(\.\d+)?$/.test(String(v).trim())).map(n);
        if(nums.length)out.counts[lab]=nums[0];
      }
    }
    if(monthHeader>=0){
      const h=pvRaw[monthHeader].map(v=>String(v||'').trim());
      const idx=h.map((v,i)=>/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)$/i.test(v)?i:-1).filter(i=>i>=0);
      out.months=idx.map(i=>h[i]);
      for(let i=monthHeader+1;i<Math.min(pvRaw.length,monthHeader+30);i++){
        const r=pvRaw[i].map(v=>String(v||'').trim()),lab=readLabelRow(r);
        if(lab)out.matrix[lab]=idx.map(j=>n(r[j]));
      }
    }
    if(!Object.keys(out.counts).length){tasks.forEach(t=>{let k=/complete/i.test(t.status)?'Completed':/delay|overdue/i.test(t.status)?'Delayed':/risk/i.test(t.status)?'At Risk':'On Track';out.counts[k]=(out.counts[k]||0)+1})}
    labels.forEach(k=>out.counts[k]=n(out.counts[k]||0));
    out.total=Object.values(out.counts).reduce((a,b)=>a+b,0);
    return out
  }
  function parseStreamAttention(){
    let rows=[],header=-1;
    for(let i=0;i<needRaw.length;i++){let r=needRaw[i].map(v=>String(v||'').trim());if(r.some(v=>/^Stream$/i.test(v))&&r.some(v=>/DELAYED/i.test(v))){header=i;break}}
    if(header>=0){let h=needRaw[header].map(v=>String(v||'').trim()),si=h.findIndex(v=>/^Stream$/i.test(v)),ri=h.findIndex(v=>/AT RISK/i.test(v)),di=h.findIndex(v=>/^DELAYED$/i.test(v)),ti=h.findIndex(v=>/Grand Total|Total Result/i.test(v));for(let i=header+1;i<needRaw.length;i++){let r=needRaw[i].map(v=>String(v||'').trim()),name=r[si];if(!name||/Grand Total|Total Result/i.test(name))break;rows.push({stream:name,risk:n(r[ri]),delayed:n(r[di]),total:n(r[ti])})}}
    if(!rows.length){let m={};tasks.forEach(t=>{let k=t.stream||'General';if(!m[k])m[k]={stream:k,risk:0,delayed:0,total:0};m[k].total++;if(/risk/i.test(t.status))m[k].risk++;if(/delay|overdue/i.test(t.status))m[k].delayed++});rows=Object.values(m)}
    return rows.sort((a,b)=>(b.delayed+b.risk)-(a.delayed+a.risk))
  }
  function parseTimeline(){
    const parseDate=v=>{
      if(v instanceof Date&&!isNaN(v))return v;
      if(typeof v==='number'&&v>20000&&v<70000)return new Date(Date.UTC(1899,11,30)+v*86400000);
      const q=String(v||'').trim();if(!q)return null;
      const d=new Date(q);return isNaN(d)?null:d;
    };
    const canonical=['Connectivity Lower','Connectivity Prod','CRP','Data Migration','Deployment','Development','DR','GNG Decission','Go Live','Hypercare','Infra','Performance Test','Requirement Gathering','Security Test','Solution','Training','Production Connectivity','User Training Plan','Requirement Analysis','SIT','UAT','Testing Plan'];
    const aliases={};
    canonical.forEach(x=>aliases[x.toLowerCase().replace(/[^a-z0-9]/g,'')]=x);
    aliases['connectivitylower']=aliases['lowerconnectivity']='Connectivity Lower';
    aliases['connectivityprod']=aliases['prodconnectivity']='Connectivity Prod';
    aliases['productionconnectivity']='Production Connectivity';
    aliases['gngdecision']=aliases['gngdecission']='GNG Decission';
    const normalizeStream=v=>{
      const raw=String(v||'').trim();if(!raw)return'';
      const k=raw.toLowerCase().replace(/[^a-z0-9]/g,'');
      if(aliases[k])return aliases[k];
      for(const name of canonical){const nk=name.toLowerCase().replace(/[^a-z0-9]/g,'');if(k.includes(nk)||nk.includes(k))return name}
      return '';
    };
    const map={};
    const add=(stream,task,startV,endV,status,source)=>{
      const end=parseDate(endV),start=parseDate(startV)||end;if(!end)return;
      const k=normalizeStream(stream||task)||'General';
      if(!map[k])map[k]={stream:k,start:start,end:end,total:0,delayed:0,risk:0,tasks:[],source:source||'MPP'};
      const x=map[k];x.total++;if(start<x.start)x.start=start;if(end>x.end)x.end=end;
      if(task&&x.tasks.length<5)x.tasks.push(String(task));
      if(/delay|overdue|late|blocked/i.test(String(status||'')))x.delayed++;
      if(/risk|amber/i.test(String(status||'')))x.risk++;
    };
    const rows=Array.isArray(wi.timeline)?wi.timeline:[];
    rows.forEach(r=>add(r['Workstream']||r['Stream']||r['Task'],r['Task']||r['Activity']||r['Workstream'],r['Start Date']||r['Baseline Start']||r['Planned Start']||r['Start'],r['Proposed End']||r['Finish Date']||r['Baseline Finish']||r['End Date']||r['Finish'],r['Status'],'MPP'));
    const raw=Array.isArray(wi.timelineRaw)?wi.timelineRaw:[];
    if(raw.length){
      for(let h=0;h<Math.min(raw.length,60);h++){
        const hdr=raw[h].map(v=>String(v||'').trim().toLowerCase());
        const si=hdr.findIndex(v=>/stream|workstream|phase/.test(v)),ti=hdr.findIndex(v=>/^task$|activity|deliverable|name/.test(v)),ei=hdr.findIndex(v=>/proposed end|baseline finish|finish|end date|target date|commit/.test(v)),sti=hdr.findIndex(v=>/^start$|baseline start|planned start/.test(v)),ssi=hdr.findIndex(v=>/^status$|health|rag/.test(v));
        if(ei>=0&&(si>=0||ti>=0)){
          for(let i=h+1;i<raw.length;i++){const r=raw[i]||[];if(!r.some(v=>String(v||'').trim()))continue;add(si>=0?r[si]:r[ti],ti>=0?r[ti]:'',sti>=0?r[sti]:'',r[ei],ssi>=0?r[ssi]:'','MPP-header');}
          break;
        }
      }
      raw.forEach(r=>{
        const vals=(r||[]).map(v=>String(v||'').trim()),joined=vals.join(' ');
        const stream=normalizeStream(joined);if(!canonical.includes(stream))return;
        const dates=(r||[]).filter(v=>parseDate(v));
        if(dates.length)add(stream,stream,dates[0],dates[dates.length-1],vals.find(v=>/delay|overdue|risk|track|complete/i.test(v))||'','MPP-heuristic');
      });
    }
    if(!Object.keys(map).length){
      tasks.forEach(t=>add(t.stream,t.task,'',t.eta,t.status,'Tracker'));
    }
    Object.values(map).forEach(x=>{if(+x.end===+x.start)x.start=new Date(+x.end-21*86400000)});
    const order=new Map(canonical.map((x,i)=>[x,i]));
    return Object.values(map).sort((a,b)=>(order.has(a.stream)?order.get(a.stream):999)-(order.has(b.stream)?order.get(b.stream):999)||a.start-b.start);
  }
  const health=parsePivot(),streams=parseStreamAttention(),timeline=parseTimeline(),total=health.total||tasks.length,completed=health.counts.Completed,delayed=health.counts.Delayed,risk=health.counts['At Risk'],ontrack=health.counts['On Track'],exception=delayed+risk,pct=x=>total?Math.round(x/total*100):0;
  function topNeed(){
    let rows=need.filter(r=>String(r['Task Requiring Attention']||r['Task']||'').trim());
    if(!rows.length&&streams.length){
      rows=streams.filter(x=>x.delayed+x.risk>0).sort((a,b)=>(b.delayed+b.risk)-(a.delayed+a.risk)).map(x=>({
        'Task Requiring Attention':x.stream+' exception backlog',
        'Stream':x.stream,
        'Attention Type':x.delayed?'DELAYED':'AT RISK - Schedule Slip',
        'Priority':(x.delayed+x.risk)>=8?'Critical':(x.delayed+x.risk)>=3?'High':'Medium',
        'Proposed End':'Recovery commitment required',
        'PMO Recommendation':x.delayed?'Freeze further slippage; confirm root cause, accountable PIC, recovery date and dependency closure.':'Validate mitigation, owner and trigger date before the risk converts into delay.'
      }));
    }
    if(!rows.length){
      rows=tasks.filter(t=>/delay|overdue|risk/i.test(t.status)).map(t=>({
        'Task Requiring Attention':t.task,'Stream':t.stream,
        'Attention Type':/risk/i.test(t.status)?'AT RISK - Schedule Slip':'DELAYED',
        'Priority':t.priority||'High','Proposed End':t.eta||'TBC',
        'PMO Recommendation':t.action||'Confirm root cause, accountable PIC, recovery date and dependency closure.'
      }));
    }
    if(!rows.length){
      rows=[{'Task Requiring Attention':'Executive control required — validate data completeness','Stream':'Project Control','Attention Type':'DATA / GOVERNANCE GAP','Priority':'High','Proposed End':'Next control point','PMO Recommendation':'Validate source workbook mapping, ownership and milestone dates before executive reporting.'}];
    }
    return rows.sort((a,b)=>({critical:3,high:2,medium:1}[String(b['Priority']||'').toLowerCase()]||0)-({critical:3,high:2,medium:1}[String(a['Priority']||'').toLowerCase()]||0)).slice(0,10)
  }

  // 1 Project Delivery Health Check — reference executive structure
  let sl=pptx.addSlide();bg(sl);
  sl.addShape(pptx.ShapeType.rect,{x:.82,y:.68,w:11.7,h:.72,fill:{color:'F8F8F7',transparency:100},line:{color:'3F454B',width:.65}});
  sl.addText('PROJECT DELIVERY - HEALTH CHECK',{x:.92,y:.86,w:9.5,h:.34,fontSize:30,bold:true,color:'14191F',margin:0});
  sl.addShape(pptx.ShapeType.rect,{x:.85,y:1.55,w:7.9,h:.40,fill:{color:'F8F8F7',transparency:100},line:{color:'4B5158',width:.55}});
  sl.addText('Status Overview • Risk Concentration • Recovery Focus',{x:.98,y:1.67,w:7.55,h:.16,fontSize:12,color:'2D343B',margin:0});
  [['TOTAL ACTIVITIES',total,C.cyan],['COMPLETED',completed,C.green],['DELAYED',delayed,C.red],['AT RISK',risk,C.amber]].forEach((z,i)=>chip(sl,.8+i*2.35,2.55,2.15,z[0],z[1],z[2],'FFFFFF'));
  const phaseRows=[['Work Completed',pct(completed)+'%'],['Work In Progress',(100-pct(completed))+'%'],['At Risk',pct(risk)+'%'],['Delayed',pct(delayed)+'%'],['On Track',pct(ontrack)+'%']];
  sl.addShape(pptx.ShapeType.rect,{x:.75,y:4.42,w:4.55,h:2.22,fill:{color:'F8F8F7',transparency:100},line:{color:'444A51',width:.6}});
  sl.addText('Phase',{x:.86,y:4.57,w:1.9,h:.2,fontSize:12,bold:true,color:'22272D',margin:0});
  sl.addText('% Complete',{x:2.85,y:4.57,w:1.25,h:.2,fontSize:12,bold:true,color:'22272D',margin:0});
  sl.addText('Health',{x:4.18,y:4.57,w:.8,h:.2,fontSize:12,bold:true,color:'22272D',margin:0});
  phaseRows.forEach((r,i)=>{let y=4.86+i*.36;sl.addShape(pptx.ShapeType.rect,{x:.75,y,w:4.55,h:.004,fill:{color:'555A60'},line:{color:'555A60'}});sl.addText(r[0],{x:.88,y:y+.08,w:1.95,h:.18,fontSize:11,color:'2B3239',margin:0});sl.addText(r[1],{x:3.05,y:y+.08,w:.75,h:.18,fontSize:11,color:'2B3239',align:'center',margin:0})});
  sl.addShape(pptx.ShapeType.ellipse,{x:4.4,y:5.25,w:.58,h:.58,fill:{color:risk>0?C.amber:C.green},line:{color:'26313B',width:1}});
  sl.addText('Risk / Escalation:',{x:5.55,y:4.46,w:2.5,h:.22,fontSize:12,bold:true,color:'22272D',margin:0});
  const riskLines=[
    delayed?'The project is under delivery pressure with '+delayed+' delayed activities requiring an active recovery path.':'No material delayed backlog is currently detected.',
    risk?'There are '+risk+' at-risk activities that require dependency protection before they convert into delays.':'At-risk exposure is currently limited.',
    topNeed().slice(0,2).map(x=>x['Task Requiring Attention']||x.Task).filter(Boolean).join(' • ')
  ].filter(Boolean);
  riskLines.forEach((v,i)=>sl.addText((i+1)+'.',{x:5.55,y:4.85+i*.55,w:.25,h:.18,fontSize:9,color:'22272D',margin:0}),sl.addText(v,{x:5.95,y:4.83+i*.55,w:6.0,h:.42,fontSize:9.5,color:'2E353D',fit:'shrink',margin:0}));
  
  // 2 Executive Snapshot
  sl=pptx.addSlide();bg(sl);title(sl,'Executive Snapshot','The portfolio is progressing, but delivery pressure is concentrated in a small number of streams.');
  [['COMPLETED',completed,pct(completed),C.green],['DELAYED',delayed,pct(delayed),C.red],['ON TRACK',ontrack,pct(ontrack),C.cyan],['AT RISK',risk,pct(risk),C.amber]].forEach((z,i)=>{
    let x=.75+i*3.18;sl.addShape(pptx.ShapeType.roundRect,{x,y:1.78,w:2.95,h:1.52,rectRadius:.07,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x,y,w:.055,h:1.52,fill:{color:z[3]},line:{color:z[3]}});
    sl.addShape(pptx.ShapeType.rect,{x:x+.18,y:1.98,w:2.58,h:.30,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(z[0],{x:x+.28,y:2.08,w:2.25,h:.13,fontSize:7.5,color:'2E343B',margin:0});
    sl.addShape(pptx.ShapeType.rect,{x:x+.18,y:2.38,w:2.58,h:.72,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(z[1]+' / '+total+' •\n'+z[2]+'%',{x:x+.3,y:2.55,w:2.1,h:.45,fontSize:18,bold:true,color:'171D24',breakLine:false,margin:0});
  });
  sl.addShape(pptx.ShapeType.rect,{x:.75,y:3.95,w:2.0,h:.30,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText('Highlight',{x:.88,y:4.05,w:1.6,h:.12,fontSize:8,bold:true,color:'242B32',margin:0});
  sl.addShape(pptx.ShapeType.rect,{x:.75,y:4.35,w:11.8,h:1.35,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});
  const highlights=['More than half of the activities are completed. ',exception+' activities remain in an exception state (Delayed + At Risk).','The key challenge is delay concentration rather than portfolio-wide deterioration.'];
  highlights.forEach((v,i)=>sl.addText('• '+v,{x:.92,y:4.55+i*.43,w:11.2,h:.22,fontSize:12,color:'2A3138',margin:0}));
  sl.addShape(pptx.ShapeType.rect,{x:.75,y:6.22,w:11.5,h:.38,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText('Key message: Focus recovery effort where delay concentration and downstream dependency are highest.',{x:.88,y:6.34,w:11.2,h:.15,fontSize:10,bold:true,color:'232A31',margin:0});

  // 3 Portfolio Health Distribution
  sl=pptx.addSlide();bg(sl);title(sl,'Portfolio Health Distribution','Current activity status across the full project portfolio.');
  sl.addText('Activities',{x:2.55,y:1.82,w:2.2,h:.3,fontSize:18,bold:true,color:'20262D',align:'center',margin:0});
  const dist=[['At Risk',risk,C.amber],['Completed',completed,C.green],['Delayed',delayed,C.red],['On Track',ontrack,C.cyan]],sum=Math.max(1,total),cx=3.18,cy=4.0,R=1.45;
  if(pptx.ChartType&&pptx.ChartType.doughnut){sl.addChart(pptx.ChartType.doughnut,[{name:'Activities',labels:dist.map(d=>d[0]),values:dist.map(d=>d[1])}],{x:1.55,y:2.05,w:3.25,h:3.25,showLegend:false,showTitle:false,showValue:true,showPercent:false,holeSize:52,dataLabelPosition:'bestFit',chartColors:dist.map(d=>d[2]),showValue:true,fontFace:'Aptos',fontSize:9});}
  else {dist.forEach((d,i)=>{let y=2.35+i*.58,w=2.2*d[1]/sum;sl.addText(d[0],{x:1.25,y:y+.06,w:1.05,h:.14,fontSize:7.5,color:'30363D',margin:0});sl.addShape(pptx.ShapeType.rect,{x:2.35,y,w,h:.22,fill:{color:d[2]},line:{color:d[2]}});sl.addText(String(d[1]),{x:2.42+w,y:y+.04,w:.35,h:.12,fontSize:7,bold:true,color:'252B31',margin:0})});}
  // reliable donut fallback overlay
  sl.addShape(pptx.ShapeType.ellipse,{x:cx-.62,y:cy-.62,w:1.24,h:1.24,fill:{color:'F6F6F5'},line:{color:'F6F6F5'}});
  let legendY=5.55;dist.forEach((d,i)=>{let x=1.65+i*1.1;sl.addShape(pptx.ShapeType.rect,{x,y:legendY,w:.08,h:.08,fill:{color:d[2]},line:{color:d[2]}});sl.addText(d[0],{x:x+.13,y:legendY-.01,w:.9,h:.13,fontSize:7.5,color:'30363D',margin:0})});
  sl.addShape(pptx.ShapeType.rect,{x:6.55,y:1.85,w:5.4,h:.45,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText('What the numbers tell us',{x:6.7,y:1.98,w:4.9,h:.18,fontSize:17,bold:true,color:'1D2329',margin:0});
  sl.addShape(pptx.ShapeType.rect,{x:6.55,y:2.5,w:5.4,h:2.7,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});
  [['Completed',completed,'are already completed, indicating strong execution progress.'],['Delayed',delayed,'are delayed and represent the immediate recovery backlog.'],['At Risk',risk,'are at risk and should be prevented from converting into delays.'],['On Track',ontrack,'remain on track and require dependency protection.']].forEach((z,i)=>sl.addText('• '+pct(z[1])+'% of activities '+z[2],{x:6.68,y:2.72+i*.56,w:4.85,h:.35,fontSize:10.5,color:'2B3239',fit:'shrink',margin:0}));
  sl.addShape(pptx.ShapeType.roundRect,{x:6.55,y:5.5,w:5.4,h:.95,rectRadius:.06,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x:6.55,y:5.5,w:.055,h:.95,fill:{color:C.red},line:{color:C.red}});sl.addText('EXCEPTION BACKLOG',{x:6.8,y:5.68,w:4.7,h:.15,fontSize:8,bold:true,color:'303840',margin:0});sl.addShape(pptx.ShapeType.rect,{x:6.78,y:5.98,w:4.9,h:.34,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(delayed+' Delayed + '+risk+' At Risk = '+exception+' items',{x:6.9,y:6.08,w:4.5,h:.15,fontSize:11,bold:true,color:'1F252C',margin:0});

  // 4 Delay Concentration by Stream
  sl=pptx.addSlide();bg(sl);title(sl,'Delay Concentration by Stream','The delay is not evenly distributed — one stream can dominate the recovery challenge.');
  sl.addText('Delayed',{x:3.65,y:1.82,w:2,h:.28,fontSize:18,bold:true,color:'22282F',align:'center',margin:0});
  const delayRows=streams.filter(x=>x.delayed>0).sort((a,b)=>b.delayed-a.delayed).slice(0,6),maxDelay=Math.max(1,...delayRows.map(x=>x.delayed));
  delayRows.forEach((d,i)=>{let y=2.45+i*.55;sl.addText(d.stream,{x:.85,y:y+.1,w:1.75,h:.16,fontSize:8.5,color:'39434C',align:'right',margin:0});let w=5.0*d.delayed/maxDelay;sl.addShape(pptx.ShapeType.rect,{x:2.75,y:y+.06,w,h:.26,fill:{color:'FF2D2D'},line:{color:'FF2D2D'}});sl.addText(String(d.delayed),{x:2.75+w+.12,y:y+.07,w:.45,h:.16,fontSize:11,color:'252B31',margin:0})});
  let top2=streams.filter(x=>x.delayed>0).sort((a,b)=>b.delayed-a.delayed).slice(0,2);top2.forEach((d,i)=>{let y=1.78+i*1.65;sl.addShape(pptx.ShapeType.roundRect,{x:8.45,y,w:3.9,h:1.3,rectRadius:.06,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x:8.45,y,w:.055,h:1.3,fill:{color:C.red},line:{color:C.red}});sl.addShape(pptx.ShapeType.rect,{x:8.65,y:y+.18,w:3.5,h:.28,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(d.stream.toUpperCase()+' STREAM',{x:8.8,y:y+.28,w:3.1,h:.12,fontSize:7.5,color:'313942',margin:0});sl.addShape(pptx.ShapeType.rect,{x:8.65,y:y+.58,w:3.5,h:.65,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(d.delayed+' delayed / '+d.total+' total',{x:8.8,y:y+.78,w:3.1,h:.22,fontSize:17,bold:true,color:'171D24',margin:0})});
  sl.addShape(pptx.ShapeType.rect,{x:8.45,y:5.05,w:3.9,h:.38,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText('Management implication',{x:8.58,y:5.17,w:3.4,h:.15,fontSize:10,bold:true,color:'252B31',margin:0});sl.addShape(pptx.ShapeType.rect,{x:8.45,y:5.5,w:3.9,h:1.0,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(top2.length?'Prioritize '+top2.map(x=>x.stream).join(' and ')+' first, as they account for the majority of delayed activities.':'Prioritize streams with the highest delay concentration first.',{x:8.6,y:5.7,w:3.55,h:.55,fontSize:10.5,color:'303840',fit:'shrink',margin:0});

  // 5 Monthly Delivery Trend
  sl=pptx.addSlide();bg(sl);title(sl,'Monthly Delivery Trend','The current pressure point is concentrated in the highest-volume month, followed by a forward workload that must be protected.');
  let months=health.months.length?health.months:[],monthly=[];
  if(months.length)monthly=months.map((mo,i)=>({mo,total:['Completed','Delayed','At Risk','On Track'].reduce((a,k)=>a+n((health.matrix[k]||[])[i]),0),completed:n((health.matrix.Completed||[])[i]),delayed:n((health.matrix.Delayed||[])[i]),risk:n((health.matrix['At Risk']||[])[i]),ontrack:n((health.matrix['On Track']||[])[i])}));
  if(!monthly.some(x=>x.total>0)){const order=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],mm={};tasks.forEach(t=>{let d=new Date(t.eta);if(isNaN(d))return;let mo=order[d.getMonth()];mm[mo]=mm[mo]||{mo,total:0,completed:0,delayed:0,risk:0,ontrack:0};mm[mo].total++;if(/complete/i.test(t.status))mm[mo].completed++;else if(/delay|overdue/i.test(t.status))mm[mo].delayed++;else if(/risk/i.test(t.status))mm[mo].risk++;else mm[mo].ontrack++;});monthly=Object.values(mm)}
  let peak=monthly.reduce((a,b)=>b.total>a.total?b:a,{mo:'N/A',total:0,delayed:0,risk:0,ontrack:0,completed:0}),peakIndex=Math.max(0,monthly.findIndex(x=>x.mo===peak.mo)),forward=monthly.slice(peakIndex+1).reduce((a,b)=>a+b.total,0),mmax=Math.max(1,...monthly.map(x=>x.total));
  sl.addShape(pptx.ShapeType.rect,{x:1.55,y:1.88,w:7.25,h:4.5,fill:{color:'F8F8F7',transparency:100},line:{color:'D6DEE6',width:.5}});
  monthly.forEach((d,i)=>{let x=1.9+i*(6.5/Math.max(1,monthly.length));let base=6.05,hh=3.45*d.total/mmax;let cur=base;[['completed',C.green],['delayed','FF2D2D'],['risk',C.amber],['ontrack',C.cyan]].forEach(z=>{let h=hh*(d[z[0]]/Math.max(1,d.total));if(h){cur-=h;sl.addShape(pptx.ShapeType.rect,{x,y:cur,w:.36,h,fill:{color:z[1]},line:{color:z[1]}})}});sl.addText(d.mo,{x:x-.2,y:6.18,w:.8,h:.18,fontSize:9,color:'43505B',align:'center',margin:0})});
  sl.addShape(pptx.ShapeType.rect,{x:9.25,y:1.85,w:3.25,h:1.1,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x:9.25,y:1.85,w:.055,h:1.1,fill:{color:C.cyan},line:{color:C.cyan}});sl.addText((peak.mo||'Peak').toUpperCase()+' VOLUME',{x:9.48,y:2.08,w:2.7,h:.14,fontSize:8,color:'303840',margin:0});sl.addText(peak.total+' activities',{x:9.48,y:2.42,w:2.7,h:.22,fontSize:14,bold:true,color:'22272D',margin:0});
  sl.addShape(pptx.ShapeType.rect,{x:9.25,y:3.18,w:3.25,h:1.1,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x:9.25,y:3.18,w:.055,h:1.1,fill:{color:C.red},line:{color:C.red}});sl.addText((peak.mo||'Peak').toUpperCase()+' DELAY',{x:9.48,y:3.41,w:2.7,h:.14,fontSize:8,color:'303840',margin:0});sl.addText(peak.delayed+' activities',{x:9.48,y:3.75,w:2.7,h:.22,fontSize:14,bold:true,color:'22272D',margin:0});
  sl.addShape(pptx.ShapeType.rect,{x:9.25,y:4.51,w:3.25,h:1.1,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x:9.25,y:4.51,w:.055,h:1.1,fill:{color:C.amber},line:{color:C.amber}});sl.addText('FORWARD WORKLOAD',{x:9.48,y:4.74,w:2.7,h:.14,fontSize:8,color:'303840',margin:0});sl.addText(forward+' activities',{x:9.48,y:5.08,w:2.7,h:.22,fontSize:14,bold:true,color:'22272D',margin:0});
  sl.addShape(pptx.ShapeType.rect,{x:9.2,y:6.0,w:3.4,h:.38,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText('Storyline',{x:9.35,y:6.12,w:2.8,h:.14,fontSize:10,bold:true,color:'252B31',margin:0});sl.addShape(pptx.ShapeType.rect,{x:9.2,y:6.43,w:3.4,h:.65,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText((peak.mo||'Current peak')+' is the critical inflection point. Recover delayed work while protecting the downstream execution pipeline.',{x:9.35,y:6.56,w:3.0,h:.32,fontSize:8.8,color:'303840',fit:'shrink',margin:0});

  // 6 Recommended Recovery Strategy
  sl=pptx.addSlide();bg(sl);title(sl,'Recommended Recovery Strategy','Shift from status reporting to active recovery management.');
  [['1','Contain','Freeze further slippage. Validate all delayed items and confirm true feasibility.',C.red],['2','Prioritize','Focus attention on the streams with the highest delay concentration before spreading effort across lower-impact streams.',C.amber],['3','Recover','Define action, owner, dependency, committed date, and measurable weekly output.',C.cyan],['4','Protect','Monitor at-risk items and protect downstream SIT, UAT, Deployment, and Go-Live.',C.green]].forEach((z,i)=>{let x=.7+i*3.2;sl.addShape(pptx.ShapeType.roundRect,{x,y:2.0,w:2.85,h:3.65,rectRadius:.08,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.ellipse,{x:x+.25,y:2.18,w:.55,h:.55,fill:{color:z[3]},line:{color:'27404F',width:.7}});sl.addText(z[0],{x:x+.25,y:2.37,w:.55,h:.14,fontSize:9,bold:true,color:'151A20',align:'center',margin:0});sl.addShape(pptx.ShapeType.rect,{x:x+.25,y:2.98,w:2.3,h:.4,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(z[1],{x:x+.38,y:3.10,w:2.0,h:.18,fontSize:16,bold:true,color:'22272D',margin:0});sl.addShape(pptx.ShapeType.rect,{x:x+.25,y:3.72,w:2.3,h:1.48,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(z[2],{x:x+.38,y:3.9,w:2.0,h:1.05,fontSize:10,color:'313942',fit:'shrink',margin:0})});
  sl.addShape(pptx.ShapeType.rect,{x:.8,y:6.25,w:11.6,h:.45,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText('Recovery tracker minimum fields: Activity | Root Cause | Recovery Action | PIC | Dependency | Commitment Date | Weekly Progress | Escalation Required',{x:.98,y:6.38,w:11.2,h:.16,fontSize:9.2,bold:true,color:'283038',align:'center',margin:0});

  // 7 Management Focus & Next Decisions
  sl=pptx.addSlide();bg(sl);title(sl,'Management Focus & Next Decisions','The next governance cycle should convert visibility into ownership and recovery commitments.');
  [['Immediate',['Validate the '+delayed+' delayed activities','Confirm root cause and recovery feasibility','Escalate unresolved blockers'],C.red],['This Week',['Finalize priority-stream recovery plans','Lock committed dates and owners','Update integrated dependency impact'],C.amber],['Ongoing',['Daily exception monitoring for critical items','Weekly management review','Protect downstream milestones'],C.cyan]].forEach((z,i)=>{let x=.75+i*4.15;sl.addShape(pptx.ShapeType.roundRect,{x,y:2.0,w:3.7,h:3.65,rectRadius:.08,fill:{color:'F8F8F7',transparency:100},line:{color:'CBD5DF',width:.6}});sl.addShape(pptx.ShapeType.rect,{x,y:1.92,w:3.7,h:.07,fill:{color:z[2]},line:{color:z[2]}});sl.addShape(pptx.ShapeType.rect,{x:x+.25,y:2.28,w:3.05,h:.42,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText(z[0],{x:x+.4,y:2.4,w:2.7,h:.18,fontSize:16,bold:true,color:'22272D',margin:0});sl.addShape(pptx.ShapeType.rect,{x:x+.25,y:3.0,w:3.05,h:1.85,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});z[1].forEach((v,j)=>sl.addText('• '+v,{x:x+.38,y:3.22+j*.48,w:2.72,h:.32,fontSize:10.5,color:'303840',fit:'shrink',margin:0}))});
  sl.addShape(pptx.ShapeType.rect,{x:.85,y:6.3,w:11.3,h:.55,fill:{color:'F8F8F7',transparency:100},line:{color:'4E555D',width:.45}});sl.addText('Decision required: Align on priority recovery streams and enforce committed recovery dates through the project governance cadence.',{x:1.0,y:6.48,w:11.0,h:.18,fontSize:10.5,bold:true,color:'252B31',align:'center',margin:0});

  // 8 Integrated Timeline by Stream — Executive MPP
  // 8 Integrated Timeline by Stream — Executive MPP
  sl=pptx.addSlide();bg(sl);
  title(sl,'08. Integrated Timeline — MPP by Stream','Executive delivery view. Each lane represents one workstream; colour and exception signals show where schedule pressure is concentrated.');

  const canonicalStreams=['Connectivity Lower','Connectivity Prod','CRP','Data Migration','Deployment','Development','DR','GNG Decission','Go Live','Hypercare','Infra','Performance Test','Requirement Gathering','Security Test','Solution','Training','Production Connectivity','User Training Plan','Requirement Analysis','SIT','UAT','Testing Plan'];
  const streamPhase={'Requirement Gathering':'PLAN','Requirement Analysis':'PLAN','Solution':'PLAN','Testing Plan':'PLAN','Development':'BUILD','Infra':'BUILD','Data Migration':'BUILD','Connectivity Lower':'BUILD','Connectivity Prod':'BUILD','Production Connectivity':'BUILD','CRP':'TEST','Performance Test':'TEST','Security Test':'TEST','SIT':'TEST','UAT':'TEST','Training':'READY','User Training Plan':'READY','DR':'READY','Deployment':'RELEASE','GNG Decission':'RELEASE','Go Live':'RELEASE','Hypercare':'RELEASE'};
  const phaseColor={PLAN:C.blue,BUILD:'4E7DAA',TEST:'7A65B8',READY:C.amber,RELEASE:C.red};
  const normTL=v=>String(v||'').toLowerCase().replace(/[^a-z0-9]/g,'');
  const aliasesTL={'connectivitylower':'Connectivity Lower','lowerconnectivity':'Connectivity Lower','connectivityprod':'Connectivity Prod','prodconnectivity':'Connectivity Prod','productionconnectivity':'Production Connectivity','gngdecision':'GNG Decission','gngdecission':'GNG Decission'};
  const matchStream=v=>{const raw=String(v||'').trim();if(!raw)return'';const n=normTL(raw);if(aliasesTL[n])return aliasesTL[n];for(const name of canonicalStreams){const nn=normTL(name);if(n===nn||n.includes(nn)||nn.includes(n))return name}return''};
  const grouped=new Map(canonicalStreams.map(name=>[name,{stream:name,start:null,end:null,total:0,delayed:0,risk:0,tasks:[]}]));
  timeline.forEach(x=>{
    const candidates=[x.stream,...(Array.isArray(x.tasks)?x.tasks:[])].filter(Boolean);let stream='';
    for(const c of candidates){stream=matchStream(c);if(stream)break}
    if(!stream)return;
    const g=grouped.get(stream),st=x.start instanceof Date&&!isNaN(x.start)?x.start:null,en=x.end instanceof Date&&!isNaN(x.end)?x.end:null;
    if(st&&(!g.start||st<g.start))g.start=st;if(en&&(!g.end||en>g.end))g.end=en;
    g.total+=Number(x.total||0);g.delayed+=Number(x.delayed||0);g.risk+=Number(x.risk||0);
    (x.tasks||[]).forEach(t=>{if(t&&g.tasks.length<3&&!g.tasks.includes(String(t)))g.tasks.push(String(t))});
  });
  const lanes=canonicalStreams.map(name=>grouped.get(name));
  const dated=lanes.filter(x=>x.start&&x.end&&isFinite(+x.start)&&isFinite(+x.end));
  const minDate=dated.length?new Date(Math.min(...dated.map(x=>+x.start))):new Date();
  const maxDate=dated.length?new Date(Math.max(...dated.map(x=>+x.end))):new Date(+minDate+30*86400000);
  const chartStart=new Date(minDate.getFullYear(),minDate.getMonth(),1),chartEnd=new Date(maxDate.getFullYear(),maxDate.getMonth()+1,1),span=Math.max(1,+chartEnd-+chartStart);
  const mapped=dated.length,unmapped=lanes.length-mapped,pressure=lanes.filter(x=>x.delayed+x.risk>0).length,totalExceptions=lanes.reduce((a,x)=>a+x.delayed+x.risk,0);
  const horizon=chartStart.toLocaleString('en-US',{month:'short',year:'2-digit'})+' – '+chartEnd.toLocaleString('en-US',{month:'short',year:'2-digit'});
  [['TIMELINE HORIZON',horizon,C.blue,C.paleBlue],['STREAMS MAPPED',mapped+' / '+lanes.length,C.green,C.paleGreen],['PRESSURE STREAMS',String(pressure),C.red,C.paleRed],['EXCEPTIONS',String(totalExceptions),C.amber,C.paleAmber]].forEach((z,i)=>{let x=.68+i*3.05;sl.addShape(pptx.ShapeType.roundRect,{x,y:1.24,w:2.82,h:.7,rectRadius:.05,fill:{color:z[3]},line:{color:z[3]}});sl.addText(z[0],{x:x+.16,y:1.36,w:2.45,h:.12,fontSize:5.7,bold:true,color:C.muted,margin:0});sl.addText(z[1],{x:x+.16,y:1.55,w:2.45,h:.2,fontSize:10.2,bold:true,color:z[2],fit:'shrink',margin:0})});

  const frameX=.68,frameY=2.08,frameW=11.98,frameH=4.45,labelX=.84,phaseX=2.76,chartX=3.36,chartW=7.85,statusX=11.32,statusW=1.12;
  sl.addShape(pptx.ShapeType.roundRect,{x:frameX,y:frameY,w:frameW,h:frameH,rectRadius:.045,fill:{color:C.white},line:{color:C.line}});
  sl.addShape(pptx.ShapeType.rect,{x:frameX,y:frameY,w:frameW,h:.46,fill:{color:'F4F7FA'},line:{color:'F4F7FA'}});
  sl.addText('WORKSTREAM',{x:labelX,y:frameY+.16,w:1.7,h:.12,fontSize:5.8,bold:true,color:C.muted,margin:0});
  sl.addText('PHASE',{x:phaseX,y:frameY+.16,w:.42,h:.12,fontSize:5.2,bold:true,color:C.muted,align:'center',margin:0});
  sl.addText('INTEGRATED DELIVERY TIMELINE',{x:chartX,y:frameY+.16,w:3,h:.12,fontSize:5.8,bold:true,color:C.muted,margin:0});
  sl.addText('STATUS / PRESSURE',{x:statusX,y:frameY+.16,w:1.05,h:.12,fontSize:5.2,bold:true,color:C.muted,align:'center',margin:0});

  const gridY=frameY+.46,gridH=3.86,rowH=gridH/lanes.length;
  const timelineMonths=[];let md=new Date(chartStart);while(md<=chartEnd&&timelineMonths.length<14){timelineMonths.push(new Date(md));md.setMonth(md.getMonth()+1)}
  timelineMonths.forEach((d,i)=>{let x=chartX+chartW*((+d-+chartStart)/span);if(i<timelineMonths.length-1)sl.addShape(pptx.ShapeType.rect,{x,y:gridY,w:.008,h:gridH,fill:{color:'DCE5EE'},line:{color:'DCE5EE'}});sl.addText(d.toLocaleString('en-US',{month:'short'}),{x:x-.18,y:frameY+.16,w:.55,h:.12,fontSize:5.5,bold:true,color:C.muted,align:'center',margin:0})});

  lanes.forEach((d,i)=>{
    let y=gridY+i*rowH;if(i%2===1)sl.addShape(pptx.ShapeType.rect,{x:frameX+.01,y,w:frameW-.02,h:rowH,fill:{color:'FAFBFC'},line:{color:'FAFBFC'}});
    sl.addShape(pptx.ShapeType.rect,{x:frameX+.01,y:y+rowH-.006,w:frameW-.02,h:.006,fill:{color:'E8EEF3'},line:{color:'E8EEF3'}});
    const ph=streamPhase[d.stream]||'CONTROL';
    sl.addShape(pptx.ShapeType.roundRect,{x:phaseX+.03,y:y+rowH*.23,w:.36,h:rowH*.54,rectRadius:.03,fill:{color:phaseColor[ph]||C.blue},line:{color:phaseColor[ph]||C.blue}});
    sl.addText(d.stream,{x:labelX,y:y+rowH*.24,w:1.82,h:rowH*.42,fontSize:6.25,bold:true,color:C.ink,fit:'shrink',margin:0});
    const hasDate=d.start&&d.end&&isFinite(+d.start)&&isFinite(+d.end);
    if(hasDate){
      let x1=chartX+chartW*Math.max(0,Math.min(1,(+d.start-+chartStart)/span)),x2=chartX+chartW*Math.max(0,Math.min(1,(+d.end-+chartStart)/span)),barW=Math.max(.08,x2-x1),exceptions=d.delayed+d.risk,col=d.delayed?C.red:d.risk?C.amber:C.blue;
      sl.addShape(pptx.ShapeType.roundRect,{x:x1,y:y+rowH*.22,w:barW,h:rowH*.56,rectRadius:.025,fill:{color:col},line:{color:col}});
      sl.addShape(pptx.ShapeType.ellipse,{x:x1+barW-.055,y:y+rowH*.18,w:.075,h:rowH*.64,fill:{color:C.white,transparency:12},line:{color:C.white,transparency:25}});
      sl.addText(exceptions>0?exceptions+' ex.':'CONTROLLED',{x:statusX,y:y+rowH*.22,w:statusW,h:rowH*.45,fontSize:exceptions>0?5.5:4.8,bold:true,color:exceptions>0?col:C.blue,align:'center',margin:0});
    }else{
      sl.addText('DATE GAP',{x:chartX+.08,y:y+rowH*.25,w:.62,h:rowH*.4,fontSize:5.1,bold:true,color:C.muted,margin:0});
      sl.addText('MAP MPP',{x:statusX,y:y+rowH*.22,w:statusW,h:rowH*.45,fontSize:4.8,bold:true,color:C.muted,align:'center',margin:0});
    }
  });

  const todayMarker=new Date();if(+todayMarker>=+chartStart&&+todayMarker<=+chartEnd){let tx=chartX+chartW*((+todayMarker-+chartStart)/span);sl.addShape(pptx.ShapeType.rect,{x:tx,y:gridY-.02,w:.012,h:gridH+.04,fill:{color:'5D7F5D'},line:{color:'5D7F5D'}});sl.addText('TODAY',{x:tx-.19,y:frameY+.04,w:.4,h:.1,fontSize:4.7,bold:true,color:'5D7F5D',align:'center',margin:0})}

  const hot=lanes.filter(x=>x.delayed+x.risk>0).sort((a,b)=>(b.delayed+b.risk)-(a.delayed+a.risk)).slice(0,3);
  const focus=hot.length?'Management focus: '+hot.map(x=>x.stream+' ('+(x.delayed+x.risk)+' exception)').join(' · ')+'. Prioritise recovery of these streams while protecting downstream SIT, UAT, deployment and go-live dependencies.':'Management focus: no stream-level exception concentration was detected. Protect downstream testing, deployment and go-live commitments through dependency-based control.';
  sl.addShape(pptx.ShapeType.roundRect,{x:.68,y:6.67,w:11.98,h:.42,rectRadius:.04,fill:{color:'EEF4F8'},line:{color:'D7E3EC'}});
  sl.addText(focus+(unmapped?'  '+unmapped+' stream(s) still require MPP date mapping.':''),{x:.9,y:6.81,w:11.5,h:.13,fontSize:6.1,bold:true,color:C.navy,fit:'shrink',margin:0});

  // 8 Need Attention
  sl=pptx.addSlide();bg(sl);title(sl,'08. Need Attention — PMO Action Summary','Additional executive exception detail sourced from the Need Attention worksheet.');let nr=topNeed();sl.addText('Task',{x:.75,y:1.42,w:3.55,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Stream',{x:4.42,y:1.42,w:1.1,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Attention Type',{x:5.62,y:1.42,w:1.25,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Priority',{x:6.95,y:1.42,w:.8,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Proposed End',{x:7.82,y:1.42,w:1.0,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('PMO Recommendation',{x:8.95,y:1.42,w:3.15,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});if(!nr.length)sl.addText('No Need Attention detail was detected in the uploaded workbook.',{x:.85,y:2.0,w:8,h:.4,fontSize:12,color:C.muted,margin:0});nr.forEach((r,i)=>{let y=1.78+i*.48,fill=i%2?C.white:'F2F6F9',task=r['Task Requiring Attention']||r['Task']||'',pri=String(r['Priority']||'');sl.addShape(pptx.ShapeType.rect,{x:.7,y,w:11.9,h:.43,fill:{color:fill},line:{color:fill}});sl.addText(String(task),{x:.82,y:y+.08,w:3.45,h:.18,fontSize:7.0,color:C.ink,bold:true,fit:'shrink',margin:0});sl.addText(String(r['Stream']||''),{x:4.42,y:y+.08,w:1.1,h:.18,fontSize:6.4,color:C.ink,fit:'shrink',margin:0});sl.addText(String(r['Attention Type']||''),{x:5.62,y:y+.08,w:1.25,h:.18,fontSize:6.4,color:C.ink,fit:'shrink',margin:0});sl.addText(pri,{x:6.95,y:y+.08,w:.8,h:.18,fontSize:6.4,color:/critical/i.test(pri)?C.red:C.amber,bold:true,fit:'shrink',margin:0});sl.addText(String(r['Proposed End']||''),{x:7.82,y:y+.08,w:1.0,h:.18,fontSize:6.4,color:C.ink,fit:'shrink',margin:0});sl.addText(String(r['PMO Recommendation']||''),{x:8.95,y:y+.06,w:3.15,h:.22,fontSize:6.0,color:C.ink,fit:'shrink',margin:0})});sl.addText('Source of truth for executive health: '+(wi.pivotSheet||'Task Pivot')+'  |  Exception detail: '+(wi.needSheet||'Need Attention'),{x:.85,y:6.65,w:11.5,h:.2,fontSize:7.5,color:C.muted,margin:0});
  return pptx.writeFile({fileName:'ProjectMind_Executive_PMO_Report_'+p.name.replace(/[^a-z0-9]+/gi,'_')+'.pptx'});
}
const exportPptBtn=document.getElementById('exportPpt');
exportPptBtn.onclick=()=>{
  const old=exportPptBtn.textContent;
  try{
    if(!window.PptxGenJS){alert('PPT engine is still loading. Please wait a moment and try again.');return;}
    exportPptBtn.disabled=true;exportPptBtn.textContent='Preparing Executive PPT...';
    const result=exportExecutivePpt();
    Promise.resolve(result).then(()=>{exportPptBtn.textContent='Executive PPT Downloaded';setTimeout(()=>{exportPptBtn.textContent=old;exportPptBtn.disabled=false;},1800);}).catch(e=>{console.error('Executive PPT export failed',e);alert('Executive PPT export failed: '+(e&&e.message?e.message:'Unknown error'));exportPptBtn.textContent=old;exportPptBtn.disabled=false;});
  }catch(e){console.error('Executive PPT export failed',e);alert('Executive PPT export failed: '+(e&&e.message?e.message:'Unknown error'));exportPptBtn.textContent=old;exportPptBtn.disabled=false;}
};
document.getElementById('askAI').onclick=async()=>{let q=document.getElementById('question').value||'Provide a concise PMO recovery assessment and escalation priorities.',ans=document.getElementById('aiAnswer');ans.value='Analysing project data...';try{let r=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,tasks:project().tasks,changes:changes()})}),d=await r.json();ans.value=d.report||'No analysis returned.';document.getElementById('mode').textContent=d.mode==='ai'?'● AI Advisor Connected':'● Local Intelligence Active'}catch(e){ans.value='Unable to reach the analysis service. Local PMO workflow remains available.'}};
const chatHistory=[];
let pendingAgentActions=[];
function addChat(role,text){const el=document.createElement('div');el.className='msg '+role;el.textContent=text;document.getElementById('chatMsgs').appendChild(el);el.scrollIntoView({block:'end'});}
function projectChatContext(){const p=project();return {project:p.name,tasks:p.tasks,changes:changes(),needAttention:(p.tasks||[]).filter(t=>/delay|overdue|risk|blocked/i.test(String(t.status||''))).slice(0,25),capabilities:['analyse_health','prioritise_actions','create_recovery_plan','draft_escalation','update_task_status','update_task_priority','create_need_attention']}}
function applyAgentActions(actions){
  if(!Array.isArray(actions)||!actions.length)return '';
  let p=project(),changed=[];
  actions.forEach(a=>{if(!a||!a.type)return;
    if(a.type==='update_task'){
      let t=(p.tasks||[]).find(x=>String(x.task).toLowerCase()===String(a.task||'').toLowerCase());
      if(t){['status','priority','pic','eta','action','dependency','impact','issue'].forEach(k=>{if(a[k]!==undefined&&a[k]!==null&&String(a[k]).trim()!=='')t[k]=String(a[k])});changed.push('updated '+t.task)}
    }
    if(a.type==='create_need_attention'){
      let name=String(a.task||'').trim();if(name&&!p.tasks.some(t=>String(t.task).toLowerCase()===name.toLowerCase())){p.tasks.push({task:name,status:a.status||'At Risk',stream:a.stream||'General',pic:a.pic||'TBC',eta:a.eta||'TBC',priority:a.priority||'High',dependency:a.dependency||'',action:a.action||'',impact:a.impact||'',issue:a.issue||''});changed.push('created '+name)}
    }
  });
  if(changed.length){save();render();return changed.join(', ')}return '';
}
async function sendAgentMessage(forced){
  const input=document.getElementById('chatInput'),message=(forced||input.value).trim();if(!message)return;
  input.value='';addChat('user',message);chatHistory.push({role:'user',content:message});
  const thinking='ProjectMind Agent is analysing...';addChat('agent',thinking);const msgs=document.getElementById('chatMsgs');
  try{
    const r=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({message,history:chatHistory.slice(-12),context:projectChatContext()})});
    const d=await r.json();msgs.lastChild.remove();addChat('agent',d.reply||d.report||'I could not generate a response.');
    pendingAgentActions=Array.isArray(d.actions)?d.actions:[];
    if(pendingAgentActions.length){const b=document.createElement('button');b.className='btn primary';b.textContent='Apply '+pendingAgentActions.length+' proposed action(s)';b.style.margin='0 14px 10px';b.onclick=()=>{const summary=applyAgentActions(pendingAgentActions);pendingAgentActions=[];b.remove();addChat('agent',summary?'Actions applied: '+summary:'No action was applied.');};msgs.appendChild(b)}
    chatHistory.push({role:'assistant',content:d.reply||d.report||''});document.getElementById('mode').textContent=d.mode==='ai'?'● AI Agent Connected':'● Local Intelligence Active';
  }catch(e){msgs.lastChild.remove();addChat('agent','Connection to the AI Agent is unavailable. Please try again.');}
}
if(document.getElementById('chatFab'))document.getElementById('chatFab').onclick=()=>{document.getElementById('chatbox').classList.add('open');if(!chatHistory.length)addChat('agent','Hi, I am your ProjectMind Agent. Ask me anything about your project in Bahasa Indonesia or English. I can analyse delays, risks, priorities, recovery actions and management escalation based on the dashboard data.')};
if(document.getElementById('chatClose'))document.getElementById('chatClose').onclick=()=>document.getElementById('chatbox').classList.remove('open');
if(document.getElementById('chatSend'))document.getElementById('chatSend').onclick=()=>sendAgentMessage();
if(document.getElementById('chatInput'))document.getElementById('chatInput').addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();sendAgentMessage()}});
document.querySelectorAll('.quick button').forEach(b=>b.onclick=()=>sendAgentMessage(b.dataset.q));
render();
</script></body></html>`;

function fallbackReport(tasks,changes,question){const bad=tasks.filter(t=>/delay|overdue|late|blocked/i.test(t.status)),risk=tasks.filter(t=>/risk/i.test(t.status)),det=changes.filter(c=>c.type==='DETERIORATED');return 'PMO ANALYSIS\n\nQuestion: '+question+'\n\nCurrent position: '+bad.length+' delayed/overdue and '+risk.length+' at-risk item(s) out of '+tasks.length+' tracked task(s). '+changes.length+' reporting-cycle movement(s) detected, including '+det.length+' deterioration(s).\n\nPriority actions:\n1. Confirm root cause, corrective action, PIC and recovery ETA for each delayed item.\n2. Validate dependencies before accepting revised commitments.\n3. Escalate deterioration affecting milestones, SIT/UAT or delivery commitments.\n4. Close TBC ownership and ETA gaps.\n5. Reflect final agreed solutions in all related solution documents before the next gate.'}

function localAgentReply(message,context){
  const q=String(message||'').toLowerCase();
  const tasks=Array.isArray(context?.tasks)?context.tasks:[];
  const status=t=>String(t.status||'');
  const delayed=tasks.filter(t=>/delay|overdue|late|blocked/i.test(status(t)));
  const risk=tasks.filter(t=>/risk/i.test(status(t)));
  const completed=tasks.filter(t=>/complete|done|closed/i.test(status(t)));
  const streamCount=arr=>{const m={};arr.forEach(t=>{const s=String(t.stream||'Unassigned');m[s]=(m[s]||0)+1});return Object.entries(m).sort((a,b)=>b[1]-a[1])};
  const taskLine=(t,i)=>{const eta=t.eta?' | ETA: '+t.eta:'';const pic=t.pic?' | PIC: '+t.pic:'';const issue=t.issue?' | Issue: '+t.issue:'';const dep=t.dependency?' | Dependency: '+t.dependency:'';return (i+1)+'. '+(t.task||'Unnamed task')+' — '+(t.stream||'General')+eta+pic+issue+dep};
  const health=()=>{const total=tasks.length,pct=total?Math.round(completed.length/total*100):0;return 'Executive health snapshot for '+(context?.project||'this project')+':\n• Total tracked: '+total+'\n• Completed: '+completed.length+' ('+pct+'%)\n• Delayed / Overdue / Blocked: '+delayed.length+'\n• At Risk: '+risk.length+'\n\nPMO view: '+(delayed.length||risk.length?'delivery pressure requires active recovery and dependency control.':'no material delivery pressure is currently detected from task status data.')};
  if(!tasks.length)return 'Saya bisa bantu, tetapi belum ada task yang tersedia di project context. Upload/import tracker terlebih dahulu agar analisa bisa berbasis data.';
  if(/apa.*(delay|terlambat)|yang.*(delay|terlambat)|list.*delay|delayed|overdue|terlambat/.test(q)){
    if(!delayed.length)return 'Tidak ada task dengan status Delayed, Overdue, Late, atau Blocked pada data yang sedang aktif.';
    return 'Berikut task yang saat ini membutuhkan recovery attention ('+delayed.length+'):\n\n'+delayed.map(taskLine).join('\n')+'\n\nPMO recommendation: untuk setiap item di atas, kunci root cause, PIC, recovery ETA, dependency, dan impact sebelum commitment berikutnya diterima.';
  }
  if(/recovery|recover|rencana.*pulih|pemulihan/.test(q)){
    const focus=delayed.slice(0,12);
    if(!focus.length)return 'Tidak ada delayed item yang terdeteksi untuk dibuatkan recovery plan. Fokus berikutnya adalah menjaga forward workload dan dependency control.';
    return 'Recovery plan — '+(context?.project||'Project')+':\n\n'+focus.map((t,i)=>{const action=t.action||'Confirm root cause and define a measurable recovery action';const eta=t.eta||'TBC';return (i+1)+'. '+(t.task||'Unnamed task')+' ('+(t.stream||'General')+')\n   Action: '+action+'\n   Recovery control: confirm PIC, dependency and revised ETA (current ETA: '+eta+').'}).join('\n\n')+'\n\nGovernance: review daily for critical items and escalate any recovery date that threatens an integrated milestone.';
  }
  if(/prioritas|priority|hari ini|today|fokus/.test(q)){
    const candidates=[...delayed,...risk].sort((a,b)=>String(b.priority||'').localeCompare(String(a.priority||''))).slice(0,10);
    if(!candidates.length)return 'Prioritas hari ini: protect forward commitments, validate upcoming dependencies, and keep completed work from reopening.';
    return 'Prioritas PMO saat ini:\n\n'+candidates.map(taskLine).join('\n')+'\n\nUrutan tindakan: 1) unblock delayed work, 2) lock owner and ETA, 3) validate cross-stream dependency, 4) escalate milestone impact.';
  }
  if(/escalat|management|management.*perlu|eksekutif/.test(q)){
    const top=[...delayed,...risk].slice(0,8);
    return 'Management escalation draft:\n\nCurrent exposure: '+delayed.length+' delayed/overdue/blocked and '+risk.length+' at-risk item(s) from '+tasks.length+' tracked activities.\n\nDecision required:\n'+(top.length?top.map((t,i)=>(i+1)+'. '+(t.task||'Unnamed task')+' — '+(t.stream||'General')+'; owner '+(t.pic||'TBC')+', ETA '+(t.eta||'TBC')+'.').join('\n'):'No critical item currently identified.')+'\n\nPMO ask: confirm accountable owner, recovery commitment, dependency decision and escalation support where the recovery path cannot be controlled within the stream.';
  }
  if(/stream|workstream/.test(q)){
    const rows=streamCount([...delayed,...risk]);
    return 'Pressure by stream:\n\n'+(rows.length?rows.map((x,i)=>(i+1)+'. '+x[0]+': '+x[1]+' delayed/at-risk item(s)').join('\n'):'No delayed or at-risk stream pressure detected.')+'\n\nUse this as the basis for stream-level governance and recovery sequencing.';
  }
  if(/health|kondisi|status|project.*saya|project.*ini/.test(q))return health();
  return health()+'\n\nUntuk pertanyaan ini: “'+String(message||'')+'”, saya bisa langsung bantu dengan data dashboard. Coba tanyakan secara spesifik, misalnya: “apa saja yang delay”, “buat recovery plan”, “prioritas hari ini”, “stream mana paling berisiko”, atau “apa yang perlu diescalate ke management”.';
}
export default {async fetch(request,env){const url=new URL(request.url);if(url.pathname==='/health')return Response.json({status:'online',service:'ProjectMind AI Ultimate',version:'5.0'});if(url.pathname==='/api/chat'&&request.method==='POST'){
  const body=await request.json(),message=String(body.message||''),history=Array.isArray(body.history)?body.history.slice(-12):[],context=body.context||{};
  const local=localAgentReply(message,context);
  if(!env.OPENAI_API_KEY)return Response.json({reply:local,actions:[],mode:'local'});
  try{
    const system='You are ProjectMind Agent, a senior global PMO, transformation and delivery advisor embedded in ProjectMind AI. Understand natural language in any wording, especially Indonesian and English. Use supplied dashboard context as the source of truth for project-specific facts and never invent project data. You can recommend or propose actions. Return STRICT JSON only with this schema: {"reply":"concise conversational answer","actions":[{"type":"update_task","task":"exact task name","status":"","priority":"","pic":"","eta":"","action":"","dependency":"","impact":"","issue":""},{"type":"create_need_attention","task":"","stream":"","status":"At Risk","priority":"High","pic":"","eta":"","action":"","dependency":"","impact":"","issue":""}]}. Actions are OPTIONAL and must only be proposed when the user explicitly asks to change/create/update something or clearly requests execution. Never claim an action has been applied; the UI requires user confirmation.';
    const messages=[{role:'system',content:system},{role:'system',content:'CURRENT PROJECT CONTEXT:\n'+JSON.stringify(context)},...history.filter(x=>x&&x.content).map(x=>({role:x.role==='assistant'?'assistant':'user',content:String(x.content)}))];
    const res=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:'Bearer '+env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model:env.OPENAI_MODEL||'gpt-4.1-mini',messages,temperature:.2,response_format:{type:'json_object'}})});
    const data=await res.json(),raw=data.choices?.[0]?.message?.content;
    let parsed;try{parsed=JSON.parse(raw)}catch(e){parsed={reply:raw||local,actions:[]}}
    return res.ok&&parsed.reply?Response.json({reply:parsed.reply,actions:Array.isArray(parsed.actions)?parsed.actions:[],mode:'ai'}):Response.json({reply:local,actions:[],mode:'local'});
  }catch(e){return Response.json({reply:local,mode:'local'})}
}
if(url.pathname==='/api/analyze'&&request.method==='POST'){const body=await request.json(),tasks=Array.isArray(body.tasks)?body.tasks:[],changes=Array.isArray(body.changes)?body.changes:[],question=String(body.question||'Provide PMO analysis'),local=fallbackReport(tasks,changes,question);if(!env.OPENAI_API_KEY)return Response.json({report:local,mode:'local'});try{const model=env.OPENAI_MODEL||'gpt-4.1-mini',prompt='Question: '+question+'\n\nTracker:\n'+JSON.stringify(tasks)+'\n\nChanges:\n'+JSON.stringify(changes),res=await fetch('https://api.openai.com/v1/chat/completions',{method:'POST',headers:{Authorization:'Bearer '+env.OPENAI_API_KEY,'Content-Type':'application/json'},body:JSON.stringify({model,messages:[{role:'system',content:'You are a senior global PMO and recovery manager. Give concise, decision-oriented analysis grounded only in supplied tracker data. Do not invent facts.'},{role:'user',content:prompt}],temperature:.2})}),data=await res.json();return res.ok?Response.json({report:data.choices?.[0]?.message?.content||local,mode:'ai'}):Response.json({report:local,mode:'local'})}catch(e){return Response.json({report:local,mode:'local'})}}return new Response(html,{headers:{'content-type':'text/html;charset=UTF-8','cache-control':'no-store'}})}};