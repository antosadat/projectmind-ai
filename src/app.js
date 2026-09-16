import base from './interactive.js';
import { kpiOverlay } from './kpi-overlay.js';
import { delayedDashboard } from './delayed-dashboard.js';

const OLD='ProjectMind AI';
const BRAND='Project Intelligence';
const BACKGROUND_STYLE=String.raw`<style id="pi-background-style">
html,body{background-color:#071321!important}
body{background-image:linear-gradient(rgba(7,19,33,.82),rgba(7,19,33,.88)),url('https://raw.githubusercontent.com/antosadat/projectmind-ai/main/assets/project-intelligence-bg.webp');background-size:cover;background-position:center top;background-attachment:fixed;background-repeat:no-repeat}
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
      headers.set('content-type', 'text/html;charset=UTF-8');
      headers.set('cache-control', 'no-store, no-cache, must-revalidate');
      return new Response(injected, { status: response.status, headers });
    }
    return response;
  }
};
