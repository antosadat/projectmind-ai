import base from './interactive.js';
import { kpiOverlay } from './kpi-overlay.js';
import { delayedDashboard } from './delayed-dashboard.js';
import agenticScript from './agentic-workbook.js';
import { requireAccess, listProjects, getProject, syncProject, storeDocument, runFreshnessAudit } from './data-layer.js';

const OLD='ProjectMind AI';
const BRAND='Project Intelligence';
const BG_SOURCE='https://cdn.jsdelivr.net/gh/antosadat/projectmind-ai@e0331c81301564fe9c9d417e1b7af5603e5d514d/assets/project-intelligence-bg.webp';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith('/api/data/')) {
      const identity = await requireAccess(ctx);
      if (!identity) {
        return Response.json({error:'ProjectMind data layer requires Cloudflare Access authentication.'},{status:403,headers:{'cache-control':'no-store'}});
      }
      try {
        if (!env.PROJECTMIND_DB) {
          return Response.json({error:'ProjectMind D1 binding is not available yet. Deploy the latest Worker so the private data resources can be provisioned.'},{status:503,headers:{'cache-control':'no-store'}});
        }
        if (url.pathname === '/api/data/projects' && request.method === 'GET') {
          return Response.json({projects:await listProjects(env.PROJECTMIND_DB)},{headers:{'cache-control':'no-store'}});
        }
        if (url.pathname === '/api/data/project' && request.method === 'GET') {
          const projectId=url.searchParams.get('id')||'';
          const p=await getProject(env.PROJECTMIND_DB,projectId);
          return p?Response.json({project:p},{headers:{'cache-control':'no-store'}}):Response.json({error:'Project not found'},{status:404});
        }
        if (url.pathname === '/api/data/refresh' && request.method === 'POST') {
          const body=await request.json();
          const result=await syncProject(env.PROJECTMIND_DB,body,ctx);
          return Response.json({ok:true,...result},{headers:{'cache-control':'no-store'}});
        }
        if (url.pathname === '/api/data/upload' && request.method === 'PUT') {
          const projectId=url.searchParams.get('projectId')||'';
          const filename=url.searchParams.get('filename')||'project-file';
          const length=Number(request.headers.get('content-length')||0);
          if(!projectId)return Response.json({error:'projectId is required'},{status:400});
          if(length>25*1024*1024)return Response.json({error:'File exceeds the 25 MB ProjectMind upload limit for this endpoint.'},{status:413});
          const result=await storeDocument(env,request,projectId,filename);
          return Response.json({ok:true,...result},{headers:{'cache-control':'no-store'}});
        }
        if (url.pathname === '/api/data/health' && request.method === 'GET') {
          const projectId=url.searchParams.get('id')||'';
          const p=await getProject(env.PROJECTMIND_DB,projectId);
          return Response.json({ok:true,configured:true,project:p?{id:p.id,name:p.name,lastUpdatedAt:p.last_updated_at,dataDate:p.data_date,recordCount:p.record_count,dataQuality:p.data_quality,version:p.version,freshness:p.freshness}:null},{headers:{'cache-control':'no-store'}});
        }
        return Response.json({error:'Data API route not found'},{status:404});
      } catch(e) {
        console.error('ProjectMind data API error',e);
        return Response.json({error:e?.message||'ProjectMind data layer error'},{status:500,headers:{'cache-control':'no-store'}});
      }
    }

    const response = await base.fetch(request, env, ctx);
    const securityHeaders = new Headers(response.headers);
    securityHeaders.set('x-content-type-options','nosniff');
    securityHeaders.set('referrer-policy','strict-origin-when-cross-origin');
    securityHeaders.set('permissions-policy','camera=(self), microphone=(self), geolocation=()');
    const ct = response.headers.get('content-type') || '';
    if (url.pathname === '/agentic-workbook.js') {
      return new Response(agenticScript,{headers:{'content-type':'application/javascript;charset=UTF-8','cache-control':'no-store'}});
    }

    if (url.pathname === '/manifest.webmanifest') {
      return new Response(JSON.stringify({
        name:'Project Intelligence',
        short_name:'ProjectMind',
        id:'/',
        start_url:'/',
        scope:'/',
        display:'standalone',
        display_override:['window-controls-overlay','standalone'],
        background_color:'#07111f',
        theme_color:'#07111f',
        description:'Project intelligence, monitoring and AI command center.',
        icons:[
          {src:'/assets/projectmind-icon-512.png',sizes:'512x512',type:'image/png',purpose:'any maskable'},
          {src:'/assets/projectmind-icon-192.png',sizes:'192x192',type:'image/png',purpose:'any maskable'}
        ]
      }),{headers:{'content-type':'application/manifest+json;charset=UTF-8','cache-control':'no-store'}});
    }
    if (url.pathname === '/sw.js') {
      const sw = `self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;event.respondWith(fetch(event.request).catch(()=>new Response('',{status:503,statusText:'Offline'})));});`;
      return new Response(sw,{headers:{'content-type':'application/javascript;charset=UTF-8','cache-control':'no-store'}});
    }
    if (url.pathname === '/' && ct.includes('text/html')) {
      const text = await response.text();
      const branded = text.split(OLD).join(BRAND).split('ProjectMind').join(BRAND);
      const monthlyMarker = '<div class="panel pm-chart" style="margin-top:14px"><div class="row"><h3 class="grow">Monthly Delivery Trend</h3>';
      const placed = branded.includes(monthlyMarker)
        ? branded.replace(monthlyMarker, delayedDashboard + monthlyMarker)
        : branded.replace('</body>', delayedDashboard + '</body>');
      const freshnessPanel = '<div class="panel" id="pmDataFreshness" style="margin-top:14px"><div class="row"><div><h3 style="margin-bottom:4px">Data Freshness &amp; Governance</h3><div class="mini muted">ProjectMind private data layer · D1 + R2 · no office-system connection</div></div><span class="badge" id="pmDataStatus">Checking…</span></div><div id="pmDataFreshnessBody" class="mini muted" style="margin-top:10px">Checking latest server data…</div></div>';
      const governanceImport = `<div class="panel" id="pmGovernanceImport" style="margin-top:14px"><div class="row"><div class="grow"><h3 style="margin-bottom:4px">Data &amp; Governance — Import</h3><div class="mini muted">Import Excel, CSV or project documents into the active ProjectMind tracker.</div></div><button class="btn primary" id="pmGovernanceImportBtn" type="button">⬆ Import Data</button><input id="pmGovernanceImportFile" type="file" accept=".xlsx,.xls,.csv,.pdf,.doc,.docx,.ppt,.pptx,.txt,.md,.json,.xml" style="display:none"></div><div id="pmGovernanceImportStatus" class="mini muted" style="margin-top:10px">Ready to import.</div></div><script>(function(){function init(){var b=document.getElementById('pmGovernanceImportBtn'),f=document.getElementById('pmGovernanceImportFile'),s=document.getElementById('pmGovernanceImportStatus');if(!b||!f)return;if(b.dataset.bound)return;b.dataset.bound='1';b.onclick=function(){f.click()};f.onchange=function(){var x=f.files&&f.files[0];if(!x)return;s.textContent='Selected: '+x.name+' · starting import…';var target=document.getElementById('file');if(target){try{var dt=new DataTransfer();dt.items.add(x);target.files=dt.files;target.dispatchEvent(new Event('change',{bubbles:true}));s.textContent='Import started: '+x.name;}catch(e){s.textContent='Import failed to start: '+e.message;}}else{s.textContent='Import control is ready, but the tracker input is unavailable. Please refresh the page.';}}}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();setTimeout(init,500);setTimeout(init,1500)})();</script>`;
      const mobileLayer = \`
<style>
@media(max-width:760px){
  body{padding-bottom:76px;overflow-x:hidden}
  .app{padding:10px;max-width:100vw}
  .brand h1{font-size:18px}.brand p{font-size:10px}
  .logo{width:40px;height:40px;border-radius:12px}
  .hero{padding:16px;border-radius:16px}.hero h2{font-size:21px}
  .tabs{display:none}
  .grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
  .card,.panel{padding:12px;border-radius:14px}
  .v{font-size:22px}
  .layout,.split,.command-grid,.critical-grid,.scenario{grid-template-columns:1fr!important}
  .portfolio-grid{grid-template-columns:1fr!important}
  .tablewrap{max-height:none;overflow-x:auto}
  th,td{padding:8px;font-size:11px}
  .chat-fab{right:14px;bottom:88px;width:52px;height:52px}
  .chatbox{right:8px;bottom:76px;width:calc(100vw - 16px);height:min(70vh,620px);border-radius:16px}
  .evidence-grid{grid-template-columns:1fr}
  .advisor-output{max-height:none}
  .mobile-nav{position:fixed;z-index:1100;left:0;right:0;bottom:0;height:68px;padding:7px max(8px,env(safe-area-inset-left)) calc(7px + env(safe-area-inset-bottom)) max(8px,env(safe-area-inset-right));display:grid;grid-template-columns:repeat(5,1fr);gap:5px;background:rgba(7,17,31,.96);backdrop-filter:blur(14px);border-top:1px solid #223a56}
  .mobile-nav button{border:1px solid transparent;background:transparent;color:#91a4ba;border-radius:11px;font-size:10px;padding:6px 2px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px}
  .mobile-nav button.active{color:#fff;background:#102d4b;border-color:#31557a}
  .mobile-nav b{font-size:17px;line-height:17px}
}
@media(min-width:761px){.mobile-nav{display:none}}
</style>
<nav class="mobile-nav" aria-label="ProjectMind mobile navigation">
  <button data-mobile-tab="command"><b>⌂</b><span>Home</span></button>
  <button data-mobile-tab="portfolio"><b>▦</b><span>Projects</span></button>
  <button data-mobile-tab="command-ai"><b>◈</b><span>AI</span></button>
  <button data-mobile-tab="recovery"><b>!</b><span>Recovery</span></button>
  <button data-mobile-tab="executive"><b>◉</b><span>Exec</span></button>
</nav>
<script>
(function(){
  function bindMobileNav(){
    document.querySelectorAll('[data-mobile-tab]').forEach(function(btn){
      btn.onclick=function(){
        var target=btn.getAttribute('data-mobile-tab');
        var desktop=document.querySelector('.tabs button[data-tab="'+target+'"]');
        if(desktop) desktop.click();
        document.querySelectorAll('[data-mobile-tab]').forEach(function(x){x.classList.toggle('active',x===btn)});
        window.scrollTo({top:0,behavior:'smooth'});
      };
    });
    var active=document.querySelector('.tabs button.active')?.getAttribute('data-tab')||'command';
    document.querySelectorAll('[data-mobile-tab]').forEach(function(x){x.classList.toggle('active',x.getAttribute('data-mobile-tab')===active)});
    document.getElementById('tabs')?.addEventListener('click',function(e){
      var b=e.target.closest('button[data-tab]'); if(!b)return;
      document.querySelectorAll('[data-mobile-tab]').forEach(function(x){x.classList.toggle('active',x.getAttribute('data-mobile-tab')===b.getAttribute('data-tab') && ['command','portfolio','command-ai','recovery','executive'].includes(b.getAttribute('data-tab')))});
    });
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindMobileNav);else bindMobileNav();
  if('serviceWorker' in navigator)navigator.serviceWorker.register('/sw.js',{scope:'/'}).catch(function(){});
})();
</script>\`;
      const injected = withFreshness
        .replace('<head>','<head><link rel="manifest" href="/manifest.webmanifest"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">')
        .replace('</body>', clientScript + mobileLayer + kpiOverlay + '<script src="/agentic-workbook.js"></script></body>');
      const headers = new Headers(response.headers);
      headers.set('content-type','text/html;charset=UTF-8');
      headers.set('cache-control','no-store, no-cache, must-revalidate');
      return new Response(injected,{status:response.status,headers});
    }
    return new Response(response.body,{status:response.status,statusText:response.statusText,headers:securityHeaders});
  },
  async scheduled(controller, env, ctx) {
    try {
      await runFreshnessAudit(env.PROJECTMIND_DB);
      console.log('ProjectMind freshness audit completed', controller.cron);
    } catch(e) {
      console.error('ProjectMind freshness audit failed', e);
    }
  }
};