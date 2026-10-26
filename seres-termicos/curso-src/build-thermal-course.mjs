import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {activities} from './thermal-course-config.mjs';
const root=path.dirname(fileURLToPath(import.meta.url));
const out=process.argv[2]?path.resolve(process.argv[2]):path.resolve(root,'..');
fs.mkdirSync(out,{recursive:true});
const template=fs.readFileSync(path.join(root,'thermal-course-template.html'),'utf8');
const model=fs.readFileSync(path.join(root,'thermal-course-model.mjs'),'utf8').replace(/^export /gm,'');
const mathMap=JSON.parse(fs.readFileSync(path.join(root,'thermal-course-math.json'),'utf8'));
const app=fs.readFileSync(path.join(root,'thermal-course-app.js'),'utf8');
const names=JSON.parse(fs.readFileSync(path.join(root,'narrative-map.json'),'utf8'));
const nameFor=file=>names.find(x=>x.file===file);
for(const a of activities){a.title=nameFor(a.file).title;a.label=nameFor(a.file).label;}
const all=[{id:0,...nameFor('v00-contacto-termico.html')},...activities];
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
for(const a of activities){const replacements={
 TITLE:esc(a.title),STEP:a.label,INTRO:a.intro,GRAPH_TITLE:a.graph,EQUATIONS:mathMap[String(a.id)],QUESTION:a.question,DETAILS:a.details,SOURCE:a.source,
 CLOCK_NOTE:a.id===4?'El botón recorre la curva en 30 s de presentación. Esa duración no es un tiempo físico de enfriamiento.':`Reloj simulado: ${a.rate} s por cada segundo de reproducción, hasta ${a.duration} s. La rapidez del dibujo no modifica el modelo.`,
 OPTIONS:all.map(x=>`<option value="${x.file}"${a.id===x.id?' selected':''}>${x.label} · ${esc(x.title)}</option>`).join(''),
 PREV:`<a href="${all[a.id-1].file}">← ${esc(all[a.id-1].title)}</a>`,NEXT:a.id<8?`<a href="${all[a.id+1].file}">${esc(all[a.id+1].title)} →</a>`:'<a href="seres_termicos_V4_6.html">Resistir hasta agotarse →</a>',
 SCRIPT:`const COURSE_CONFIG=${JSON.stringify(a)};\n${model}\n${app}\ndocument.getElementById('navigation').addEventListener('change',e=>location.href=e.target.value);`
 };let html=template.replace(/__([A-Z_]+)__/g,(_,k)=>{if(!(k in replacements))throw Error(k);return replacements[k];});
 fs.writeFileSync(path.join(out,a.file),html,'utf8');}
const cards=all.map(a=>`<a class="card" href="${a.file}"><span>${a.label}</span><h2>${esc(a.title)}</h2><p>${a.intro||'Dos cuerpos, dos curvas T(t), dirección de calor y conservación de energía.'}</p><b>Abrir actividad →</b></a>`).join('');
fs.writeFileSync(path.join(out,'termodinamica.html'),`<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Un relato de temperaturas</title><style>:root{--bg:#FAF7F2;--panel:#fff;--text:#2A211A;--dim:#6B5C4E;--accent:#9B3D00;--border:#E0D9CC}@media(prefers-color-scheme:dark){:root{--bg:#1A1612;--panel:#221E18;--text:#F2ECE4;--dim:#C9BEB2;--accent:#D9691F;--border:#3D3028}}*{box-sizing:border-box}body{margin:0;background:var(--bg);color:var(--text);font:16px/1.5 system-ui}main{max-width:1050px;margin:auto;padding:24px}h1{font-size:clamp(1.8rem,5vw,2.7rem);line-height:1.15}p{color:var(--dim)}.grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:16px}.card{background:var(--panel);border:1px solid var(--border);border-radius:12px;padding:20px;text-decoration:none;color:var(--text)}.card span,.card b,a{color:var(--accent)}.card:hover{border-color:var(--accent)}.card:focus-visible{outline:3px solid #009688;outline-offset:3px}h2{font-size:1.2rem}footer{margin-top:24px;font-size:.85rem}</style></head><body><main><p>Seres Térmicos · Literatura, física y simulación</p><h1>Del relato<br>a la física.</h1><p>A partir de «Los seres térmicos», de Jorge Luis Borges y Margarita Guerrero, este proyecto explora el encuentro entre literatura, física y simulación. La imagen de seres hechos de temperaturas cambiantes abre una pregunta: ¿cómo representar esas formas y qué leyes o hipótesis podrían sostenerlas?</p><p><a href="https://tavapy.gov.py/biblioteca/wp-content/uploads/2023/01/BorgesJ-El-libro-de-los-seres-imaginarios.pdf#page=62" target="_blank" rel="noopener">Leer el texto de Borges y Margarita Guerrero · PDF, página 62 →</a></p><p>Podés entrar por la lectura o por una experiencia sencilla. Los primeros actos construyen las ideas físicas que después aparecen en el bestiario. Cada actividad se puede explorar por separado, con una gráfica, una pregunta y pocos controles.</p><div class="grid">${cards}</div><footer><p>La tercera ley usa una curva conceptual de baja temperatura; no es un proceso real de refrigeración. Las demás páginas declaran sus modelos y supuestos. Se conserva como complemento la <a href="v00-temperatura.html">recta estacionaria original</a>.</p><a href="https://profe.lemeit.ar/projects/seres-termicos/">Volver al proyecto</a></footer></main></body></html>`);
console.log('Generadas ocho actividades autónomas y el índice del recorrido en '+out);
