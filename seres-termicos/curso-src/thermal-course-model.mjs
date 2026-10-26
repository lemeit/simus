// Modelos macroscópicos. Unidades SI; las diferencias en °C equivalen a K.
export function calorimetry({mass=.1,c=1000,power=100,time=0,t0=20}={}) {
  const q=power*time,capacity=mass*c;
  return {q,capacity,temperature:t0+q/capacity,delta:q/capacity};
}
export function firstLaw({heatRate=80,workRate=30,time=0}={}) {
  const q=heatRate*time,w=workRate*time;return {q,w,u:q-w};
}
export function contactEntropy({a0=80,b0=20,ca=100,cb=100,g=5,time=0}={}) {
  const eq=(ca*a0+cb*b0)/(ca+cb),diff=(a0-b0)*Math.exp(-g*(1/ca+1/cb)*time);
  const a=eq+cb/(ca+cb)*diff,b=eq-ca/(ca+cb)*diff;
  const sa=ca*Math.log((a+273.15)/(a0+273.15)),sb=cb*Math.log((b+273.15)/(b0+273.15));
  const power=g*(a-b),production=power*(1/(b+273.15)-1/(a+273.15));
  return {a,b,eq,sa,sb,total:sa+sb,production,power,qa:ca*(a-a0),qb:cb*(b-b0)};
}
// Modelo ilustrativo de baja T: C=beta*T^3; S(0)=0. No son datos medidos.
export function thirdLaw(temperature,beta=.0003) {
  return {temperature,capacity:beta*temperature**3,entropy:beta*temperature**3/3,energy:beta*temperature**4/4};
}
export function fourier({left=80,right=20,length=1,k=1,area=.01}={}) {
  const gradient=(right-left)/length,power=-k*area*gradient;
  return {gradient,power,flux:power/area,at:x=>left+(right-left)*x/length};
}
export function createDiffusion({dimension=1,n=dimension===1?48:dimension===2?28:16,alpha=.001,pattern='hot'}={}) {
  if(![1,2,3].includes(dimension)||!Number.isInteger(n)||n<2||!Number.isFinite(alpha)||alpha<=0)throw Error('Malla inválida');
  const size=n**dimension,field=new Float64Array(size),buffer=new Float64Array(size),h=1/n;
  const index=(x,y=0,z=0)=>x+n*y+n*n*z;
  let initialMean=0;
  for(let z=0;z<(dimension===3?n:1);z++)for(let y=0;y<(dimension>=2?n:1);y++)for(let x=0;x<n;x++){
    const r2=((x+.5)/n-.3)**2+(dimension>=2?((y+.5)/n-.5)**2:0)+(dimension===3?((z+.5)/n-.5)**2:0);
    const pulse=60*Math.exp(-r2/(2*.1**2));const t=pattern==='cold'?80-pulse:20+pulse;
    field[index(x,y,z)]=t;initialMean+=t/size;
  }
  return {dimension,n,size,h,alpha,field,buffer,index,time:0,initialMean,stableDt:.4*h*h/(dimension*alpha)};
}
export function diffusionStep(s,dt) {
  if(!Number.isFinite(dt)||dt<0||dt>s.stableDt*(1+1e-10))throw Error('Paso fuera del límite difusivo');
  const {n,dimension,field:a,buffer:b}=s,r=s.alpha*dt/(s.h*s.h);b.set(a);
  // Sólo caras interiores: cada transferencia sale de una celda y entra en su vecina.
  for(let z=0;z<(dimension===3?n:1);z++)for(let y=0;y<(dimension>=2?n:1);y++)for(let x=0;x<n;x++){
    const i=s.index(x,y,z);
    if(x+1<n){const q=r*(a[i+1]-a[i]);b[i]+=q;b[i+1]-=q;}
    if(dimension>=2&&y+1<n){const q=r*(a[i+n]-a[i]);b[i]+=q;b[i+n]-=q;}
    if(dimension===3&&z+1<n){const q=r*(a[i+n*n]-a[i]);b[i]+=q;b[i+n*n]-=q;}
  }
  s.field=b;s.buffer=a;s.time+=dt;
}
export function advanceDiffusion(s,dt) {
  if(!Number.isFinite(dt)||dt<0)throw Error('Intervalo inválido');
  const steps=Math.max(1,Math.ceil(dt/s.stableDt));for(let i=0;i<steps;i++)diffusionStep(s,dt/steps);
}
export function diffusionStats(s) {
  let min=Infinity,max=-Infinity,sum=0;for(const t of s.field){min=Math.min(min,t);max=Math.max(max,t);sum+=t;}
  const mean=sum/s.size;return {min,max,mean,meanError:mean-s.initialMean,excessEnergy:1000*(mean-20)};
}
