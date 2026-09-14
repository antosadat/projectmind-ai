export const kpiOverlay = String.raw`
<style id="pm-kpi-overlay-style">
#kpis.pm-kpi-grid{grid-template-columns:repeat(5,minmax(0,1fr))}
#kpis.pm-kpi-grid .card{min-width:0;cursor:pointer;position:relative;transition:transform .15s,border-color .15s,box-shadow .15s}
#kpis.pm-kpi-grid .card:hover{transform:translateY(-2px);border-color:var(--blue);box-shadow:0 10px 28px rgba(0,0,0,.22)}
#kpis.pm-kpi-grid .card:focus{outline:2px solid var(--blue);outline-offset:2px}
#kpis.pm-kpi-grid .v{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}
#kpis.pm-kpi-grid .pct{font-size:13px;font-weight:600;color:var(--muted)}
#kpis.pm-kpi-grid .kpi-sub{font-size:10px;color:var(--muted);margin-top:3px}
#pm-kpi-detail{position:fixed;inset:0;background:rgba(0,0,0,.68);display:none;align-items:center;justify-content:center;padding:20px;z-index:2100}
#pm-kpi-detail.open{display:flex}
#pm-kpi-detail .box{width:min(1180px,97vw);max-height:88vh;overflow:auto;background:var(--panel);border:1px solid var(--line);border-radius:18px;padding:18px;box-shadow:0 30px 90px rgba(0,0,0,.55)}
#pm-kpi-detail .head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}
#pm-kpi-detail .head h2{margin:0;font-size:20px}
#pm-kpi-detail .summary{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px}
#pm-kpi-detail .summary span{padding:5px 9px;border-radius:99px;background:var(--panel2);color:var(--muted);font-size:11px}
#pm-kpi-detail table{width:100%;border-collapse:collapse;font-size:12px}
#pm-kpi-detail th,#pm-kpi-detail td{padding:9px 8px;border-bottom:1px solid var(--line);text-align:left;vertical-align:top}
#pm-kpi-detail th{position:sticky;top:0;background:#102039;color:#a9bdd3;z-index:1}
#pm-kpi-detail .empty{padding:30px;text-align:center;color:var(--muted)}
#pm-kpi-detail .sev{font-weight:700}
#pm-kpi-detail .sev.critical,#pm-kpi-detail .sev.high{color:var(--red)}
#pm-kpi-detail .sev.medium{color:var(--amber)}
#pm-kpi-detail .sev.low{color:var(--blue)}
@media(max-width:1100px){#kpis.pm-kpi-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:700px){#kpis.pm-kpi-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#pm-kpi-detail{padding:10px}#pm-kpi-detail .box{padding:12px}}
</style>
<script>
(function(){
  'use strict';
  const COLORS={total:'blue',delayed:'red',risk:'amber',completed:'green',progress:'blue'};
  const labelMap={total:'TOTAL',delayed:'DELAYED / OVERDUE',risk:'AT RISK',completed:'COMPLETED',progress:'IN PROGRESS'};
  const statusOf=t=>{
    const s=String(t&&t.status||'').trim().toLowerCase();
    if(/complete|completed|done|closed|finish|finished/.test(s)) return 'completed';
    if(/delay|delayed|overdue|late|blocked/.test(s)) return 'delayed';
    if(/risk|at[ -]?risk/.test(s)) return 'risk';
    if(/progress|in[ -]?progress|ongoing|wip|working|execution|development|on[ -]?track/.test(s)) return 'progress';
    const p=Number(String(t&&percentValue(t)||'').replace('%',''));
    if(p>0&&p<100) return 'progress';
    return 'other';
  };
  function percentValue(t){return t&&t.percent!=null?t.percent:t&&t.completion!=null?t.completion:t&&t.progress!=null?t.progress:'';}
  const getTasks=()=>{try{const p=typeof project==='function'?project():null;return p&&Array.isArray(p.tasks)?p.tasks:[]}catch(e){return[]}};
  const pct=(n,total)=>total?((n/total)*100).toFixed(1)+'%':'0.0%';
  const esc=v=>String(v==null?'':v).replace(/[&<>\"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]));
  const field=(t,names)=>{for(const n of names){if(t&&t[n]!=null&&String(t[n]).trim()!=='')return t[n]}return ''};
  const severity=t=>field(t,['severity','Severity','priority','Priority','criticality','Criticality'])||'—';
  const taskName=t=>field(t,['task','Task','activity','Activity','item','Item','taskName','Task Name'])||'—';
  const pic=t=>field(t,['pic','PIC','owner','Owner','responsible','Responsible','assignee','Assignee'])||'—';
  const due=t=>field(t,['eta','ETA','proposedEnd','Proposed End','dueDate','Due Date','endDate','End Date','finishDate','Finish Date','baselineFinish','Baseline Finish'])||'—';
  const stream=t=>field(t,['stream','Stream','workstream','Workstream','phase','Phase'])||'—';
  const rawStatus=t=>field(t,['status','Status','health','Health','rag','RAG'])||'—';
  const dependency=t=>field(t,['dependency','Dependency','blocker','Blocker','dependencies','Dependencies'])||'—';
  function ensureModal(){
    if(document.getElementById('pm-kpi-detail'))return;
    const d=document.createElement('div');d.id='pm-kpi-detail';d.innerHTML='<div class="box"><div class="head"><div><h2 id="pm-kpi-title">Task Details</h2><div id="pm-kpi-sub" class="mini muted"></div></div><button class="btn" id="pm-kpi-close">Close</button></div><div id="pm-kpi-summary" class="summary"></div><div id="pm-kpi-body"></div></div>';
    document.body.appendChild(d);
    document.getElementById('pm-kpi-close').onclick=()=>d.classList.remove('open');
    d.onclick=e=>{if(e.target===d)d.classList.remove('open')};
  }
  function openDetail(key,total){
    ensureModal();
    const ts=getTasks();const filtered=key==='total'?ts:ts.filter(t=>statusOf(t)===key);
    const title=labelMap[key]||'TASK DETAILS';
    document.getElementById('pm-kpi-title').textContent=title+' — Task Details';
    document.getElementById('pm-kpi-sub').textContent=filtered.length+' matching task(s) · '+pct(filtered.length,total)+' of total portfolio';
    document.getElementById('pm-kpi-summary').innerHTML='<span>Tasks: <b>'+filtered.length+'</b></span><span>Portfolio: <b>'+total+'</b></span><span>Click outside or Close to return</span>';
    const body=document.getElementById('pm-kpi-body');
    if(!filtered.length){body.innerHTML='<div class="empty">No task data matches this KPI.</div>';}
    else{
      let html='<div class="tablewrap"><table><thead><tr><th>Task Name</th><th>PIC</th><th>End / Due Date</th><th>Severity</th><th>Status</th><th>Stream</th><th>Dependency / Blocker</th></tr></thead><tbody>';
      filtered.forEach(t=>{const sev=String(severity(t));const sevClass=sev.toLowerCase().replace(/[^a-z]/g,'');html+='<tr><td><b>'+esc(taskName(t))+'</b></td><td>'+esc(pic(t))+'</td><td>'+esc(due(t))+'</td><td><span class="sev '+sevClass+'">'+esc(sev)+'</span></td><td>'+esc(rawStatus(t))+'</td><td>'+esc(stream(t))+'</td><td>'+esc(dependency(t)||'—')+'</td></tr>'});
      html+='</tbody></table></div>';body.innerHTML=html;
    }
    document.getElementById('pm-kpi-detail').classList.add('open');
  }
  function render(){
    const el=document.getElementById('kpis');if(!el)return;
    const ts=getTasks(),total=ts.length;const c={completed:0,delayed:0,risk:0,progress:0};
    ts.forEach(t=>{const s=statusOf(t);if(s in c)c[s]++});
    const items=[['total',total],['delayed',c.delayed],['risk',c.risk],['completed',c.completed],['progress',c.progress]];
    el.classList.add('pm-kpi-grid');
    el.innerHTML=items.map(([key,n])=>'<div class="card" data-kpi="'+key+'" role="button" tabindex="0" aria-label="Open '+labelMap[key]+' task details"><div class="k">'+labelMap[key]+'</div><div class="v '+COLORS[key]+'">'+n+' <span class="pct">('+pct(n,total)+')</span></div><div class="kpi-sub">of '+total+' total activities · <b>Detail →</b></div></div>').join('');
    el.querySelectorAll('[data-kpi]').forEach(card=>{const fn=()=>openDetail(card.dataset.kpi,total);card.addEventListener('click',fn);card.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();fn()}})});
  }
  let lastSig='';
  function tick(){
    const ts=getTasks();const sig=ts.length+'|'+ts.map(t=>[t.status,t.percent,t.task,t.eta].join('~')).join('||');
    if(sig!==lastSig){lastSig=sig;render()}
  }
  setInterval(tick,500);tick();
  window.addEventListener('storage',tick);window.addEventListener('pm:data-updated',tick);window.pmRefreshKpis=render;
})();
</script>`;
