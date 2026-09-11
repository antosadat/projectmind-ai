export const kpiOverlay = String.raw`
<style id="pm-kpi-overlay-style">
#kpis.pm-kpi-grid{grid-template-columns:repeat(5,minmax(0,1fr))}
#kpis.pm-kpi-grid .card{min-width:0}
#kpis.pm-kpi-grid .v{display:flex;align-items:baseline;gap:7px;flex-wrap:wrap}
#kpis.pm-kpi-grid .pct{font-size:13px;font-weight:600;color:var(--muted)}
#kpis.pm-kpi-grid .kpi-sub{font-size:10px;color:var(--muted);margin-top:3px}
@media(max-width:1100px){#kpis.pm-kpi-grid{grid-template-columns:repeat(3,minmax(0,1fr))}}
@media(max-width:700px){#kpis.pm-kpi-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}
</style>
<script>
(function(){
  const COLORS={total:'blue',delayed:'red',risk:'amber',completed:'green',progress:'blue'};
  const labelMap={total:'TOTAL',delayed:'DELAYED / OVERDUE',risk:'AT RISK',completed:'COMPLETED',progress:'IN PROGRESS'};
  const statusOf=t=>{
    const s=String(t&&t.status||'').trim().toLowerCase();
    if(/complete|completed|done|closed|finish|finished/.test(s)) return 'completed';
    if(/delay|delayed|overdue|late|blocked/.test(s)) return 'delayed';
    if(/risk|at[ -]?risk/.test(s)) return 'risk';
    if(/progress|in[ -]?progress|ongoing|wip|working|execution|development/.test(s)) return 'progress';
    return 'other';
  };
  const getTasks=()=>{try{return typeof project==='function'?(project().tasks||[]):[]}catch(e){return[]}};
  const pct=(n,total)=>total?((n/total)*100).toFixed(1)+'%':'0.0%';
  function render(){
    const el=document.getElementById('kpis'); if(!el) return;
    const ts=getTasks(), total=ts.length;
    const c={completed:0,delayed:0,risk:0,progress:0};
    ts.forEach(t=>{const s=statusOf(t);if(s in c)c[s]++;});
    const items=[['total',total],['delayed',c.delayed],['risk',c.risk],['completed',c.completed],['progress',c.progress]];
    el.classList.add('pm-kpi-grid');
    el.innerHTML=items.map(([key,n])=>{
      const cls=COLORS[key];
      return '<div class="card"><div class="k">'+labelMap[key]+'</div><div class="v '+cls+'">'+n+' <span class="pct">('+pct(n,total)+')</span></div><div class="kpi-sub">of '+total+' total activities</div></div>';
    }).join('');
  }
  let lastSig='';
  function tick(){
    const ts=getTasks();
    const sig=ts.length+'|'+ts.map(t=>String(t.status||'')).join('~');
    if(sig!==lastSig){lastSig=sig;render();}
  }
  const timer=setInterval(tick,500); tick();
  window.addEventListener('storage',tick);
  window.addEventListener('pm:data-updated',tick);
  window.pmRefreshKpis=render;
})();
</script>`;
