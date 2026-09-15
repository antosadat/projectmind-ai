export const delayedDashboard = String.raw`
<style id="pi-delayed-dashboard-style">
#piDelayedDash{margin-top:18px;background:#f7f8fa;border:1px solid #d8dee7;border-radius:16px;padding:24px;color:#273142;box-shadow:0 8px 24px rgba(15,23,42,.08)}
#piDelayedDash .pi-dd-grid{display:grid;grid-template-columns:minmax(0,1.65fr) minmax(300px,.95fr);gap:28px;align-items:stretch}
#piDelayedDash .pi-dd-title{font-size:22px;font-weight:800;margin:0 0 22px;color:#202733}
#piDelayedDash .pi-dd-chart{min-width:0}
#piDelayedDash .pi-dd-row{display:grid;grid-template-columns:125px 1fr 38px;gap:10px;align-items:center;margin:16px 0;cursor:pointer}
#piDelayedDash .pi-dd-label{text-align:right;font-size:13px;color:#4b5563;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
#piDelayedDash .pi-dd-bar{height:31px;background:#e8ebef;border-radius:2px;overflow:hidden}
#piDelayedDash .pi-dd-bar i{display:block;height:100%;background:#ff2f2f;transition:width .2s ease}
#piDelayedDash .pi-dd-value{font-size:14px;font-weight:600;color:#374151}
#piDelayedDash .pi-dd-row:hover .pi-dd-label{font-weight:700;color:#111827}
#piDelayedDash .pi-dd-row:hover .pi-dd-bar i{background:#e52335}
#piDelayedDash .pi-dd-side{display:flex;flex-direction:column;gap:22px}
#piDelayedDash .pi-dd-box{background:#fff;border:1px solid #cbd3dd;border-radius:8px;padding:12px 20px;position:relative}
#piDelayedDash .pi-dd-box:before{content:"";position:absolute;left:0;top:0;bottom:0;width:7px;background:#d9485f;border-radius:8px 0 0 8px}
#piDelayedDash .pi-dd-kicker{font-size:10px;font-weight:700;letter-spacing:.02em;color:#5b6470;border:1px solid #aeb7c2;padding:8px 12px;margin-bottom:12px}
#piDelayedDash .pi-dd-number{font-size:24px;font-weight:800;color:#1f2937;border:1px solid #aeb7c2;padding:18px 14px}
#piDelayedDash .pi-dd-number span{font-weight:500;font-size:17px}
#piDelayedDash .pi-dd-imp{background:#fff;border:1px solid #aeb7c2;padding:18px 16px;color:#4b5563;line-height:1.55;font-size:13px;min-height:92px}
#piDelayedDash .pi-dd-imp-title{font-size:14px;font-weight:800;color:#374151;border:1px solid #aeb7c2;padding:12px;margin-bottom:8px;background:#fff}
#piDelayedDash .pi-dd-empty{padding:55px 20px;text-align:center;color:#6b7280}
#piDelayedDash .pi-dd-hint{font-size:11px;color:#6b7280;margin-top:12px}
#piDelayedDetail{position:fixed;inset:0;background:rgba(0,0,0,.62);display:none;align-items:center;justify-content:center;padding:20px;z-index:2200}
#piDelayedDetail.open{display:flex}
#piDelayedDetail .pi-dd-modal{width:min(1120px,96vw);max-height:88vh;overflow:auto;background:#0d1a2b;border:1px solid #355678;border-radius:18px;padding:18px;color:#eef5fc;box-shadow:0 30px 90px rgba(0,0,0,.55)}
#piDelayedDetail .pi-dd-modal-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:14px}
#piDelayedDetail table{width:100%;border-collapse:collapse;font-size:12px}
#piDelayedDetail th,#piDelayedDetail td{padding:9px 8px;border-bottom:1px solid #223a56;text-align:left;vertical-align:top}
#piDelayedDetail th{color:#a9bdd3;background:#102039;position:sticky;top:0}
@media(max-width:900px){#piDelayedDash .pi-dd-grid{grid-template-columns:1fr}#piDelayedDash .pi-dd-row{grid-template-columns:105px 1fr 32px}#piDelayedDash .pi-dd-label{text-align:right}}
</style>
<div id="piDelayedDash">
  <div class="pi-dd-grid">
    <section class="pi-dd-chart">
      <h2 class="pi-dd-title">Stream Delayed</h2>
      <div id="piDelayedRows"></div>
      <div class="pi-dd-hint">Click any stream to open delayed-task details.</div>
    </section>
    <aside class="pi-dd-side">
      <div id="piDelayedTop1"></div>
      <div id="piDelayedTop2"></div>
      <div class="pi-dd-box" style="padding:0;border:none;background:transparent">
        <div class="pi-dd-imp-title">Management implication</div>
        <div class="pi-dd-imp" id="piDelayedImplication"></div>
      </div>
    </aside>
  </div>
</div>
<div id="piDelayedDetail"><div class="pi-dd-modal"><div class="pi-dd-modal-head"><div><h2 id="piDelayedDetailTitle" style="margin:0"></h2><div id="piDelayedDetailSub" style="margin-top:4px;color:#91a4ba;font-size:11px"></div></div><button class="btn" id="piDelayedDetailClose">Close</button></div><div id="piDelayedDetailBody"></div></div></div>
<script>
(function(){
  'use strict';
  function tasks(){try{if(typeof project!=='function')return[];var p=project()||{};return Array.isArray(p.tasks)?p.tasks:[]}catch(e){return[]}}
  function delayed(t){return /delay|overdue|late|blocked/i.test(String(t&&t.status||''))}
  function esc(v){return String(v==null?'':v).replace(/[&<>\"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[c]})}
  function streamName(t){return String(t&&t.stream||'General').trim()||'General'}
  function openDetail(name,items){
    var modal=document.getElementById('piDelayedDetail');if(!modal)return;
    document.getElementById('piDelayedDetailTitle').textContent=name+' — Delayed Tasks';
    document.getElementById('piDelayedDetailSub').textContent=items.length+' delayed task(s)';
    var body=document.getElementById('piDelayedDetailBody');
    if(!items.length){body.innerHTML='<div style="padding:30px;text-align:center;color:#91a4ba">No delayed task data.</div>'}
    else{
      var h='<table><thead><tr><th>Task</th><th>PIC</th><th>ETA</th><th>Priority</th><th>Status</th><th>Dependency / Blocker</th><th>PMO Action</th></tr></thead><tbody>';
      items.forEach(function(t){h+='<tr><td><b>'+esc(t.task||t.activity||'—')+'</b></td><td>'+esc(t.pic||t.owner||'—')+'</td><td>'+esc(t.eta||t.proposedEnd||t.baselineFinish||'—')+'</td><td>'+esc(t.priority||'—')+'</td><td>'+esc(t.status||'Delayed')+'</td><td>'+esc(t.dependency||t.blocker||'—')+'</td><td>'+esc(t.action||t.nextAction||'—')+'</td></tr>'});
      body.innerHTML=h+'</tbody></table>';
    }
    modal.classList.add('open');
  }
  function box(el,x){el.innerHTML='<div class="pi-dd-box"><div class="pi-dd-kicker">'+esc(x.s.toUpperCase())+' STREAM</div><div class="pi-dd-number">'+x.d+' <span>delayed / '+x.total+' total</span></div></div>';el.firstElementChild.onclick=function(){openDetail(x.s,x.items)}}
  function render(){
    var all=tasks(),m={};
    all.forEach(function(t){var s=streamName(t);if(!m[s])m[s]={s:s,total:0,d:0,items:[]};m[s].total++;if(delayed(t)){m[s].d++;m[s].items.push(t)}});
    var rows=Object.keys(m).map(function(k){return m[k]}).filter(function(x){return x.d>0}).sort(function(a,b){return b.d-a.d||b.total-a.total}).slice(0,6);
    var container=document.getElementById('piDelayedRows');
    if(!container)return;
    if(!rows.length){container.innerHTML='<div class="pi-dd-empty">No delayed stream data available.</div>';return}
    var max=Math.max(1,rows[0].d);
    container.innerHTML=rows.map(function(x){return '<div class="pi-dd-row" data-stream="'+esc(x.s)+'"><span class="pi-dd-label">'+esc(x.s)+'</span><span class="pi-dd-bar"><i style="width:'+Math.max(4,x.d/max*100)+'%"></i></span><span class="pi-dd-value">'+x.d+'</span></div>'}).join('');
    container.querySelectorAll('[data-stream]').forEach(function(el){el.onclick=function(){var s=el.dataset.stream;var x=m[s];openDetail(s,x?x.items:[])}});
    box(document.getElementById('piDelayedTop1'),rows[0]);
    if(rows[1])box(document.getElementById('piDelayedTop2'),rows[1]);else document.getElementById('piDelayedTop2').innerHTML='';
    var lead=rows[0],second=rows[1];
    document.getElementById('piDelayedImplication').textContent=second?'Prioritize '+lead.s+' and '+second.s+' first, as they account for '+(lead.d+second.d)+' delayed activities and represent the highest concentration of delivery exceptions.':'Prioritize '+lead.s+' first, as it represents the highest concentration of delayed activities.';
  }
  var close=document.getElementById('piDelayedDetailClose');if(close)close.onclick=function(){document.getElementById('piDelayedDetail').classList.remove('open')};
  var modal=document.getElementById('piDelayedDetail');if(modal)modal.onclick=function(e){if(e.target===modal)modal.classList.remove('open')};
  var tries=0;var timer=setInterval(function(){tries++;if(typeof project==='function'&&document.getElementById('pmDash')){render();clearInterval(timer)}if(tries>80)clearInterval(timer)},250);
})();
</script>`;
