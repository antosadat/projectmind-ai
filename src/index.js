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
  function bg(sl){sl.background={color:C.bg};sl.addShape(pptx.ShapeType.rect,{x:0,y:0,w:W,h:.12,fill:{color:C.blue},line:{color:C.blue}});sl.addText('PROJECTMIND AI  |  EXECUTIVE PMO REPORT',{x:.6,y:7.08,w:5.6,h:.2,fontSize:6.5,color:C.muted,bold:true,margin:0});sl.addText(new Date().toLocaleDateString('en-GB',{day:'2-digit',month:'short',year:'numeric'}),{x:11.4,y:7.05,w:1.3,h:.22,fontSize:6.5,color:C.muted,align:'right',margin:0})}
  function title(sl,t,st){sl.addText(t,{x:.65,y:.42,w:9.4,h:.42,fontFace:'Aptos Display',fontSize:24,bold:true,color:C.navy,margin:0});if(st)sl.addText(st,{x:.68,y:.94,w:11.7,h:.28,fontSize:9,color:C.muted,margin:0})}
  function chip(sl,x,y,w,label,value,color,pale){sl.addShape(pptx.ShapeType.roundRect,{x,y,w,h:1.12,rectRadius:.08,fill:{color:pale},line:{color:pale}});sl.addText(String(label).toUpperCase(),{x:x+.18,y:y+.16,w:w-.36,h:.18,fontSize:7,color:C.muted,bold:true,margin:0});sl.addText(String(value),{x:x+.18,y:y+.43,w:w-.36,h:.45,fontSize:24,color,bold:true,margin:0})}
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
      return raw;
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

  // 1 Cover
  let sl=pptx.addSlide();sl.background={color:C.white};sl.addShape(pptx.ShapeType.rect,{x:0,y:0,w:W,h:H,fill:{color:C.bg},line:{color:C.bg}});sl.addShape(pptx.ShapeType.rect,{x:0,y:0,w:4.55,h:H,fill:{color:C.navy},line:{color:C.navy}});sl.addText('ProjectMind AI',{x:.65,y:.8,w:3.1,h:.3,fontSize:10,color:'B9D7EB',bold:true,margin:0});sl.addText('PROJECT DELIVERY - HEALTH CHECK',{x:.7,y:1.35,w:8.8,h:.45,fontFace:'Aptos Display',fontSize:27,bold:true,color:C.navy,margin:0});sl.addText('Status Overview • Risk Concentration • Recovery Focus',{x:.7,y:1.95,w:8.5,h:.3,fontSize:11,color:C.muted,margin:0});sl.addText(p.name,{x:.7,y:2.65,w:7.4,h:.38,fontSize:15,color:C.blue,bold:true,margin:0});[['TOTAL ACTIVITIES',total,C.blue,C.paleBlue],['COMPLETED',completed,C.green,C.paleGreen],['DELAYED',delayed,C.red,C.paleRed],['AT RISK',risk,C.amber,C.paleAmber]].forEach((z,i)=>chip(sl,.7+i*3.05,4.35,2.72,z[0],z[1],z[2],z[3]));sl.addText('Executive PMO Presentation',{x:.7,y:6.55,w:4,h:.25,fontSize:9,color:C.muted,margin:0});

  // 2 Executive Snapshot
  sl=pptx.addSlide();bg(sl);title(sl,'01. Executive Snapshot','The portfolio is progressing, but delivery pressure is concentrated in a limited number of streams.');[['COMPLETED',completed,pct(completed),C.green,C.paleGreen],['DELAYED',delayed,pct(delayed),C.red,C.paleRed],['ON TRACK',ontrack,pct(ontrack),C.blue,C.paleBlue],['AT RISK',risk,pct(risk),C.amber,C.paleAmber]].forEach((z,i)=>{let x=.75+i*3.08;sl.addShape(pptx.ShapeType.roundRect,{x,y:1.45,w:2.75,h:1.55,rectRadius:.06,fill:{color:z[4]},line:{color:z[4]}});sl.addText(z[0],{x:x+.22,y:1.72,w:2.25,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText(z[1]+' / '+total+'  •  '+z[2]+'%',{x:x+.22,y:2.13,w:2.3,h:.35,fontSize:17,bold:true,color:z[3],margin:0})});sl.addShape(pptx.ShapeType.roundRect,{x:.75,y:3.45,w:11.8,h:2.45,rectRadius:.06,fill:{color:C.white},line:{color:C.line}});sl.addText('Highlight',{x:1.05,y:3.8,w:1.5,h:.25,fontSize:13,bold:true,color:C.navy,margin:0});const h=[pct(completed)+'% of activities are completed, indicating meaningful execution progress.',exception+' activities remain in an exception state (Delayed + At Risk).','The key challenge is delay concentration rather than portfolio-wide deterioration.'];h.forEach((v,i)=>{sl.addShape(pptx.ShapeType.ellipse,{x:1.05,y:4.28+i*.43,w:.1,h:.1,fill:{color:i===1?C.red:C.blue},line:{color:i===1?C.red:C.blue}});sl.addText(v,{x:1.28,y:4.2+i*.43,w:9.8,h:.3,fontSize:10,color:C.ink,margin:0})});sl.addText('Key message: Focus recovery effort where delay concentration and downstream dependency are highest.',{x:1.05,y:5.45,w:10.9,h:.3,fontSize:11,bold:true,color:C.navy,margin:0});

  // 3 Portfolio Health Distribution
  sl=pptx.addSlide();bg(sl);title(sl,'02. Portfolio Health Distribution','Current activity status across the full project portfolio.');const dist=[['Completed',completed,C.green],['Delayed',delayed,C.red],['On Track',ontrack,C.blue],['At Risk',risk,C.amber]],mx=Math.max(1,...dist.map(x=>x[1]));dist.forEach((d,i)=>{let y=1.55+i*.72,w=5.7*d[1]/mx;sl.addText(d[0],{x:.85,y:y+.08,w:1.5,h:.2,fontSize:10,bold:true,color:C.ink,margin:0});sl.addShape(pptx.ShapeType.roundRect,{x:2.35,y,w,h:.36,rectRadius:.04,fill:{color:d[2]},line:{color:d[2]}});sl.addText(String(d[1]),{x:2.45+w,y:y+.07,w:.6,h:.2,fontSize:9,bold:true,color:C.ink,margin:0})});sl.addShape(pptx.ShapeType.roundRect,{x:8.45,y:1.5,w:3.9,h:3.65,rectRadius:.06,fill:{color:C.white},line:{color:C.line}});sl.addText('What the numbers tell us',{x:8.75,y:1.85,w:3.2,h:.25,fontSize:13,bold:true,color:C.navy,margin:0});[['Completed',pct(completed)+'% are completed, indicating execution progress.',C.green],['Delayed',pct(delayed)+'% are delayed and form the immediate recovery backlog.',C.red],['At Risk',pct(risk)+'% are at risk and should be prevented from converting into delays.',C.amber],['On Track',pct(ontrack)+'% remain on track and require dependency protection.',C.blue]].forEach((z,i)=>{sl.addText('• '+z[1],{x:8.75,y:2.35+i*.62,w:3.0,h:.45,fontSize:8.5,color:C.ink,fit:'shrink',margin:0})});sl.addShape(pptx.ShapeType.roundRect,{x:.85,y:5.65,w:11.5,h:.75,rectRadius:.05,fill:{color:C.paleRed},line:{color:C.paleRed}});sl.addText('EXCEPTION BACKLOG   '+delayed+' Delayed + '+risk+' At Risk = '+exception+' items',{x:1.15,y:5.91,w:10.8,h:.25,fontSize:14,bold:true,color:C.red,margin:0});

  // 4 Delay concentration
  sl=pptx.addSlide();bg(sl);title(sl,'03. Delay Concentration by Stream','The delay is not evenly distributed — a limited number of streams dominate the recovery challenge.');let top=streams.slice(0,2);top.forEach((d,i)=>{let x=.85+i*5.95;sl.addShape(pptx.ShapeType.roundRect,{x,y:1.55,w:5.4,h:1.25,rectRadius:.06,fill:{color:i?C.paleAmber:C.paleRed},line:{color:i?C.paleAmber:C.paleRed}});sl.addText(d.stream.toUpperCase(),{x:x+.28,y:1.84,w:4.75,h:.2,fontSize:10,bold:true,color:C.navy,fit:'shrink',margin:0});sl.addText(d.delayed+' delayed / '+d.total+' total',{x:x+.28,y:2.2,w:4.6,h:.3,fontSize:18,bold:true,color:i?C.amber:C.red,margin:0})});let smx=Math.max(1,...streams.slice(0,8).map(x=>x.delayed));streams.slice(0,8).forEach((d,i)=>{let y=3.25+i*.37,w=6.2*d.delayed/smx;sl.addText(d.stream,{x:.85,y:y+.04,w:2.7,h:.2,fontSize:7.5,color:C.ink,bold:true,fit:'shrink',margin:0});sl.addShape(pptx.ShapeType.roundRect,{x:3.65,y,w,h:.22,rectRadius:.03,fill:{color:C.red},line:{color:C.red}});sl.addText(String(d.delayed),{x:3.75+w,y:y+.02,w:.4,h:.18,fontSize:7,bold:true,color:C.ink,margin:0})});sl.addText('Management implication',{x:9.1,y:3.35,w:2.5,h:.25,fontSize:13,bold:true,color:C.navy,margin:0});sl.addText(top.length?'Prioritize '+top.map(x=>x.stream).join(' and ')+' first, as they account for the highest concentration of delayed commitments.':'Prioritize streams with the highest delay concentration before spreading recovery effort across lower-impact areas.',{x:9.1,y:3.85,w:2.75,h:1.15,fontSize:11,color:C.ink,bold:true,fit:'shrink',margin:0});

  // 5 Monthly Delivery Trend
  sl=pptx.addSlide();bg(sl);title(sl,'04. Monthly Delivery Trend','The current pressure point is concentrated in the highest-volume commitment period, followed by a forward workload that must be protected.');let months=health.months.length?health.months:[],monthly=[];
  if(months.length)monthly=months.map((mo,i)=>({mo,total:['Completed','Delayed','At Risk','On Track'].reduce((a,k)=>a+n((health.matrix[k]||[])[i]),0),delayed:n((health.matrix.Delayed||[])[i]),risk:n((health.matrix['At Risk']||[])[i])}));
  if(!monthly.some(x=>x.total>0)){let order=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],mm={};tasks.forEach(t=>{let d=new Date(t.eta);if(isNaN(d))return;let mo=order[d.getMonth()];mm[mo]=mm[mo]||{mo,total:0,delayed:0,risk:0};mm[mo].total++;if(/delay|overdue/i.test(t.status))mm[mo].delayed++;if(/risk/i.test(t.status))mm[mo].risk++;});monthly=Object.values(mm);if(!monthly.length){months=['Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'];monthly=months.map(mo=>({mo,total:0,delayed:0,risk:0}))}}let peak=monthly.reduce((a,b)=>b.total>a.total?b:a,{mo:'N/A',total:0,delayed:0}),forward=monthly.slice(Math.min(monthly.length,months.indexOf(peak.mo)+1)).reduce((a,b)=>a+b.total,0);chip(sl,.85,1.45,2.55,'Peak Volume',peak.total,C.blue,C.paleBlue);chip(sl,3.65,1.45,2.55,peak.mo+' Delay',peak.delayed,C.red,C.paleRed);chip(sl,6.45,1.45,2.55,'Forward Workload',forward,C.amber,C.paleAmber);sl.addShape(pptx.ShapeType.roundRect,{x:.85,y:2.95,w:11.55,h:2.7,rectRadius:.06,fill:{color:C.white},line:{color:C.line}});let mm=Math.max(1,...monthly.map(x=>x.total));monthly.forEach((d,i)=>{let x=1.2+i*1.25,h=1.75*d.total/mm,y=5.1-h;sl.addShape(pptx.ShapeType.rect,{x,y,w:.62,h,fill:{color:C.blue},line:{color:C.blue}});let dh=h*(d.delayed/Math.max(1,d.total));if(dh)sl.addShape(pptx.ShapeType.rect,{x,y,w:.62,h:dh,fill:{color:C.red},line:{color:C.red}});sl.addText(d.mo,{x:x-.18,y:5.28,w:.98,h:.2,fontSize:7,color:C.muted,align:'center',margin:0});sl.addText(String(d.total),{x,y:y-.23,w:.62,h:.18,fontSize:7,bold:true,color:C.ink,align:'center',margin:0})});sl.addText('Storyline: '+peak.mo+' is the current pressure point. Recover delayed work while protecting the downstream execution pipeline.',{x:.95,y:6.05,w:11.2,h:.3,fontSize:10.5,bold:true,color:C.navy,align:'center',margin:0});

  // 5 Integrated Timeline by Stream — MPP
  sl=pptx.addSlide();bg(sl);title(sl,'05. Integrated Timeline — MPP by Stream','End-to-end delivery path across all detected streams. Red/amber bars indicate schedule pressure; blue bars indicate controlled execution.');
  const canonicalStreams=['Connectivity Lower','Connectivity Prod','CRP','Data Migration','Deployment','Development','DR','GNG Decission','Go Live','Hypercare','Infra','Performance Test','Requirement Gathering','Security Test','Solution','Training','Production Connectivity','User Training Plan','Requirement Analysis','SIT','UAT','Testing Plan'];
  let shown=timeline.slice();
  if(!shown.length){
    const today=new Date();
    shown=canonicalStreams.map((stream,i)=>({stream,start:new Date(today.getFullYear(),today.getMonth()+Math.floor(i/3),1),end:new Date(today.getFullYear(),today.getMonth()+Math.floor(i/3)+1,1),total:0,delayed:0,risk:0,tasks:[],source:'Placeholder'}));
  }
  const byName=new Map(shown.map(x=>[x.stream,x]));
  canonicalStreams.forEach(name=>{if(!byName.has(name))shown.push({stream:name,start:null,end:null,total:0,delayed:0,risk:0,tasks:[],source:'Not dated'})});
  shown.sort((a,b)=>canonicalStreams.indexOf(a.stream)-canonicalStreams.indexOf(b.stream));
  const dated=shown.filter(x=>x.start&&x.end&&isFinite(+x.start)&&isFinite(+x.end));
  const minDate=dated.length?new Date(Math.min(...dated.map(x=>+x.start))):new Date(),maxDate=dated.length?new Date(Math.max(...dated.map(x=>+x.end))):new Date(+minDate+30*86400000),span=Math.max(1,+maxDate-+minDate);
  const chartX=3.15,chartW=9.0,labelW=2.25,topY=1.75,rowH=.205;
  const monthStarts=[];let cur=new Date(minDate.getFullYear(),minDate.getMonth(),1),last=new Date(maxDate.getFullYear(),maxDate.getMonth()+1,1);
  while(cur<=last&&monthStarts.length<12){monthStarts.push(new Date(cur));cur.setMonth(cur.getMonth()+1)}
  sl.addShape(pptx.ShapeType.roundRect,{x:.72,y:1.42,w:11.92,h:4.95,rectRadius:.04,fill:{color:C.white},line:{color:C.line}});
  monthStarts.forEach(d=>{let x=chartX+chartW*((+d-+minDate)/span);sl.addText(d.toLocaleString('en-US',{month:'short',year:'2-digit'}),{x:x-.28,y:1.5,w:.75,h:.14,fontSize:5.8,color:C.muted,align:'center',margin:0});sl.addShape(pptx.ShapeType.rect,{x,y:1.72,w:.008,h:4.45,fill:{color:C.line,transparency:40},line:{color:C.line,transparency:100}})});
  shown.slice(0,22).forEach((d,i)=>{
    let y=topY+i*rowH,hasDate=d.start&&d.end&&isFinite(+d.start)&&isFinite(+d.end);
    sl.addText(d.stream,{x:.86,y:y+.012,w:labelW,h:.13,fontSize:5.7,bold:true,color:C.ink,fit:'shrink',margin:0});
    if(hasDate){
      let x1=chartX+chartW*((+d.start-+minDate)/span),x2=chartX+chartW*((+d.end-+minDate)/span),w=Math.max(.11,x2-x1),col=d.delayed?C.red:d.risk?C.amber:C.blue;
      sl.addShape(pptx.ShapeType.roundRect,{x:x1,y:y+.015,w,h:.12,rectRadius:.02,fill:{color:col},line:{color:col}});
      if((d.delayed+d.risk)>0)sl.addText((d.delayed+d.risk)+' ex.',{x:12.25,y:y+.015,w:.32,h:.1,fontSize:4.8,bold:true,color:col,margin:0});
    }else{
      sl.addText('Date not mapped',{x:chartX,y:y+.01,w:1.0,h:.12,fontSize:5.2,color:C.muted,margin:0});
    }
  });
  const hot=shown.filter(x=>x.delayed+x.risk>0).sort((a,b)=>(b.delayed+b.risk)-(a.delayed+a.risk)).slice(0,3);
  const undated=shown.filter(x=>!x.start||!x.end).length;
  sl.addShape(pptx.ShapeType.roundRect,{x:.72,y:6.52,w:11.92,h:.36,rectRadius:.04,fill:{color:C.paleBlue},line:{color:C.line}});
  const focus=hot.length?'Pressure focus: '+hot.map(x=>x.stream+' ('+(x.delayed+x.risk)+' exception)').join(' · ')+'. Protect SIT/UAT, deployment and go-live dependencies while recovery is executed.':'Timeline focus: protect downstream testing, deployment and go-live milestones through dependency-based control.';
  sl.addText(focus+(undated?'  '+undated+' stream(s) require MPP date mapping.':''),{x:.92,y:6.63,w:11.35,h:.12,fontSize:6.7,bold:true,color:C.navy,fit:'shrink',margin:0});

  // 6 Recommended Recovery Strategy
  sl=pptx.addSlide();bg(sl);title(sl,'06. Recommended Recovery Strategy','Shift from status reporting to active recovery management.');[['1','Contain','Freeze further slippage. Validate delayed items and confirm true feasibility.'],['2','Prioritize','Focus attention on streams with the highest delay concentration and dependency impact.'],['3','Recover','Define corrective action, accountable owner, committed date and measurable output.'],['4','Protect','Protect downstream testing, integration and deployment milestones from inherited delay.']].forEach((z,i)=>{let x=.75+i*3.05;sl.addShape(pptx.ShapeType.roundRect,{x,y:1.65,w:2.72,h:3.2,rectRadius:.07,fill:{color:C.white},line:{color:C.line}});sl.addShape(pptx.ShapeType.ellipse,{x:x+.22,y:1.95,w:.58,h:.58,fill:{color:C.blue},line:{color:C.blue}});sl.addText(z[0],{x:x+.22,y:2.13,w:.58,h:.18,fontSize:10,bold:true,color:C.white,align:'center',margin:0});sl.addText(z[1],{x:x+.25,y:2.85,w:2.05,h:.3,fontSize:15,bold:true,color:C.navy,margin:0});sl.addText(z[2],{x:x+.25,y:3.48,w:2.1,h:.85,fontSize:9,color:C.muted,fit:'shrink',margin:0})});sl.addText('Control principle: a revised date is not a recovery plan unless corrective action, owner, dependency and measurable outcome are explicit.',{x:.85,y:5.55,w:11.4,h:.4,fontSize:11.5,bold:true,color:C.ink,align:'center',margin:0});

  // 7 Management Focus
  sl=pptx.addSlide();bg(sl);title(sl,'07. Management Focus & Next Decisions','Immediate management attention required to convert recovery intent into delivery control.');[['Immediate','Validate delayed commitments, recovery owners and credible completion dates.',C.red,C.paleRed],['This Week','Close high-impact dependencies and confirm the next recovery control point.',C.amber,C.paleAmber],['Ongoing','Protect on-track work and prevent at-risk items from converting into delays.',C.blue,C.paleBlue]].forEach((z,i)=>{let x=.85+i*4.05;sl.addShape(pptx.ShapeType.roundRect,{x,y:1.7,w:3.65,h:3.2,rectRadius:.07,fill:{color:z[3]},line:{color:z[3]}});sl.addText(z[0].toUpperCase(),{x:x+.3,y:2.05,w:3.0,h:.25,fontSize:10,bold:true,color:z[2],margin:0});sl.addText(z[1],{x:x+.3,y:2.7,w:2.95,h:1.05,fontSize:13,bold:true,color:C.navy,fit:'shrink',margin:0});sl.addText('Management control', {x:x+.3,y:4.25,w:2.9,h:.2,fontSize:8,color:C.muted,margin:0})});sl.addText('Next control point: validate recovery commitments, dependency readiness and unresolved exceptions before the next executive update.',{x:.9,y:5.95,w:11.3,h:.35,fontSize:11,bold:true,color:C.navy,align:'center',margin:0});

  // 8 Need Attention
  sl=pptx.addSlide();bg(sl);title(sl,'08. Need Attention — PMO Action Summary','Additional executive exception detail sourced from the Need Attention worksheet.');let nr=topNeed();sl.addText('Task',{x:.75,y:1.42,w:3.55,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Stream',{x:4.42,y:1.42,w:1.1,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Attention Type',{x:5.62,y:1.42,w:1.25,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Priority',{x:6.95,y:1.42,w:.8,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('Proposed End',{x:7.82,y:1.42,w:1.0,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});sl.addText('PMO Recommendation',{x:8.95,y:1.42,w:3.15,h:.2,fontSize:8,bold:true,color:C.muted,margin:0});if(!nr.length)sl.addText('No Need Attention detail was detected in the uploaded workbook.',{x:.85,y:2.0,w:8,h:.4,fontSize:12,color:C.muted,margin:0});nr.forEach((r,i)=>{let y=1.78+i*.48,fill=i%2?C.white:'F2F6F9',task=r['Task Requiring Attention']||r['Task']||'',pri=String(r['Priority']||'');sl.addShape(pptx.ShapeType.rect,{x:.7,y,w:11.9,h:.43,fill:{color:fill},line:{color:fill}});sl.addText(String(task),{x:.82,y:y+.08,w:3.45,h:.18,fontSize:7.0,color:C.ink,bold:true,fit:'shrink',margin:0});sl.addText(String(r['Stream']||''),{x:4.42,y:y+.08,w:1.1,h:.18,fontSize:6.4,color:C.ink,fit:'shrink',margin:0});sl.addText(String(r['Attention Type']||''),{x:5.62,y:y+.08,w:1.25,h:.18,fontSize:6.4,color:C.ink,fit:'shrink',margin:0});sl.addText(pri,{x:6.95,y:y+.08,w:.8,h:.18,fontSize:6.4,color:/critical/i.test(pri)?C.red:C.amber,bold:true,fit:'shrink',margin:0});sl.addText(String(r['Proposed End']||''),{x:7.82,y:y+.08,w:1.0,h:.18,fontSize:6.4,color:C.ink,fit:'shrink',margin:0});sl.addText(String(r['PMO Recommendation']||''),{x:8.95,y:y+.06,w:3.15,h:.22,fontSize:6.0,color:C.ink,fit:'shrink',margin:0})});sl.addText('Source of truth for executive health: '+(wi.pivotSheet||'Task Pivot')+'  |  Exception detail: '+(wi.needSheet||'Need Attention'),{x:.85,y:6.65,w:11.5,h:.2,fontSize:7.5,color:C.muted,margin:0});
  pptx.writeFile({fileName:'ProjectMind_Executive_PMO_Report_'+p.name.replace(/[^a-z0-9]+/gi,'_')+'.pptx'});
}
document.getElementById('exportPpt').onclick=exportExecutivePpt;
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