import assert from 'node:assert/strict';
import {calorimetry,firstLaw,contactEntropy,thirdLaw,fourier,createDiffusion,advanceDiffusion,diffusionStep,diffusionStats} from './thermal-course-model.mjs';
const near=(a,b,tol=1e-9)=>assert(Math.abs(a-b)<=tol,`${a} != ${b}`);
near(calorimetry({mass:.1,c:1000,power:50,time:60}).temperature,50);
near(calorimetry({mass:.2,c:1000,power:50,time:60}).delta,15);
for(const heatRate of [-100,0,80])for(const workRate of [-50,0,100]){const s=firstLaw({heatRate,workRate,time:20});near(s.u,s.q-s.w);}
let prev=0;for(let time=0;time<=100;time+=.25){const s=contactEntropy({time});near(s.qa+s.qb,0,1e-8);assert(s.total>=-1e-12&&s.total>=prev-1e-12);assert(s.production>=-1e-12);prev=s.total;}
near(contactEntropy({a0:50,b0:50,time:60}).total,0);near(contactEntropy({cb:200,time:1000}).eq,40);
for(const t of [.2,1,5,10]){const e=thirdLaw(t),h=1e-5;near((thirdLaw(t+h).entropy-thirdLaw(t-h).entropy)/(2*h),e.capacity/t,1e-8);}
near(thirdLaw(0).entropy,0);near(thirdLaw(0).capacity,0);
near(fourier().power,.6);near(fourier({left:20,right:80}).power,-.6);near(fourier({left:50,right:50}).power,0);
for(const d of [1,2,3]){
 const s=createDiffusion({dimension:d});const initial=diffusionStats(s);let priorMax=initial.max,priorMin=initial.min;
 for(let i=0;i<30;i++){advanceDiffusion(s,2);const st=diffusionStats(s);near(st.mean,initial.mean,2e-12);assert(st.max<=priorMax+1e-10);assert(st.min>=priorMin-1e-10);priorMax=st.max;priorMin=st.min;}
 const uniform=createDiffusion({dimension:d});uniform.field.fill(42);advanceDiffusion(uniform,5);assert(uniform.field.every(t=>Math.abs(t-42)<1e-12));
 assert.throws(()=>diffusionStep(s,2*s.stableDt));
}
// Referencia analítica independiente: modo coseno en una barra aislada.
function error(n){const s=createDiffusion({dimension:1,n});for(let i=0;i<n;i++)s.field[i]=40+10*Math.cos(Math.PI*(i+.5)/n);advanceDiffusion(s,5);let sum=0;for(let i=0;i<n;i++){const expected=40+10*Math.cos(Math.PI*(i+.5)/n)*Math.exp(-s.alpha*Math.PI**2*5);sum+=(s.field[i]-expected)**2;}return Math.sqrt(sum/n);}
const coarse=error(24),fine=error(48);assert(fine<coarse*.4,`Convergencia: ${coarse} → ${fine}`);assert(fine<.002);
console.log('OK: calorimetría, primera ley, entropía creciente, relación dS/dT=C/T, Fourier, difusión conservativa 1D/2D/3D, máximo/mínimo, campo uniforme, control de estabilidad y convergencia frente a solución analítica.',{coarse,fine});
