import base from './interactive.js';
import { kpiOverlay } from './kpi-overlay.js';
import { delayedDashboard } from './delayed-dashboard.js';

const OLD='ProjectMind AI';
const BRAND='Project Intelligence';
const BG_SOURCE='https://cdn.jsdelivr.net/gh/antosadat/projectmind-ai@e0331c81301564fe9c9d417e1b7af5603e5d514d/assets/project-intelligence-bg.webp';
const BACKGROUND_STYLE=String.raw`<style id="pi-background-style">
html,body{background-color:#071321!important}
body{background-image:linear-gradient(rgba(7,19,33,.54),rgba(7,19,33,.64)),url('${BG_SOURCE}');background-size:cover;background-position:center top;background-attachment:fixed;background-repeat:no-repeat}
body::before{content:"";position:fixed;inset:0;background:url('${BG_SOURCE}') center top/cover no-repeat;opacity:.18;pointer-events:none;z-index:0}
.app{position:relative;z-index:1}
.app .hero,.app .card,.app .panel{background:rgba(13,26,43,.76)!important;backdrop-filter:blur(2px)}
.app .alert,.app .projectline{background:rgba(10,22,37,.72)!important}
</style>`;

export default {
  async fetch(request, env, ctx) {
    const response = await base.fetch(request, env, ctx);
    const url = new URL(request.url);
    const ct = response.headers.get('content-type') || '';
    if (url.pathname === '/' && ct.includes('text/html')) {
      const text = await response.text();
      const branded = text.split(OLD).join(BRAND).split('ProjectMind').join(BRAND);
      const monthlyMarker = '<div class="panel pm-chart" style="margin-top:14px"><div class="row"><h3 class="grow">Monthly Delivery Trend</h3>';
      const placed = branded.includes(monthlyMarker)
        ? branded.replace(monthlyMarker, delayedDashboard + monthlyMarker)
        : branded.replace('</body>', delayedDashboard + '</body>');
      const injected = placed.replace('</body>', kpiOverlay + '</body>').replace('</head>', BACKGROUND_STYLE + '</head>');
      const headers = new Headers(response.headers);
      headers.set('content-type','text/html;charset=UTF-8');
      headers.set('cache-control','no-store, no-cache, must-revalidate');
      return new Response(injected,{status:response.status,headers});
    }
    return response;
  }
};
