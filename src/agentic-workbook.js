const agenticScript = String.raw`(() => {
  const norm = v => String(v ?? '').toLowerCase().replace(/[^a-z0-9]/g,'');
  const headerWords = {
    task:/task|activity|action|item|deliverable|requirement|milestone|workstream|stream/i,
    status:/status|health|rag|state/i,
    owner:/pic|owner|responsible|assignee|accountable/i,
    date:/date|eta|finish|end|target|commit|deadline|due/i,
    risk:/risk|issue|blocker|dependency|attention|escalat/i
  };
  const classify = (name, rows) => {
    const text = (name+' '+rows.slice(0,12).flat().join(' ')).toLowerCase();
    if (/need.?attention|escalat/.test(text)) return 'Need Attention / Exception';
    if (/task.?pivot|pivot/.test(text)) return 'KPI / Pivot';
    if (/mpp|timeline|gantt|calendar|milestone/.test(text)) return 'Timeline / Milestone';
    if (/risk|raid|issue|blocker|dependency/.test(text)) return 'Risk / Issue / RAID';
    if (/solution|design|architecture/.test(text)) return 'Solution';
    if (/development|build|coding/.test(text)) return 'Development';
    if (/sit|system.?integration/.test(text)) return 'SIT';
    if (/uat|user.?acceptance/.test(text)) return 'UAT';
    if (/non.?functional|nft|performance|security|load.?test/.test(text)) return 'Non-Functional Test';
    if (/test|qa|quality|functional/.test(text)) return 'Functional Test';
    if (/environment|infra|readiness|connectivity|deployment|release/.test(text)) return 'Environment / Deployment';
    if (/change|cr|change.?request/.test(text)) return 'Change Management';
    if (/resource|capacity|staff/.test(text)) return 'Resource';
    if (/executive|summary|dashboard|management/.test(text)) return 'Executive / Summary';
    return 'General / Unclassified';
  };
  function analyzeSheet(name) {
    const raw = XLSX.utils.sheet_to_json(importBook.Sheets[name], {header:1, defval:'', raw:false, blankrows:false});
    const sample = raw.slice(0,80);
    let headerRow=-1, score=0;
    for(let i=0;i<Math.min(raw.length,20);i++){
      const h=raw[i].map(String);
      let s=0;
      Object.values(headerWords).forEach(rx=>{if(h.some(v=>rx.test(v)))s++});
      if(s>score){score=s;headerRow=i}
    }
    const headers=headerRow>=0?raw[headerRow].map(v=>String(v||'').trim()).filter(Boolean):[];
    const body=headerRow>=0?raw.slice(headerRow+1):raw;
    const text=body.flat().map(v=>String(v||'')).filter(Boolean);
    const statusCounts={};
    text.forEach(v=>{if(/delayed|overdue|late|blocked/i.test(v))statusCounts.Delayed=(statusCounts.Delayed||0)+1;
      else if(/at risk|risk|amber/i.test(v))statusCounts['At Risk']=(statusCounts['At Risk']||0)+1;
      else if(/completed|complete|done|closed/i.test(v))statusCounts.Completed=(statusCounts.Completed||0)+1;
      else if(/on track|green/i.test(v))statusCounts['On Track']=(statusCounts['On Track']||0)+1;});
    const taskHeaders=headers.filter(h=>headerWords.task.test(h));
    const dateHeaders=headers.filter(h=>headerWords.date.test(h));
    return {name,type:classify(name,sample),rows:raw.length,columns:Math.max(...raw.map(r=>r.length),0),headerRow:headerRow+1,headers:headers.slice(0,30),taskHeaders,dateHeaders,statusCounts};
  }
  function buildWorkbookIntelligence() {
    if(!importBook)return null;
    const sheets=importBook.SheetNames.map(analyzeSheet);
    const allText=sheets.map(s=>s.name+' ['+s.type+']: '+s.headers.join(', ')).join('\n');
    const exceptions=sheets.filter(s=>Object.keys(s.statusCounts).some(k=>k==='Delayed'||k==='At Risk'));
    return {
      fileName:importFileName||'Workbook',
      worksheetCount:sheets.length,
      analyzedAt:new Date().toISOString(),
      sheets,
      exceptionSheets:exceptions.map(s=>({name:s.name,type:s.type,status:s.statusCounts})),
      projectCoverage:sheets.reduce((m,s)=>(m[s.type]=(m[s.type]||0)+1,m),{}),
      contextText:allText
    };
  }
  function workbookTasksAll() {
    if(!importBook)return [];
    const out=[];
    importBook.SheetNames.forEach(name=>{
      const meta=sheetMeta(importBook.Sheets[name],name);
      if(meta.usable>0){
        clean(meta.rows).forEach(t=>out.push({...t,sourceSheet:name}));
      }
    });
    const seen=new Set();
    return out.filter(t=>{const k=norm(t.task)+'|'+norm(t.stream)+'|'+norm(t.pic);if(seen.has(k))return false;seen.add(k);return true});
  }
  function renderWorkbookPanel(wi) {
    let el=document.getElementById('agenticWorkbookPanel');
    if(!el){
      const host=document.querySelector('#data .layout .panel');
      if(!host)return;
      el=document.createElement('div');el.id='agenticWorkbookPanel';el.style.marginTop='14px';host.appendChild(el);
    }
    if(!wi){el.innerHTML='';return}
    const counts=Object.entries(wi.projectCoverage).map(([k,v])=>'<span class="badge" style="margin:3px">'+esc(k)+': '+v+'</span>').join('');
    const rows=wi.sheets.map(s=>{
      const st=Object.entries(s.statusCounts).map(([k,v])=>k+' '+v).join(' · ');
      return '<tr><td>'+esc(s.name)+'</td><td>'+esc(s.type)+'</td><td>'+s.rows+'</td><td>'+esc(st||'—')+'</td></tr>';
    }).join('');
    el.innerHTML='<div class="panel" style="padding:14px"><div class="row"><h3 class="grow">🧠 Agentic Workbook Intelligence</h3><span class="badge">'+wi.worksheetCount+' worksheets analysed</span></div><div class="mini muted" style="margin-bottom:8px">'+esc(wi.fileName)+' · Cross-worksheet analysis active</div><div style="margin-bottom:10px">'+counts+'</div><div class="tablewrap" style="max-height:300px"><table><thead><tr><th>Worksheet</th><th>Detected Role</th><th>Rows</th><th>Status Signals</th></tr></thead><tbody>'+rows+'</tbody></table></div></div>';
  }
  function activateAgenticWorkbook() {
    if(typeof importBook==='undefined'||!importBook)return;
    const wi=buildWorkbookIntelligence();
    if(!wi)return;
    const allTasks=workbookTasksAll();
    const p=project();
    p.workbook=wi;
    p.tasks=allTasks.length?allTasks:p.tasks;
    p.workbookTaskCount=allTasks.length;
    save(); renderWorkbookPanel(wi); render();
    document.getElementById('mapping').textContent='Workbook '+wi.fileName+' analysed across all '+wi.worksheetCount+' worksheets. '+allTasks.length+' task-like records consolidated for Project Intelligence.';
    const control=document.getElementById('sheetControl');
    if(control&&!document.getElementById('agenticAllBtn')){
      const b=document.createElement('button');b.id='agenticAllBtn';b.className='btn good';b.textContent='✓ All Worksheets Analysed';b.disabled=true;control.appendChild(b);
    }
  }
  const originalFileHandler=document.getElementById('file')?.onchange;
  const file=document.getElementById('file');
  if(file){
    file.addEventListener('change',()=>setTimeout(activateAgenticWorkbook,180));
  }
  const originalContext=window.projectChatContext;
  if(typeof originalContext==='function'){
    window.projectChatContext=function(){
      const c=originalContext();
      const wi=project()?.workbook;
      if(wi)c.workbookIntelligence={fileName:wi.fileName,worksheetCount:wi.worksheetCount,sheets:wi.sheets,exceptionSheets:wi.exceptionSheets,projectCoverage:wi.projectCoverage,taskCount:project()?.workbookTaskCount||project()?.tasks?.length||0};
      return c;
    };
  }
  const oldAsk=document.getElementById('askAI')?.onclick;
  if(oldAsk) document.getElementById('askAI').onclick=async function(){
    const q=document.getElementById('question').value||'Analyse the complete workbook and identify PMO priorities.';
    const ans=document.getElementById('aiAnswer');ans.value='Analysing all worksheets...';
    try{
      const c=projectChatContext();
      const r=await fetch('/api/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({question:q,tasks:c.tasks,changes:c.changes,workbook:c.workbookIntelligence})});
      const d=await r.json();ans.value=d.report||'No analysis returned.';
    }catch(e){ans.value='Unable to reach the analysis service. Local PMO workflow remains available.'}
  };
  const status=document.getElementById('mode');
  if(status&&importBook)status.textContent='● Agentic Workbook Intelligence Active';
})();`;
export default agenticScript;
