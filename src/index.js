const html = String.raw`<!doctype html>
<html lang="en"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>ProjectMind AI</title>
<style>
:root{--bg:#07111f;--panel:#0e1b2d;--line:#21324a;--text:#eef4fb;--muted:#93a4b8;--blue:#4f8cff;--green:#35c98b;--amber:#ffbd45;--red:#ff647c}*{box-sizing:border-box}body{margin:0;background:linear-gradient(180deg,#07111f,#0b1626);color:var(--text);font-family:Inter,system-ui,-apple-system,Segoe UI,sans-serif}.app{max-width:1180px;margin:auto;padding:20px}.top{display:flex;justify-content:space-between;align-items:center;gap:12px}.brand{display:flex;gap:12px;align-items:center}.logo{width:44px;height:44px;border-radius:14px;background:linear-gradient(135deg,#4f8cff,#8a5cff);display:grid;place-items:center;font-size:22px}.brand h1{font-size:21px;margin:0}.brand p{margin:3px 0 0;color:var(--muted);font-size:13px}.online{font-size:13px;color:var(--green);background:#0e2b25;padding:8px 12px;border-radius:99px}.hero{margin:24px 0;padding:22px;border:1px solid var(--line);border-radius:22px;background:rgba(14,27,45,.85)}.hero h2{margin:0 0 6px;font-size:25px}.hero p{margin:0;color:var(--muted)}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}.card{padding:18px;border:1px solid var(--line);background:var(--panel);border-radius:18px}.card .n{font-size:30px;font-weight:800;margin:10px 0 3px}.label{color:var(--muted);font-size:13px}.red{color:var(--red)}.amber{color:var(--amber)}.green{color:var(--green)}.blue{color:var(--blue)}.workspace{display:grid;grid-template-columns:1.1fr .9fr;gap:14px;margin-top:14px}.box{border:1px solid var(--line);background:var(--panel);border-radius:20px;padding:18px}.box h3{margin:0 0 14px;font-size:17px}.chat{height:340px;overflow:auto;padding:4px 0}.msg{max-width:88%;padding:12px 14px;border-radius:15px;margin:8px 0;line-height:1.45;font-size:14px}.bot{background:#16263c}.user{background:#285ea8;margin-left:auto}.compose{display:flex;gap:8px;margin-top:12px}.compose input{flex:1;border:1px solid var(--line);background:#091523;color:white;border-radius:14px;padding:14px;font-size:15px}.compose button{border:0;border-radius:14px;background:var(--blue);color:#fff;padding:0 18px;font-weight:700}.focus li{list-style:none;padding:13px 0;border-bottom:1px solid var(--line)}.focus li:last-child{border:0}.tag{display:inline-block;font-size:11px;padding:4px 8px;border-radius:99px;margin-right:7px}.tred{background:#351923;color:#ff9aaa}.tamb{background:#382b15;color:#ffd27c}.tblue{background:#172d4e;color:#8fb8ff}@media(max-width:760px){.app{padding:14px}.grid{grid-template-columns:repeat(2,1fr)}.workspace{grid-template-columns:1fr}.hero h2{font-size:22px}.top{align-items:flex-start}.online{white-space:nowrap}} 
</style></head><body><main class="app">
<header class="top"><div class="brand"><div class="logo">🧠</div><div><h1>ProjectMind AI</h1><p>PMO Intelligence & Project Delivery Advisor</p></div></div><div class="online" id="brain">● Checking AI Brain</div></header>
<section class="hero"><h2>Project control, prioritised.</h2><p>Ask for risk analysis, recovery plans, delayed task actions, escalation points, and executive-ready PMO updates.</p></section>
<section class="grid"><div class="card"><div class="label">OVERDUE</div><div class="n red">53</div><div class="label">Recovery action required</div></div><div class="card"><div class="label">AT RISK</div><div class="n amber">12</div><div class="label">Monitor closely</div></div><div class="card"><div class="label">COMPLETED</div><div class="n green">84%</div><div class="label">Overall completion</div></div><div class="card"><div class="label">PMO FOCUS</div><div class="n blue">3</div><div class="label">Escalation items today</div></div></section>
<section class="workspace"><div class="box"><h3>🤖 Ask ProjectMind AI</h3><div class="chat" id="chat"><div class="msg bot">I’m ready. Ask me to analyse delayed tasks, build a recovery plan, identify dependencies, prepare an escalation, or rewrite a PMO communication.</div></div><div class="compose"><input id="q" placeholder="Example: Create a recovery plan for 53 delayed tasks..." autocomplete="off"><button id="send">Ask</button></div></div>
<div class="box"><h3>🎯 Need Attention</h3><ul class="focus"><li><span class="tag tred">OVERDUE</span>53 delayed tasks require recovery plan and owner commitment.</li><li><span class="tag tamb">AT RISK</span>Dependencies need confirmation before the next testing cycle.</li><li><span class="tag tblue">PMO</span>Open concerns should have ETA, PIC and impact reflected in solution documents.</li></ul></div></section>
</main><script>
const chat=document.getElementById('chat'),q=document.getElementById('q'),send=document.getElementById('send'),brain=document.getElementById('brain');
function add(text,kind){const d=document.createElement('div');d.className='msg '+kind;d.textContent=text;chat.appendChild(d);chat.scrollTop=chat.scrollHeight}
async function ask(){const text=q.value.trim();if(!text)return;q.value='';add(text,'user');send.disabled=true;send.textContent='...';try{const r=await fetch('/api/chat',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({message:text})});const j=await r.json();add(j.reply||j.error||'No response received.','bot')}catch(e){add('Connection error. Please try again.','bot')}finally{send.disabled=false;send.textContent='Ask'}}
send.onclick=ask;q.addEventListener('keydown',e=>{if(e.key==='Enter')ask()});
fetch('/api/health').then(r=>r.json()).then(j=>{brain.textContent=j.aiConfigured?'● AI Brain Online':'● Dashboard Online · AI key required';brain.style.color=j.aiConfigured?'var(--green)':'var(--amber)'}).catch(()=>{brain.textContent='● Connection unavailable';brain.style.color='var(--red)'});
</script></body></html>`;

const cors={"content-type":"application/json; charset=UTF-8"};
export default {
 async fetch(request, env){
  const url=new URL(request.url);
  if(url.pathname==="/" || url.pathname==="/index.html") return new Response(html,{headers:{"content-type":"text/html; charset=UTF-8"}});
  if(url.pathname==="/api/health") return Response.json({status:"online",service:"ProjectMind AI Brain",version:"2.0",aiConfigured:Boolean(env.OPENAI_API_KEY)},{headers:cors});
  if(url.pathname==="/api/chat" && request.method==="POST"){
   let body; try{body=await request.json()}catch{return Response.json({error:"Invalid JSON"},{status:400,headers:cors})}
   const message=String(body.message||"").trim(); if(!message)return Response.json({error:"Message is required"},{status:400,headers:cors});
   if(!env.OPENAI_API_KEY) return Response.json({reply:"ProjectMind dashboard is deployed. To activate AI chat, add OPENAI_API_KEY as a Cloudflare Worker secret, then retry."},{headers:cors});
   const system="You are ProjectMind AI, a senior global PMO and project delivery advisor. Be practical, structured and concise. Focus on issue, impact, root cause, next action, owner, ETA, dependency, recovery plan and escalation when relevant. For professional messages, write natural business English that does not sound AI-generated.";
   try{
    const model=env.OPENAI_MODEL||"gpt-4.1-mini";
    const res=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":"Bearer "+env.OPENAI_API_KEY,"Content-Type":"application/json"},body:JSON.stringify({model,messages:[{role:"system",content:system},{role:"user",content:message}],temperature:0.4})});
    const data=await res.json();
    if(!res.ok) return Response.json({error:data.error?.message||"AI request failed"},{status:502,headers:cors});
    return Response.json({reply:data.choices?.[0]?.message?.content||"No AI response returned."},{headers:cors});
   }catch(e){return Response.json({error:"Unable to reach AI service."},{status:502,headers:cors})}
  }
  return new Response("Not found",{status:404});
 }
};