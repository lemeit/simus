(()=>{
'use strict';
const cfg=COURSE_CONFIG,$=id=>document.getElementById(id),fmt=(x,n=2)=>new Intl.NumberFormat('es-AR',{maximumFractionDigits:n}).format(Math.abs(x)<1e-10?0:x);
let params={},state={},history=[],playing=false,last=null,paintTime=0;
const color=t=>{const f=Math.max(0,Math.min(1,(t-20)/60));return `rgb(${Math.round(0+255*f)},${Math.round(150-63*f)},${Math.round(136-102*f)})`;};
function css(k){return getComputedStyle(document.documentElement).getPropertyValue(k).trim();}
function setupCanvas(canvas,w,h){const d=Math.min(2,devicePixelRatio||1);canvas.width=w*d;canvas.height=h*d;canvas.style.aspectRatio=w+'/'+h;const c=canvas.getContext('2d');c.setTransform(d,0,0,d,0,0);c.clearRect(0,0,w,h);return c;}
function chart(canvas,series,{xmin=0,xmax=60,ymin=0,ymax=100,xlabel='Tiempo (s)',ylabel='Temperatura (°C)',dots=true}={}){
 if(xmax<=xmin)xmax=xmin+1;if(ymax<=ymin)ymax=ymin+1;
 const mobile=innerWidth<650,c=setupCanvas(canvas,700,330),L=mobile?88:76,R=668,T=35,B=267;
 const X=x=>L+(R-L)*(x-xmin)/(xmax-xmin),Y=y=>B-(B-T)*(y-ymin)/(ymax-ymin);
 c.font=`${mobile?23:17}px system-ui`;c.fillStyle=css('--dim');c.fillText(ylabel,L,23);
 for(let i=0;i<=4;i++){const x=xmin+(xmax-xmin)*i/4,y=ymin+(ymax-ymin)*i/4;c.strokeStyle=css('--border');c.lineWidth=1;c.beginPath();c.moveTo(X(x),T);c.lineTo(X(x),B);c.moveTo(L,Y(y));c.lineTo(R,Y(y));c.stroke();c.fillStyle=css('--dim');c.textAlign='center';c.fillText(fmt(x,xmax<2?2:1),X(x),B+30);c.textAlign='right';c.fillText(fmt(y,Math.abs(ymax-ymin)<1?3:1),L-9,Y(y)+6);}
 c.textAlign='center';c.fillText(xlabel,(L+R)/2,322);c.textAlign='left';
 c.save();c.beginPath();c.rect(L,T,R-L,B-T);c.clip();
 series.forEach((s,i)=>{c.strokeStyle=s.color||[css('--a'),css('--b'),css('--text')][i%3];c.lineWidth=3;c.setLineDash(s.dash||[]);c.beginPath();s.points.forEach(([x,y],j)=>j?c.lineTo(X(x),Y(y)):c.moveTo(X(x),Y(y)));c.stroke();c.setLineDash([]);if(dots&&s.points.length){const [x,y]=s.points.at(-1);c.fillStyle=c.strokeStyle;c.beginPath();c.arc(X(x),Y(y),4,0,Math.PI*2);c.fill();}});c.restore();
 canvas.setAttribute('aria-label',`${cfg.graph}. X: ${xlabel}. Y: ${ylabel}. ${series.map(s=>s.label+': '+fmt(s.points.at(-1)?.[1]??0,4)).join('; ')}`);
 $('legend').innerHTML=series.map((s,i)=>`<span><i style="border-top:3px ${s.dash?'dashed':'solid'} ${s.color||[css('--a'),css('--b'),css('--text')][i%3]}"></i>${s.label}</span>`).join('');
}
function controls(){
 $('controls').innerHTML=cfg.controls.map(([key,label,min,max,step,value])=>`<label for="p-${key}">${label}<output id="o-${key}"></output></label><input type="range" id="p-${key}" min="${min}" max="${max}" step="${step}" value="${value}">`).join('');
 cfg.controls.forEach(([key])=>$('p-'+key).addEventListener('input',reset));
 if(cfg.id===8){$('sliceControls').hidden=false;for(const key of ['x','y','z'])$('slice-'+key).addEventListener('input',render);}
}
function reset(){playing=false;last=null;params={};cfg.controls.forEach(([k])=>{params[k]=Number($('p-'+k).value);$('o-'+k).value=fmt(params[k],4);});
 state={time:0};if(cfg.dimension){state.diff=createDiffusion({dimension:cfg.dimension,alpha:params.alpha});state.initial=Array.from(state.diff.field);}
 history=[];sample();$('settings').disabled=false;$('start').textContent=cfg.id===4?'Recorrer curva':'Iniciar';render();}
function current(){const t=state.time;
 switch(cfg.id){case 1:return calorimetry({...params,time:t});case 2:return firstLaw({...params,time:t});case 3:return contactEntropy({...params,time:t});case 4:return thirdLaw(Math.max(.2,params.temperature*(1-t/cfg.duration)+.2*t/cfg.duration));case 5:return fourier(params);default:return diffusionStats(state.diff);}}
function sample(){const v=current();history.push({t:state.time,...v});if(history.length>1600)history=history.filter((_,i)=>i%2===0||i===history.length-1);}
function tick(dt){const remaining=cfg.duration-state.time,step=Math.min(dt,remaining);if(cfg.dimension)advanceDiffusion(state.diff,step);state.time+=step;if(state.time>=cfg.duration-1e-9){state.time=cfg.duration;playing=false;$('start').textContent='Finalizado';}sample();}
function metric(name,value,note=''){return `<div class="metric"><span>${name}</span><strong>${value}</strong><small>${note}</small></div>`;}
function scenes(v){
 const c=setupCanvas($('scene'),700,cfg.id===8?640:220),dark=document.documentElement.dataset.theme==='dark';c.font='20px system-ui';c.textAlign='center';
 const block=(x,w,t,label,sub)=>{c.fillStyle=color(t);c.fillRect(x,45,w,100);c.fillStyle='#fff';c.strokeStyle='#1A1612';c.lineWidth=3;c.strokeText(label,x+w/2,77);c.fillText(label,x+w/2,77);c.font='bold 26px system-ui';c.strokeText(fmt(t,1)+' °C',x+w/2,115);c.fillText(fmt(t,1)+' °C',x+w/2,115);c.font='18px system-ui';c.fillStyle=css('--dim');c.fillText(sub,x+w/2,175);};
 if(cfg.id===1){block(240,220,v.temperature,'Cuerpo uniforme',`C = ${fmt(v.capacity)} J/°C`);c.fillStyle=css('--accent');c.fillText(`Fuente → ${params.power} W → cuerpo`,350,210);}
 if(cfg.id===2){c.fillStyle=css('--soft');c.fillRect(225,35,250,140);c.fillStyle=css('--text');c.fillText('Sistema cerrado',350,75);c.font='bold 26px system-ui';c.fillText('ΔU = '+fmt(v.u)+' J',350,120);c.font='17px system-ui';c.fillStyle=css('--a');c.fillText(params.heatRate>=0?'Calor →':'← Calor',100,85);c.fillText(fmt(Math.abs(params.heatRate))+' W',100,115);c.fillStyle=css('--b');c.fillText(params.workRate>=0?'Trabajo →':'← Trabajo',585,85);c.fillText(fmt(Math.abs(params.workRate))+' W',585,115);c.fillStyle=css('--dim');c.fillText('Flechas: cruce de energía por la frontera. No es un motor modelado.',350,210);}
 if(cfg.id===3){block(110,240,v.a,'A · C = 100 J/K','ΔS_A = '+fmt(v.sa,3)+' J/K');block(350,240,v.b,'B · C = '+params.cb+' J/K','ΔS_B = '+fmt(v.sb,3)+' J/K');c.fillStyle=css('--accent');c.fillText(v.power>1e-8?'Calor: A → B':v.power<-1e-8?'Calor: B → A':'Sin flujo neto',350,210);}
 if(cfg.id===4){c.fillStyle=css('--soft');c.fillRect(130,40,440,80);c.fillStyle=css('--b');c.fillRect(130,40,440*v.temperature/10,80);c.fillStyle=css('--text');c.font='bold 28px system-ui';c.fillText(fmt(v.temperature,2)+' K',350,155);c.font='18px system-ui';c.fillText('Recorrido por estados de la curva; no es tiempo de enfriamiento.',350,205);}
 if(cfg.id===5){for(let i=0;i<100;i++){c.fillStyle=color(v.at(i/99));c.fillRect(70+i*5.6,55,6,60);}c.fillStyle=css('--text');c.fillText(params.left+' °C',75,40);c.fillText(params.right+' °C',625,40);c.fillText('x = 0 m',75,150);c.fillText('x = 1 m',625,150);c.fillStyle=css('--accent');c.fillText(v.power>0?'Calor →':v.power<0?'← Calor':'Sin flujo',350,150);c.fillText(`P = ${fmt(v.power,3)} W · Energía que atravesó: ${fmt(v.power*state.time,2)} J`,350,205);}
 if(cfg.dimension){const s=state.diff,n=s.n;
  if(cfg.dimension===1){for(let x=0;x<n;x++){c.fillStyle=color(s.field[x]);c.fillRect(65+x*570/n,65,570/n+1,60);}c.fillStyle=css('--text');c.fillText('0 m',65,160);c.fillText('1 m',635,160);c.fillText('Extremos aislados · cada franja es una celda',350,205);}
  const drawSlice=(ox,oy,size,axis,idx)=>{for(let j=0;j<n;j++)for(let i=0;i<n;i++){const xyz=axis==='XY'?[i,j,idx]:axis==='XZ'?[i,idx,j]:[idx,i,j];c.fillStyle=color(s.field[s.index(...xyz)]);c.fillRect(ox+i*size/n,oy+(n-1-j)*size/n,size/n+1,size/n+1);}c.strokeStyle=css('--dim');c.strokeRect(ox,oy,size,size);c.fillStyle=css('--text');c.font='16px system-ui';c.fillText(axis,ox+size/2,oy-8);c.fillText(axis[0]+': 0 → 1 m',ox+size/2,oy+size+24);c.save();c.translate(ox-12,oy+size/2);c.rotate(-Math.PI/2);c.fillText(axis[1]+': 0 → 1 m',0,0);c.restore();};
  if(cfg.dimension===2){drawSlice(260,25,160,'XY',0);const row=Math.floor(n/2),y=(row+.5)/n;c.strokeStyle=css('--text');c.setLineDash([6,3]);c.beginPath();c.moveTo(260,25+160*(1-y));c.lineTo(420,25+160*(1-y));c.stroke();c.setLineDash([]);c.fillStyle=css('--dim');c.fillText(`Corte marcado: y = ${fmt(y,3)} m`,350,219);}
  if(cfg.dimension===3){const [ix,iy,iz]=sliceIndices();drawSlice(48,36,165,'XY',iz);drawSlice(280,36,165,'XZ',iy);drawSlice(512,36,165,'YZ',ix);
    c.fillStyle=css('--dim');c.fillText(`Planos: x=${fmt((ix+.5)/n,3)}, y=${fmt((iy+.5)/n,3)}, z=${fmt((iz+.5)/n,3)} m`,350,258);
    // Proyección isométrica del campo real. Se omiten celdas casi iguales al fondo.
    const base=20;for(let z=n-1;z>=0;z--)for(let y=n-1;y>=0;y--)for(let x=0;x<n;x++){const t=s.field[s.index(x,y,z)],excess=Math.abs(t-base);if(excess<.5)continue;const px=350+(x-y)*11,py=510+(x+y-n)*5-z*10;c.globalAlpha=.12+.65*Math.min(1,excess/60);c.fillStyle=color(t);c.fillRect(px-4,py-4,8,8);}c.globalAlpha=1;c.fillStyle=css('--text');c.fillText('Vista oblicua de las celdas · escala fija 20–80 °C',350,610);
  }
 }
 $('scene').setAttribute('aria-label',$('summary').textContent||cfg.intro);
}
function sliceIndices(){return ['x','y','z'].map(k=>Number($('slice-'+k).value));}
function render(){const v=current(),t=state.time;let series=[],options={},metrics='',summary='';
 $('clock').textContent=cfg.id===4?'Recorrido: '+fmt(100*t/cfg.duration,0)+' %':'t = '+fmt(t,1)+' s';
 if(cfg.id===1){series=[{label:'Q recibido',points:history.map(h=>[h.delta,h.q])}];options={xmax:Math.max(1,params.power*cfg.duration/(params.mass*params.c)),ymax:params.power*cfg.duration,xlabel:'Cambio de temperatura ΔT (°C)',ylabel:'Calor Q (J)'};metrics=metric('Temperatura',fmt(v.temperature,2)+' °C')+metric('Calor recibido',fmt(v.q)+' J')+metric('Capacidad térmica',fmt(v.capacity)+' J/°C');summary=`El cuerpo recibió ${fmt(v.q)} J y cambió ${fmt(v.delta)} °C. La pendiente Q/ΔT es su capacidad térmica.`;}
 if(cfg.id===2){const range=Math.max(100,Math.abs(params.heatRate*30),Math.abs(params.workRate*30),Math.abs((params.heatRate-params.workRate)*30));series=[['q','Q'],['w','W'],['u','ΔU']].map(([k,label],i)=>({label,points:history.map(h=>[h.t,h[k]]),dash:i?[6,3]:undefined}));options={xmax:30,ymin:-range,ymax:range,ylabel:'Energía intercambiada o cambio (J)'};metrics=metric('Q recibido',fmt(v.q)+' J')+metric('W realizado',fmt(v.w)+' J')+metric('ΔU = Q − W',fmt(v.u)+' J');summary=`Balance: ${fmt(v.q)} − (${fmt(v.w)}) = ${fmt(v.u)} J. ${params.workRate<0?'El trabajo negativo entrega energía al sistema.':''}`;}
 if(cfg.id===3){const end=contactEntropy({...params,time:60}),lo=Math.min(end.sa,end.sb,0),hi=Math.max(end.sa,end.sb,end.total,.1);series=[['sa','ΔS A'],['sb','ΔS B'],['total','ΔS total']].map(([k,label],i)=>({label,points:history.map(h=>[h.t,h[k]]),dash:i?[6,3]:undefined}));options={xmax:60,ymin:lo*1.1,ymax:hi*1.1,ylabel:'Cambio de entropía ΔS (J/K)'};metrics=metric('ΔS del conjunto',fmt(v.total,4)+' J/K')+metric('Producción actual',fmt(v.production,5)+' W/K')+metric('Equilibrio previsto',fmt(v.eq,2)+' °C');summary=`A: ${fmt(v.a,2)} °C. B: ${fmt(v.b,2)} °C. ΔS total = ${fmt(v.total,4)} J/K; la suma crece aunque uno de los cuerpos pierda entropía.`;}
 if(cfg.id===4){series=[{label:'S(T), modelo',points:Array.from({length:101},(_,i)=>[i/10,thirdLaw(i/10).entropy])},{label:'Estado explorado',points:[[v.temperature,v.entropy]],color:css('--b')}];options={xmax:10,ymax:.105,xlabel:'Temperatura absoluta T (K)',ylabel:'Entropía S (J/K)'};metrics=metric('Temperatura',fmt(v.temperature,3)+' K')+metric('Entropía del modelo',fmt(v.entropy,6)+' J/K')+metric('Capacidad térmica',fmt(v.capacity,6)+' J/K');summary='Exploramos un límite de una curva ideal de baja temperatura. No estamos calculando un proceso de refrigeración ni alcanzando 0 K.';}
 if(cfg.id===5){series=[{label:'Perfil estacionario',points:[[0,params.left],[1,params.right]]}];options={xmax:1,ymax:100,xlabel:'Posición x (m)',ylabel:'Temperatura (°C)'};metrics=metric('Potencia de izquierda a derecha',fmt(v.power,3)+' W')+metric('Flujo por área',fmt(v.flux,2)+' W/m²')+metric('Gradiente',fmt(v.gradient,2)+' °C/m');summary=`El perfil se mantiene fijo. Flujo ${v.power>0?'hacia la derecha':v.power<0?'hacia la izquierda':'nulo'}; potencia ${fmt(Math.abs(v.power),3)} W. Los reservorios sostienen el intercambio.`;}
 if(cfg.dimension){const s=state.diff,n=s.n,indices=cfg.dimension===3?sliceIndices():[0,Math.floor(n/2),0];const [ix,iy,iz]=indices,row=Array.from({length:n},(_,x)=>s.index(x,cfg.dimension>=2?iy:0,cfg.dimension===3?iz:0));series=[{label:'Inicial',points:row.map((i,x)=>[(x+.5)/n,state.initial[i]]),dash:[5,4],color:css('--dim')},{label:'Actual',points:row.map((i,x)=>[(x+.5)/n,s.field[i]]),color:css('--a')}];options={xmax:1,ymax:100,xlabel:'Posición x (m)',ylabel:'Temperatura (°C)',dots:false};metrics=metric('Mínima / máxima',fmt(v.min,2)+' / '+fmt(v.max,2)+' °C')+metric('Temperatura media',fmt(v.mean,5)+' °C','Se conserva con bordes aislados')+metric('Error de media',fmt(v.meanError,10)+' °C')+metric('Energía respecto de 20 °C',fmt(v.excessEnergy,3)+' J');summary=`t=${fmt(t,1)} s. Media ${fmt(v.mean,5)} °C. La zona caliente pierde temperatura y las vecinas ganan; la energía total se conserva. Malla ${n}${cfg.dimension>1?' × '+n:''}${cfg.dimension===3?' × '+n:''}.`;
 $('timeSection').hidden=false;const probe=Math.floor(n*.3),probeIndex=s.index(probe,cfg.dimension>=2?Math.floor(n/2):0,cfg.dimension===3?Math.floor(n/2):0);const probeHistory=history.map(h=>[h.t,h.probe]);drawTime(probeHistory);$('probeLabel').textContent=`Termómetro fijo en x=${fmt((probe+.5)/n,3)} m${cfg.dimension>=2?', y='+fmt((Math.floor(n/2)+.5)/n,3)+' m':''}${cfg.dimension===3?', z='+fmt((Math.floor(n/2)+.5)/n,3)+' m':''}. Los controles de corte no mueven este termómetro.`;
 }
 $('metrics').innerHTML=metrics;$('summary').textContent=summary;chart($('graph'),series,options);scenes(v);
 $('table').innerHTML=series.map(s=>`<tr><td>${s.label}</td><td>${fmt(s.points.at(-1)?.[0]??0,4)}</td><td>${fmt(s.points.at(-1)?.[1]??0,6)}</td></tr>`).join('');
 if(cfg.dimension)$('viewNote').textContent='Escala fija de color: 20 °C verde azulado → 80 °C naranja. Las temperaturas no se reescalan para exagerar la imagen.';
}
function drawTime(points){const oldLegend=$('legend').innerHTML;chart($('timeGraph'),[{label:'Termómetro fijo',points}],{xmax:120,ymin:0,ymax:100,xlabel:'Tiempo (s)',ylabel:'Temperatura (°C)'});$('legend').innerHTML=oldLegend;}
// Añadir el mismo termómetro a cada muestra numérica, independiente de la vista.
const baseSample=sample;sample=function(){baseSample();if(cfg.dimension){const s=state.diff,n=s.n;history.at(-1).probe=s.field[s.index(Math.floor(n*.3),cfg.dimension>=2?Math.floor(n/2):0,cfg.dimension===3?Math.floor(n/2):0)];}};
function frame(now){if(playing&&last!==null){const dt=Math.min(.25,Math.max(0,(now-last)/1000))*cfg.rate;tick(dt);paintTime+=dt;if(paintTime>.12||!playing){render();paintTime=0;}}last=now;requestAnimationFrame(frame);}
$('start').onclick=()=>{if(state.time>=cfg.duration)return;playing=!playing;last=null;$('settings').disabled=state.time>0||playing;$('start').textContent=playing?'Pausar':cfg.id===4?'Continuar recorrido':'Continuar';};$('reset').onclick=reset;
document.addEventListener('visibilitychange',()=>{if(document.hidden&&playing){playing=false;last=null;$('start').textContent='Continuar';}});
$('theme').onclick=()=>{const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('lemeit-theme',t);}catch{}render();};
try{const t=localStorage.getItem('lemeit-theme');document.documentElement.dataset.theme=t==='dark'?'dark':'light';}catch{}
controls();reset();requestAnimationFrame(frame);
// Herramientas de inspección de los resultados reales, sin avanzar el estado.
window.thermalCourse={snapshot:()=>({id:cfg.id,time:state.time,playing,params:{...params},current:current(),field:cfg.dimension?Array.from(state.diff.field):undefined,initialMean:state.diff?.initialMean,history:history.map(x=>({...x}))})};
})();
