<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="theme-color" content="#14161a" id="metaTheme">
<title>Seres Térmicos — lemeit</title>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">

<!-- oscuro por defecto (antes del theme: sirven de fallback si el CDN no responde) -->
<style>
:root{
  --lm-bg:#14161a;--lm-surface:#1c1f24;--lm-surface-2:#24272d;--lm-border:#2c3038;
  --lm-text:#e8e6e1;--lm-dim:#9a978f;--lm-accent:#ffa14f;--lm-good:#4db6ac;
  --lm-moderate:#d9a441;--lm-bad:#e57373
}
</style>

<link rel="stylesheet" href="https://design.lemeit.ar/lemeit-theme.css">

<style>
/* ---------- las dos paletas del landing (ganan sobre el theme por orden + especificidad) ---------- */
:root{
  --lm-bg:#14161a;--lm-surface:#1c1f24;--lm-surface-2:#24272d;--lm-border:#2c3038;
  --lm-text:#e8e6e1;--lm-dim:#9a978f;--lm-accent:#ffa14f;--lm-good:#4db6ac;
  --lm-moderate:#d9a441;--lm-bad:#e57373
}
:root[data-theme="light"]{
  --lm-bg:#f7f5f1;--lm-surface:#ffffff;--lm-surface-2:#efebe4;--lm-border:#ddd7cd;
  --lm-text:#262220;--lm-dim:#6e6860;--lm-accent:#D9691F;--lm-good:#1f8a78;
  --lm-moderate:#b8860b;--lm-bad:#c0504d
}

*{box-sizing:border-box;margin:0;padding:0}
*{transition:background-color .22s ease,border-color .22s ease,color .22s ease}
body{
  background:var(--lm-bg);color:var(--lm-text);
  font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;
  min-height:100vh;display:flex;flex-direction:column;align-items:center;
  padding:56px 20px 40px;line-height:1.5;
}
.wrap{width:100%;max-width:880px}

/* ---------- header + toggle ---------- */
.overline-row{display:flex;align-items:center;gap:12px;margin-bottom:10px}
.overline{font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.28em;
  color:var(--lm-dim);text-transform:uppercase}
.toggle{
  margin-left:auto;display:inline-flex;align-items:center;gap:7px;cursor:pointer;
  font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:.1em;
  color:var(--lm-dim);background:var(--lm-surface);border:1px solid var(--lm-border);
  border-radius:20px;padding:6px 14px;user-select:none;
}
.toggle:hover{border-color:var(--lm-accent);color:var(--lm-accent)}
h1{font-size:26px;font-weight:600;letter-spacing:-.01em}
.lede{margin-top:10px;max-width:640px;color:var(--lm-dim);font-size:14.5px}
.epigrafe{
  margin:22px 0 8px;padding:14px 18px;max-width:560px;
  border-left:2px solid var(--lm-accent);background:var(--lm-surface);
  font-style:italic;font-size:13.5px;color:var(--lm-dim);
}
.epigrafe cite{display:block;margin-top:8px;font-style:normal;
  font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:.14em;
  color:var(--lm-dim);opacity:.7}

/* ---------- líneas ---------- */
section{margin-top:44px}
.linea-head{
  display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;
  border-bottom:1px solid var(--lm-border);padding-bottom:10px;margin-bottom:16px;
}
.linea-num{font-family:'JetBrains Mono',monospace;font-size:12px;font-weight:700;
  color:var(--lm-accent);letter-spacing:.06em}
.linea-nombre{font-size:15px;font-weight:600}
.linea-pregunta{font-size:12.5px;font-style:italic;color:var(--lm-dim);margin-left:auto;text-align:right}

/* ---------- cards ---------- */
.grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(255px,1fr));gap:12px}
.sim{
  display:flex;flex-direction:column;text-decoration:none;color:inherit;
  background:var(--lm-surface);border:1px solid var(--lm-border);border-radius:10px;
  padding:16px 18px;transition:border-color .15s,transform .15s,background-color .22s;
}
.sim:hover{border-color:var(--lm-accent);transform:translateY(-2px)}
.sim-head{display:flex;align-items:baseline;gap:9px;margin-bottom:7px}
.ver{font-family:'JetBrains Mono',monospace;font-size:10px;font-weight:700;
  color:var(--lm-accent);letter-spacing:.05em}
.sim-name{font-size:13.5px;font-weight:600}
.sim-desc{font-size:11.5px;color:var(--lm-dim);line-height:1.55;flex:1}

.chips{display:flex;flex-wrap:wrap;gap:5px;margin-top:12px}
.chip{display:inline-flex;font-family:'JetBrains Mono',monospace;font-size:8.5px;
  border-radius:3px;overflow:hidden;line-height:1.4}
.chip b{font-weight:500;background:var(--lm-surface-2);color:var(--lm-dim);padding:2px 6px}
.chip span{padding:2px 6px;background:rgba(77,182,172,.12);color:var(--lm-good)}
.chip.ln span{background:rgba(255,161,79,.14);color:var(--lm-accent)}

/* ---------- footer ---------- */
footer{margin-top:56px;padding-top:18px;border-top:1px solid var(--lm-border);
  font-family:'JetBrains Mono',monospace;font-size:10px;color:var(--lm-dim);
  display:flex;flex-wrap:wrap;gap:6px 24px}
footer a{color:var(--lm-dim);text-decoration:none;border-bottom:1px solid var(--lm-border)}
footer a:hover{color:var(--lm-accent);border-color:var(--lm-accent)}
</style>
</head>
<body>
<main class="wrap">

  <header>
    <div class="overline-row">
      <p class="overline">lemeit · física computacional</p>
      <button class="toggle" id="themeToggle" type="button" title="cambiar tema"></button>
    </div>
    <h1>Seres Térmicos</h1>
    <p class="lede">Un texto de Borges convertido en laboratorio de hipótesis físicas:
    cinco líneas de simulación que exploran qué significa ser «un organismo hecho
    de temperaturas cambiantes». Todas corren en el navegador.</p>
    <blockquote class="epigrafe">
      «…un ciego y sordo e impalpable conjunto de calores y fríos articulados.»
      <cite>J. L. BORGES (CON M. GUERRERO) · EL LIBRO DE LOS SERES IMAGINARIOS · 1957</cite>
    </blockquote>
  </header>

  <section>
    <div class="linea-head">
      <span class="linea-num">I</span>
      <span class="linea-nombre">El campo que disuelve</span>
      <span class="linea-pregunta">¿qué puede el calor solo?</span>
    </div>
    <div class="grid">
      <a class="sim" href="seres-termicos/index.html">
        <div class="sim-head"><span class="ver">v01</span><span class="sim-name">El campo</span></div>
        <p class="sim-desc">Seres como fuentes gaussianas sobre la ecuación del calor. La hipótesis mínima: estructuras que nacen y se disuelven hacia el equilibrio.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>I</span></span><span class="chip"><b>render</b><span>Canvas 2D</span></span><span class="chip"><b>física</b><span>∂T/∂t = α∇²T</span></span></div>
      </a>
      <a class="sim" href="seres-termicos/v02-gradiente.html">
        <div class="sim-head"><span class="ver">v02</span><span class="sim-name">Gradiente</span></div>
        <p class="sim-desc">Los seres leen ∇T y responden al campo. Acoplamiento bidireccional: el medio empieza a importar.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>I</span></span><span class="chip"><b>render</b><span>Canvas 2D</span></span><span class="chip"><b>física</b><span>F ∝ ∇T</span></span></div>
      </a>
    </div>
  </section>

  <section>
    <div class="linea-head">
      <span class="linea-num">II</span>
      <span class="linea-nombre">La vida que emerge</span>
      <span class="linea-pregunta">¿vida sin individuos?</span>
    </div>
    <div class="grid">
      <a class="sim" href="seres-termicos/v04-grayscott.html">
        <div class="sim-head"><span class="ver">v04</span><span class="sim-name">Gray-Scott</span></div>
        <p class="sim-desc">Reacción-difusión no lineal: manchas que nacen, se dividen y compiten por el sustrato. Vida genuina — sin individuos contables.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>II</span></span><span class="chip"><b>render</b><span>Canvas 2D</span></span><span class="chip"><b>física</b><span>uv²</span></span></div>
      </a>
      <a class="sim" href="seres-termicos/v05-fhn.html">
        <div class="sim-head"><span class="ver">v05</span><span class="sim-name">FitzHugh-Nagumo</span></div>
        <p class="sim-desc">Espirales perpetuas: la multitud que nunca se detiene. Textura infinita, conjunto imposible.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>II</span></span><span class="chip"><b>render</b><span>Canvas 2D</span></span><span class="chip"><b>física</b><span>activador–inhibidor</span></span></div>
      </a>
    </div>
  </section>

  <section>
    <div class="linea-head">
      <span class="linea-num">III</span>
      <span class="linea-nombre">Los individuos</span>
      <span class="linea-pregunta">¿qué es un conjunto contable?</span>
    </div>
    <div class="grid">
      <a class="sim" href="seres-termicos/v06-ciclovida.html">
        <div class="sim-head"><span class="ver">v06</span><span class="sim-name">Ciclo de vida — 2D</span></div>
        <p class="sim-desc">Presupuesto energético individual: nacimiento por fluctuación del vacío, metabolismo, reproducción y muerte. Gráficas de población en tiempo real.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>III</span></span><span class="chip"><b>render</b><span>Canvas 2D</span></span><span class="chip"><b>física</b><span>dE/dt = −μ</span></span></div>
      </a>
    </div>
  </section>

  <section>
    <div class="linea-head">
      <span class="linea-num">IV</span>
      <span class="linea-nombre">La anatomía</span>
      <span class="linea-pregunta">¿qué es un cuerpo articulado?</span>
    </div>
    <div class="grid">
      <a class="sim" href="seres-termicos/bestiario.html">
        <div class="sim-head"><span class="ver">B1</span><span class="sim-name">Bestiario — organismos articulados</span></div>
        <p class="sim-desc">Cadena de órganos con difusión interna, fuego innato y cinco niveles de existencia que son equilibrios termodinámicos. Termotaxis, fichas de zoología fantástica, crónica de ascensos.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>IV</span></span><span class="chip"><b>render</b><span>Canvas 2D + bloom</span></span><span class="chip"><b>física</b><span>Fourier → conducta</span></span></div>
      </a>
    </div>
  </section>

  <section>
    <div class="linea-head">
      <span class="linea-num">V</span>
      <span class="linea-nombre">El cosmos</span>
      <span class="linea-pregunta">¿dónde viven, cómo se ven en 4D?</span>
    </div>
    <div class="grid">
      <a class="sim" href="seres-termicos/v07-3d.html">
        <div class="sim-head"><span class="ver">v07</span><span class="sim-name">Esfera 3D — el dios y el ser</span></div>
        <p class="sim-desc">Campo 3D confinado en una esfera de plasma. Ray marching volumétrico y doble perspectiva: vista exterior del creador + interior desde un ser. Rotar con mouse · Tab cambia de ser.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>V</span></span><span class="chip"><b>render</b><span>WebGL2</span></span><span class="chip"><b>grilla</b><span>64×48×32</span></span></div>
      </a>
      <a class="sim" href="seres-termicos/v08-espaciotiempo.html">
        <div class="sim-head"><span class="ver">v08</span><span class="sim-name">Espaciotiempo — worldtubes</span></div>
        <p class="sim-desc">El campo 2D acumulado en el tiempo forma un volumen 3D: cada ser es un tubo. Nacimiento = inicio, muerte = fin, reproducción = bifurcación. Rotar con mouse · Espacio pausa.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>V</span></span><span class="chip"><b>render</b><span>WebGL2</span></span><span class="chip"><b>física</b><span>T(x,y,τ)</span></span></div>
      </a>
      <a class="sim" href="seres-termicos/v03-raymarching.html">
        <div class="sim-head"><span class="ver">v03</span><span class="sim-name">Ray marching — base técnica</span></div>
        <p class="sim-desc">El campo 3D como volumen: el antecedente técnico del render volumétrico de v07.</p>
        <div class="chips"><span class="chip ln"><b>línea</b><span>V</span></span><span class="chip"><b>render</b><span>WebGL2</span></span></div>
      </a>
    </div>
  </section>

  <footer>
    <span>documentación · <a href="https://profe.lemeit.ar/projects/seres-termicos/">profe.lemeit.ar</a></span>
    <span>código · <a href="https://github.com/lemeit/simus">github.com/lemeit/simus</a></span>
    <span>diseño · <a href="https://design.lemeit.ar">design.lemeit.ar</a></span>
  </footer>

</main>

<script>
/* ---------- tema: localStorage → prefers-color-scheme → oscuro ---------- */
(function(){
  const KEY='lemeit-theme';
  const saved=localStorage.getItem(KEY);
  const mode=saved||
    (matchMedia('(prefers-color-scheme: light)').matches?'light':'dark');
  document.documentElement.dataset.theme=mode;

  const btn=document.getElementById('themeToggle');
  const meta=document.getElementById('metaTheme');

  function pintar(m){
    btn.textContent=m==='light'?'🌙 noche':'☀️ día';
    btn.title=m==='light'?'cambiar a modo noche':'cambiar a modo día';
    meta.content=m==='light'?'#f7f5f1':'#14161a';
  }
  pintar(mode);

  btn.addEventListener('click',()=>{
    const nuevo=document.documentElement.dataset.theme==='light'?'dark':'light';
    document.documentElement.dataset.theme=nuevo;
    localStorage.setItem(KEY,nuevo);
    pintar(nuevo);
  });
})();
</script>
</body>
</html>