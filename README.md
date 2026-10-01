# Seres Térmicos — Documentación del proyecto

Experimento computacional de física y literatura.
Partida de un texto de Borges; destino: emergencia, vida y muerte en un campo de reacción-difusión.

---

## El texto de partida

> "cada hombre, cada ser, era un organismo hecho de temperaturas cambiantes.
> La humanidad de la época saturnina fue un ciego y sordo e impalpable
> conjunto de calores y fríos articulados."
>
> — Jorge Luis Borges (con Margarita Guerrero), «Seres Térmicos»,
> *El libro de los seres imaginarios* (FCE, 1957; ed. ampliada 1967)

Borges describe una cosmología imaginaria (derivada de Rudolf Steiner) en la que los seres
no tienen cuerpo sólido, líquido ni gaseoso. Son únicamente **formas térmicas**: distribuciones
de calor y frío que se articulan en el espacio cósmico.

La pregunta que guía este proyecto:

> ¿Podemos convertir esa metáfora en un sistema dinámico computacional?
> ¿Qué aspecto tendría un organismo cuya única realidad fuera su estado térmico?

---

## El límite de la física lineal

El primer intento usa la **ecuación del calor**:

 $$\frac{\partial T}{\partial t} = \alpha \nabla^2 T$$ 
Esta ecuación describe cómo se difunde el calor en un medio. Es elegante y
correcta para describir difusión, pero tiene un problema fundamental:
**es lineal**. Todo sistema regido por ella evoluciona inevitablemente hacia
el equilibrio térmico. Las estructuras se disuelven. No puede haber organismos,
porque no hay nada que los mantenga lejos del equilibrio.

Con fuentes externas (los "seres" como gaussianas) y acoplamiento al gradiente ∇T:

 $$\vec{F}_i = -\text{type}_i \cdot k \cdot \nabla T(\vec{x}_i)$$ 
se obtiene movimiento más interesante, pero los "seres" siguen siendo
**objetos programados** que se mueven en un campo pasivo. No emergen.
No se reproducen. No mueren espontáneamente.

---

## El salto: estructuras disipativas y no linealidad

**Ilya Prigogine** (Premio Nobel de Química, 1977) demostró que los sistemas
lejos del equilibrio termodinámico pueden **auto-organizarse**:
mantener estructuras ordenadas consumiendo energía del entorno. Llamó a
estas estructuras *disipativas*.

Ejemplos reales: las células de Bénard (convección), el oscilador de
Belousov-Zhabotinsky, y —en última instancia— los seres vivos.

La condición necesaria es:

 $$\sigma_{\text{interna}} < \dot{S}_{\text{exportada}}$$ 
El sistema genera entropía internamente, pero la exporta al entorno
más rápido de lo que la acumula. Mientras eso ocurra, la estructura existe.
Cuando deja de ocurrir, se disuelve.

Para modelar esto computacionalmente se necesitan tres ingredientes que
la ecuación del calor no tiene:

1. **No linealidad** — términos como $uv^2$ (autocatálisis)
2. **Dos campos acoplados** — un activador y un inhibidor
3. **Fuente de energía externa** — que mantenga el sistema lejos del equilibrio

---

## La física que sí produce vida: Gray-Scott (1984)

Las ecuaciones de reacción-difusión de Gray-Scott son:

 $$\frac{\partial u}{\partial t} = D_u \nabla^2 u \;-\; uv^2 \;+\; F(1-u)$$ 
 $$\frac{\partial v}{\partial t} = D_v \nabla^2 v \;+\; uv^2 \;-\; (F+k)\,v$$ 
### Variables

| Variable | Interpretación física | Interpretación poética |
|----------|----------------------|----------------------|
| $u(x,y,t)$ | Concentración del sustrato (alimento) | El vacío cósmico, fuente de energía |
| $v(x,y,t)$ | Concentración del producto (organismo) | El ser térmico |

### Términos

| Término | Ecuación | Significado |
|---------|----------|-------------|
| $D_u \nabla^2 u$ | en $\partial u/\partial t$ | El sustrato difunde en el espacio |
| $D_v \nabla^2 v$ | en $\partial v/\partial t$ | El organismo difunde (se mueve) |
| $-uv^2$ | en $\partial u/\partial t$ | El organismo *consume* sustrato |
| $+uv^2$ | en $\partial v/\partial t$ | El organismo se *reproduce* usando sustrato (autocatálisis) |
| $F(1-u)$ | en $\partial u/\partial t$ | El sustrato se *repone* desde el exterior (feed rate) |
| $-(F+k)v$ | en $\partial v/\partial t$ | El organismo *muere* a tasa $k$ |

El término clave es $uv^2$: para que $v$ se reproduzca necesita encontrar
 $u$ (alimento). Si no hay alimento, $v$ desaparece. Este es el mecanismo
de competencia y extinción.

### Mapa de comportamientos según (F, k)

Los parámetros $F$ (reposición de alimento) y $k$ (muerte) determinan
qué tipo de organismo emerge:

| F | k | Comportamiento |
|---|---|----------------|
| 0.035 | 0.065 | Manchas que se dividen (reproducción) |
| 0.055 | 0.062 | Patrones coralinos, filamentos |
| 0.025 | 0.055 | Manchas estables, pulsan |
| 0.037 | 0.060 | Auto-replicación caótica |
| 0.060 | 0.062 | Laberintos, ondas espirales |

No hay seres "programados". Con la misma ecuación y distintos parámetros
emergen organismos completamente diferentes.

---

## Ciclo de vida emergente (Gray-Scott, v04)

Con Gray-Scott los seres tienen un ciclo de vida real — **emergente**: ninguna
de estas etapas está programada, todas salen de $uv^2$ y de la competencia
entre difusión y reacción:

- **NACIMIENTO** — fluctuación local de $v$ supera un umbral (perturbación inicial o espontánea)
- **CRECIMIENTO** — $v$ se expande consumiendo $u$ en su entorno; la velocidad depende de la disponibilidad de alimento
- **REPRODUCCIÓN** — cuando $v$ crece demasiado, la zona central se agota → la mancha se divide en dos (mitosis química)
- **COMPETENCIA** — dos manchas compiten por el $u$ disponible entre ellas; si el espacio es limitado, una puede absorber o eliminar a la otra
- **MUERTE** — cuando el $u$ local cae a cero, $v$ no puede sostenerse; la mancha se disuelve → campo uniforme $u=1,\; v=0$ - **EXTINCIÓN** — si $k$ es demasiado alto o $F$ demasiado bajo, todas las manchas mueren y el sistema llega al equilibrio

---

## Relación con el cuento de Borges

La descripción de Borges es notablemente precisa como metáfora física:

| Borges | Gray-Scott |
|--------|-----------|
| "organismo hecho de temperaturas cambiantes" | $v(x,y,t)$: concentración que fluctúa en el tiempo |
| "calores y fríos articulados" | los dos campos $u$ y $v$ acoplados |
| "ciego y sordo e impalpable" | no hay geometría fija; la forma es el estado instantáneo del campo |
| etapa saturnina: solo calor, sin materia sólida | campo continuo sin partículas discretas |
| "el calor es una sustancia más sutil que un gas" | $v$ como campo de concentración: no es un objeto, es una distribución |

La diferencia con Borges/Steiner:
en la física moderna el calor no es una sustancia (esa era la teoría del *calórico*, descartada en el siglo XIX).
Pero la imagen de **un ser que es solo una distribución en un campo continuo**
coincide exactamente con lo que Gray-Scott produce: no hay objeto, hay un
patrón de concentración que se mantiene, crece, se divide y desaparece.

---

## Por qué corre todo esto en un HTML

La ecuación del calor parece compleja en forma continua. Pero al discretizarla sobre una grilla, se convierte en **aritmética pura**:

  $$T_{i,j}^{n+1} = T_{i,j}^n + k\,\underset{\text{laplaciano discreto}}{\left(T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4T_{i,j}^n\right)} - \lambda\,T_{i,j}^n$$

Por celda: 4 lecturas + 4 sumas + 2 multiplicaciones = **~10 operaciones**. Con una grilla 280×200 = 56.000 celdas a 120 pasos/segundo:

 $$56.000 \times 120 \times 10 \approx 67 \text{ Mflops/s}$$ 
Un CPU moderno hace **10.000 Mflops/s**. Usamos menos del 1% de su capacidad. La dificultad de las EDPs vive en el análisis matemático. Numéricamente son loops sobre arrays.

---

## Desarrollo completo de las ecuaciones

### 1. El campo térmico con fuentes y amortiguación

La ecuación que gobierna todo el sistema es:

 $$\frac{\partial T}{\partial t} = \alpha \nabla^2 T \;-\; \lambda T \;+\; \sum_i S_i(x,y,t)$$ 
| Término | Significado físico |
|---|---|
| $\alpha \nabla^2 T$ | Difusión: calor fluye de zonas calientes a frías |
| $-\lambda T$ | Amortiguación: el vacío vuelve a T=0 sin seres |
| $\Sigma S_i$ | Fuentes: cada ser inyecta (o extrae) calor |

### 2. El Laplaciano discreto (stencil de 5 puntos en 2D)

 $$\nabla^2 T_{i,j} \approx \frac{T_{i+1,j} + T_{i-1,j} - 2T_{i,j}}{\Delta x^2} + \frac{T_{i,j+1} + T_{i,j-1} - 2T_{i,j}}{\Delta y^2}$$ 
Con $\Delta x = \Delta y = 1$ (unidades de grilla):

 $$\nabla^2 T_{i,j} = T_{i+1,j} + T_{i-1,j} + T_{i,j+1} + T_{i,j-1} - 4T_{i,j}$$ 
En 3D el stencil tiene 7 puntos (6 vecinos + centro):

 $$\nabla^2 T_{i,j,k} = T_{i\pm1,j,k} + T_{i,j\pm1,k} + T_{i,j,k\pm1} - 6T_{i,j,k}$$ 

### 3. La fuente gaussiana de cada ser

  $$S_i(x,y) = \underset{\text{amplitud}}{\frac{E_i}{E_0}} \cdot A \cdot \underset{\text{cuerpo gaussiano}}{e^{-\frac{(x-x_i)^2+(y-y_i)^2}{2\sigma_i^2}}} \cdot \underset{\text{pulso vital}}{\left[1 + a\sin(\omega_i t + \phi_i)\right]}$$ 
El exponencial define la forma espacial del ser ("cuerpo impalpable"). El factor $E_i/E_0$ hace que el cuerpo se apague gradualmente conforme el ser pierde energía y muere.

### 4. Dinámica energética: el metabolismo

 $$\frac{dE_i}{dt} = -\mu$$ 
Integrado explícitamente (Euler) cada paso de tiempo $\Delta t$:

 $$E_i^{n+1} = E_i^n - \mu \cdot \Delta t$$ 
Sin recarga. El tiempo de vida máximo es $t_{\text{vida}} = E_0 / \mu$.

### 5. Condiciones del ciclo de vida

 $$\text{Nacimiento:} \quad P(\text{nuevo ser por paso}) = p_{\text{birth}}$$ 
 $$\text{Reproducción:} \quad E_i > r \cdot E_0 \;\Rightarrow\; E_i \to 0.6 E_0, \quad \text{crear hijo con } E_{\text{hijo}} = 0.4 E_0$$ 
 $$\text{Muerte:} \quad E_i \leq 0 \;\Rightarrow\; \text{eliminar ser, campo absorbe calor residual}$$ 

### 6. El esquema numérico completo (Euler explícito)

 $$T_{i,j}^{n+1} = T_{i,j}^n + k \cdot \left(T_{i+1,j}^n + T_{i-1,j}^n + T_{i,j+1}^n + T_{i,j-1}^n - 4T_{i,j}^n\right) - \lambda \Delta t \cdot T_{i,j}^n + \Delta t \cdot \sum_i S_i(i,j)$$ 
donde $k = \alpha \cdot \Delta t / \Delta x^2$.

**Condición de estabilidad de von Neumann (2D):**

 $$k \leq \frac{1}{4} \quad \Rightarrow \quad \Delta t \leq \frac{\Delta x^2}{4\alpha}$$ 
**En 3D** la condición es más estricta:

 $$k \leq \frac{1}{6} \quad \Rightarrow \quad \Delta t \leq \frac{\Delta x^2}{6\alpha}$$ 
En el código, $k = \alpha \cdot 0.10$, lo que da $k_{\max} = 0.04 \ll 1/6$. Muy estable.

---

## Por qué Gray-Scott y FHN no son suficientes para Borges

Tanto Gray-Scott como FitzHugh-Nagumo producen patrones emergentes genuinamente no lineales.
Pero ambos tienen un problema conceptual respecto al cuento:

- **Gray-Scott** puede estabilizarse. Las manchas alcanzan un estado estático y se detienen.
  El campo es colectivo: no hay individuos distinguibles.

- **FitzHugh-Nagumo** nunca se detiene, pero produce baldosas infinitas de espirales.
  Tampoco hay individuos: es una *multitud* uniforme, no un conjunto articulado de seres.

Borges no describe una textura. Describe *seres*: entidades que nacen, existen brevemente
y mueren en el vacío cósmico. El "ciego y sordo e impalpable **conjunto**" implica que
cada elemento puede *contarse*. Eso requiere un modelo diferente.

---

## Enfoque B: presupuesto energético explícito

En lugar de una PDE global que genera patrones, cada ser tiene su propia variable interna de energía.

### Ecuaciones del ciclo de vida

**Campo de fondo** (vacío cósmico con seres como fuentes):

 $$\frac{\partial T}{\partial t} = \alpha \nabla^2 T \;-\; \lambda T \;+\; \sum_i S_i(x,y)$$ 
- $\lambda T$: el vacío vuelve a cero sin seres que lo mantengan
- $S_i$: cada ser inyecta calor/frío proporcional a su energía

**Fuente del ser $i$** (su "cuerpo" térmico):

 $$S_i(x,y) = \frac{E_i}{E_0} \cdot A \cdot \exp\!\left(-\frac{|\mathbf{r}-\mathbf{r}_i|^2}{2\sigma_i^2}\right) \cdot [1 + a\sin(\omega_i t + \phi_i)]$$ 
El factor oscilatorio hace que cada ser "pulse" a su propia frecuencia (vida interna).

**Drenaje energético** (metabolismo constante):

 $$\frac{dE_i}{dt} = -\mu$$ 
La energía se consume simplemente por existir. No hay forma de recargarla desde afuera: cada ser tiene un tiempo de vida acotado desde el nacimiento.

### Ciclo de vida explícito (Enfoque B, v06)

A diferencia del ciclo emergente de Gray-Scott, estas etapas **están programadas**
como reglas sobre la energía individual:

- **NACIMIENTO** — fluctuación aleatoria en el vacío → nuevo ser con $E_i = E_0$ - **EXISTENCIA** — el ser inyecta su gaussiana térmica en el campo $T$; su "cuerpo" es visible mientras $E_i > 0$ - **METABOLISMO** — $E_i$ decrece a tasa $\mu$ en cada paso de tiempo; el ser pulsa, se mueve por deriva + ruido
- **REPRODUCCIÓN** — si $E_i > 2E_0$ → se divide en dos seres (el campo recibe dos cuerpos más pequeños)
- **MUERTE** — cuando $E_i \leq 0$ → el ser se elimina; deja de inyectar calor → su cuerpo se disipa (el vacío absorbe el calor residual por $\lambda T$)

### Diferencia fundamental con los enfoques anteriores

| Propiedad | Gray-Scott / FHN | Enfoque B |
|-----------|-----------------|-----------|
| Individuos distinguibles | No | Sí |
| Ciclo de vida programado | No (emerge) | Sí (explícito) |
| Puede haber 0 seres | No | Sí (vacío total) |
| Puede haber 3 seres | No (mínimo una textura) | Sí |
| "Conjunto articulado" de Borges | No | Sí |

La diferencia conceptual: Gray-Scott y FHN producen *campo* que se auto-organiza.
El Enfoque B produce *individuos* que habitan un campo pasivo.
Los seres no emergen de las ecuaciones; las ecuaciones describen cómo cada ser nace y muere.

---

## Organismos articulados — Línea BESTIARIO (B1)

El Enfoque B resuelve los individuos (presupuesto energético, nacimiento, muerte),
pero su cuerpo es una gaussiana: un punto con brillo. La cita de Borges dice algo
más exigente: «calores y fríos **articulados**». Articulado implica partes internas
acopladas — anatomía. B1 (`bestiario.html`) es la línea que explora esa anatomía.

### La cita como especificación

| Cláusula del texto | Requisito técnico |
|--------------------|-------------------|
| «organismo hecho de temperaturas cambiantes» | el ser no tiene geometría propia: su estado es un vector de temperaturas |
| «calores y fríos articulados» | el cuerpo es una cadena acoplada donde el calor difunde entre partes |
| «espíritus del fuego o arcángeles animaron los cuerpos» | hay una fuente interna —el *fuego innato*— que sostiene al cuerpo contra la disipación |

### El cuerpo: una cadena de órganos

Cada ser es una cadena de $N$ órganos con temperaturas $T_i$:

 $$\frac{dT_i}{dt} = \underbrace{A_i\sin(\omega_i t+\varphi_i)}_{\text{latido}} + \underbrace{\kappa\,T_{\text{campo}}(x_i,y_i)}_{\text{absorción}} + \underbrace{k_r(T_{\text{set}}-T_i)}_{\text{fuego innato}} - \underbrace{\lambda T_i}_{\text{disipación}} + \underbrace{D\,(T_{i-1}+T_{i+1}-2T_i)}_{\text{difusión interna}}$$ 
- Las frecuencias $\omega_i$ se sortean en $[0.10, 0.40]$ Hz: casi siempre
  inconmensurables entre sí → el patrón colectivo es cuasi-periódico (flujo
  toral) y no se repite nunca.
- El término $D$ es el laplaciano 1D: el calor fluye por el cuerpo como por
  una varilla. Una onda térmica nacida en la cabeza recorre hasta la cola:
  eso es la *articulación*.
- $\kappa$ acopla el cuerpo al medio y un splat gaussiano devuelve temperatura
  al campo: acoplamiento bidireccional ser↔campo. Sin eso no hay ecología.

### Fuego innato y niveles como equilibrios

A diferencia del Enfoque B (drenaje constante $-\mu$), aquí cada ser relaja
hacia una naturaleza térmica propia, $T_{\text{set}}$. En campo neutro, la ODE
del cuerpo tiene un único equilibrio:

 $$T^* = \frac{k_r}{k_r+\lambda}\,T_{\text{set}} \approx 0.86\,T_{\text{set}} \qquad (k_r = 0.5,\; \lambda = 0.08)$$ 
El nivel del bestiario **no está programado**: se lee de la temperatura media $\bar T$ del cuerpo.

| $\bar T$ | Nivel |
|----------|-------|
| $\bar T < -0.55$ | Forma Térmica |
| $-0.55 \leq \bar T < -0.15$ | Cuerpo Saturnino |
| $-0.15 \leq \bar T < 0.25$ | Ser Articulado |
| $0.25 \leq \bar T < 0.68$ | Cuerpo Encendido |
| $\bar T \geq 0.68$ | Espíritu del Fuego |

Un ser con $T_{\text{set}} = +0.9$ estabiliza en $\bar T \approx 0.78$: Espíritu del Fuego.
Uno con $-0.9$: Forma Térmica. Los cinco umbrales son los cinco estados de la
cosmogonía saturnina del texto (de la Forma Térmica impalpable a los arcángeles).

### El ascenso es termodinámico, no guion

Como el campo acopla vecinos, un cuerpo neutro que se acerca a un espíritu
absorbe su campo, sube su $\bar T$ y cruza umbrales. En la simulación la frase
de Borges es literal: **los espíritus del fuego animan los cuerpos** — el campo
caliente del arcángel eleva el nivel de los cuerpos vecinos, sin una sola línea
de código que lo coreografíe. Solo Fourier.

### Termotaxis: conducta sin conducta

 $$\vec{F} = v\,\sigma(\bar T)\,\nabla T, \qquad \sigma(\bar T) = 1-2\,S(\bar T)$$ 
donde $S$ es un smoothstep: frío ($\sigma=+1$) asciende el gradiente térmico;
caliente ($\sigma=-1$) lo evita. Es la estructura de la quimiotaxis bacteriana
(Berg) con temperatura en lugar de nutriente. El cursor no existe en el código
de los seres: dibujar una brasa crea un gradiente, y los fríos lo escalan.
*Buscar el fuego* es una consecuencia de la ley de Fourier, no una función.

### Render: hacer visible la física

- **LUT de incandescencia**: $T \in [-1,1]$ mapeado a hielo profundo → vacío
  casi negro → rojo → ámbar → blanco. El vacío térmico es oscuridad.
- **Cuerpos translúcidos**: cada segmento entre órganos se dibuja con opacidad
  $\propto |T_i - T_{i+1}|$ — la ley de Fourier ($q \propto \nabla T$) convertida
  en canal alfa. Un ser en equilibrio interno es *invisible*: solo brilla donde
  el calor fluye. El «impalpable» emerge del render.
- **Bloom**: dos reducciones sucesivas del campo sumadas aditivamente — el
  resplandor sale del propio campo, no es un truco pintado.
- **Worldlines**: con persistencia alta ($p \approx 0.999$) y difusión baja, cada
  ser pinta su historia en el plano — el equivalente 2D de los worldtubes de
  v08, escrito por la memoria del campo en vez de construirse explícitamente.

### Zoología fantástica interactiva

- **Ficha por ser**: temperatura media, cabeza/cola, flujo de calor, frecuencia
  de latido, fuego innato, edad y estado — con la cita del nivel correspondiente.
- **Crónica**: registra nacimientos, invocaciones y ascensos/descensos de nivel.
- **Invocación**: F crea una Forma Térmica ($T_{\text{set}} < 0$), V un Espíritu
  del Fuego ($T_{\text{set}} > 0$).
- `bestiario.html?embed=1` corre en modo de interfaz mínima para embebido en el
  post del sitio.

---

## Universo esférico (v07)

Borges describe un cosmos, no una grilla. La geometría rectangular de los primeros modelos es una conveniencia numérica, no una decisión física. En v07 el universo es una **esfera**:

- El ray marching intersecta el rayo con la esfera en lugar del cubo: $|\mathbf{r}|^2 = R^2$ - Los seres rebotan en la pared esférica con reflexión especular: $\mathbf{v}' = \mathbf{v} - 2(\mathbf{v}\cdot\hat{n})\hat{n}$ - Desde afuera se ve una **bola de plasma** (naranja/cian según tipo) con *rim glow* en el borde
- El vacío es negro puro; sin seres la esfera se oscurece completamente

### Doble perspectiva: dios e individuo

v07 implementa dos puntos de vista simultáneos sobre el mismo volumen:

**Vista exterior ("el creador"):** la cámara orbita alrededor de la esfera a distancia fija, controlada con el mouse. Se ve la totalidad del universo desde fuera.

**Vista interior ("el ser"):** un recuadro superpuesto (PIP) muestra el mundo desde adentro de uno de los seres. La cámara se posiciona en las coordenadas $(x_i, y_i, z_i)/\text{dim}$ del ser dentro de la textura 3D, con FOV amplio (75°). El ser "mira alrededor" con rotación automática lenta.

Desde adentro la experiencia es completamente distinta: los otros seres aparecen como masas brillantes flotando en la penumbra; la pared de la esfera es un borde difuso de calor en el horizonte. La misma física, dos ontologías.

Presionar **Tab** pasa a seguir el siguiente ser.

---

## Correspondencia completa con el cuento de Borges

| Fragmento del cuento | Modelo computacional |
|----------------------|---------------------|
| "organismo hecho de temperaturas cambiantes" | Gaussiana $S_i(x,y,z,t)$ cuya amplitud varía con $E_i(t)$ |
| "calores y fríos articulados" | Seres de tipo +1 (calientes) y -1 (fríos) con campo $T \in \mathbb{R}$ |
| "ciego y sordo e impalpable" | No hay colisiones sólidas; el ser ES su distribución en el campo |
| "conjunto" (contable, no textura) | Enfoque B: individuos con índice, $N$ varía entre 0 y $N_{\max}$ |
| El ser que nace de la nada | $p_{\text{birth}}$ por frame: fluctuación espontánea del vacío |
| El ser que se disuelve al morir | Cuando $E_i \leq 0$: la gaussiana desaparece, $\lambda T$ absorbe el calor residual |
| La reproducción como división | $E_i > r \cdot E_0 \Rightarrow$ bifurcación: dos gaussianas a partir de una |
| "epoca saturnina" (tiempo primordial) | La simulación corre sin tiempo discreto externo; solo el campo evoluciona |
| Vista del universo como totalidad | Vista exterior de la esfera (v07): el cosmos como bola de plasma |
| Vista desde adentro del ser | PIP interior (v07): el mundo como nebulosa de masas térmicas flotantes |
| La historia del ser como forma geométrica | v08: el tubo espaciotemporal; el ser es una curva en $\mathcal{T}(x,y,\tau)$ |
| Nacimiento = inicio, muerte = fin | En v08: el tubo comienza en $\tau_{\text{nac}}$ y termina en $\tau_{\text{muerte}}$ |
| Reproducción = bifurcación geométrica | En v08: cúspide donde el tubo se divide en dos worldtubes |

---

## Secuencia de versiones

| Archivo | Física | Estado |
|---------|--------|--------|
| `index.html` (v01) | Ecuación del calor 2D, seres como fuentes gaussianas | ✓ funciona |
| `v02-gradiente.html` | Acoplamiento seres↔campo via ∇T | ✓ funciona |
| `test_3D.html` | Diagnóstico WebGL2 + textura 3D | ✓ funciona |
| `v03-raymarching.html` | Ray marching volumétrico 3D | ✓ funciona |
| `v04-grayscott.html` | Reacción-difusión Gray-Scott 2D | ✓ funciona |
| `v05-fhn.html` | FitzHugh-Nagumo: espirales perpetuas | ✓ funciona |
| `v06-ciclovida.html` | **Enfoque B**: presupuesto energético, ciclo de vida, gráficas en tiempo real | ✓ funciona |
| `v07-3d.html` | Campo 3D (CPU, stencil 7 pts) + esfera volumétrica (WebGL2) + PIP interior | ✓ funciona |
| `v08-espaciotiempo.html` | Spacetime: campo 2D × tiempo → volumen 3D de worldtubes | ✓ funciona |
| `bestiario.html` (B1) | **Línea BESTIARIO**: organismo articulado, fuego innato, taxonomía por equilibrios, termotaxis, fichas de zoología fantástica | ✓ funciona |

Nota sobre la numeración: hasta v08 las versiones son secuenciales (la línea del
campo). B1 es una **bifurcación**, no una continuación: B de *bestiario*, 1 por
ser la primera versión de esa línea. Ambas comparten la columna vertebral
($\nabla^2 T - \lambda T$ + fuentes) y difieren en el modelo del cuerpo: fuente
gaussiana con presupuesto energético (línea del campo) vs. cadena articulada de
órganos con fuego innato (línea bestiario).

---

## Notas técnicas

### Discretización de Gray-Scott

El esquema explícito de Euler en grilla 2D:

 $$u_{i,j}^{n+1} = u_{i,j}^n + \Delta t \left[ D_u \nabla^2 u_{i,j}^n - u_{i,j}^n (v_{i,j}^n)^2 + F(1 - u_{i,j}^n) \right]$$ 
 $$v_{i,j}^{n+1} = v_{i,j}^n + \Delta t \left[ D_v \nabla^2 v_{i,j}^n + u_{i,j}^n (v_{i,j}^n)^2 - (F+k) v_{i,j}^n \right]$$ 
Donde el laplaciano discreto es:

 $$\nabla^2 f_{i,j} = f_{i+1,j} + f_{i-1,j} + f_{i,j+1} + f_{i,j-1} - 4 f_{i,j}$$ 
Condición de estabilidad numérica (von Neumann):

 $$\Delta t \leq \frac{\Delta x^2}{4 \max(D_u, D_v)}$$ 
Con $\Delta x = 1$, $D_u = 0.21$, $D_v = 0.05$: $\Delta t \leq 1.19$. Se usa $\Delta t = 1$.

### Colormap

La concentración $v \in [0, 1]$ se mapea a color:

- $v \approx 0$: negro/azul profundo (vacío cósmico, solo sustrato)
- $v \approx 0.3$: azul violáceo (organismo naciente)
- $v \approx 0.6$: naranja (organismo activo)
- $v \approx 1$: blanco (máxima concentración, núcleo del ser)

---

## Extensión a 3D

El paso a 3D es directo: agregar coordenada $z$ y usar el **stencil de 7 puntos**:

 $$\frac{\partial T}{\partial t} = \alpha \left(\frac{\partial^2 T}{\partial x^2} + \frac{\partial^2 T}{\partial y^2} + \frac{\partial^2 T}{\partial z^2}\right) - \lambda T + \sum_i S_i(x,y,z)$$ 
 $$\nabla^2 T_{i,j,k} = T_{i+1,j,k} + T_{i-1,j,k} + T_{i,j+1,k} + T_{i,j-1,k} + T_{i,j,k+1} + T_{i,j,k-1} - 6T_{i,j,k}$$ 
La condición de estabilidad 3D es más estricta que en 2D: $k \leq 1/6$ en lugar de $1/4$.

### Rendering: ray marching volumétrico (v07)

El campo 3D $T(x,y,z)$ no puede visualizarse directamente: es un objeto 4D (tres espaciales + el valor escalar). Para verlo se usa **direct volume rendering** con ray marching:

1. Por cada píxel de pantalla, lanzar un rayo a través del volumen
2. Samplear el campo a intervalos regulares a lo largo del rayo
3. Acumular color + opacidad según una **función de transferencia** (colormap volumétrico)
4. El cómputo se hace en GPU (WebGL2 fragment shader)

La función de transferencia convierte temperatura a emisión luminosa:

 $$T > 0: \text{rojo} \to \text{naranja} \to \text{blanco} \quad (\text{calor})$$ 
 $$T < 0: \text{azul} \to \text{teal} \to \text{cyan} \quad (\text{frío})$$ 
 $$T \approx 0: \text{transparente} \quad (\text{vacío cósmico})$$ 
La composición front-to-back acumula contribuciones a lo largo del rayo:

 $$C_{\text{out}} = C_{\text{in}} + (1-\alpha_{\text{in}}) \cdot \sigma \cdot C_{\text{voxel}}$$ 
 $$\alpha_{\text{out}} = \alpha_{\text{in}} + (1-\alpha_{\text{in}}) \cdot \sigma$$ 
donde $\sigma$ es el coeficiente de extinción proporcional a $|T|$.

---

## Extensión a 4D: espaciotiempo (v08)

Esta es la visualización más borgiana. En lugar de simular en 3D, se acumula la **historia completa** del campo 2D como si el tiempo fuera una tercera dimensión espacial.

### El campo espaciotemporal

Definimos el volumen espaciotemporal:

 $$\mathcal{T}(x, y, \tau) = T(x, y, t_0 + \tau \cdot \Delta T)$$ 
donde $\tau \in [0, N]$ indexa los últimos $N$ frames guardados. Este es un objeto tridimensional fijo que contiene toda la historia reciente del sistema.

### Lo que se ve

Un ser que vive durante $F$ frames no es un punto en el espacio — es un **tubo** en el volumen espaciotemporal:

- Tiene inicio (nacimiento) y fin (muerte) en el eje temporal
- Su diámetro varía con la energía $E_i(t)$ - Si se reproduce, aparece como un **punto de bifurcación**: el tubo se divide en dos
- Si muere, el tubo termina y el calor residual se difunde radialmente

### Conexión con Borges

En la visualización espaciotemporal los seres no "se mueven": su vida entera es una forma geométrica tridimensional. Son literalmente objetos impalpables — formas en el tiempo, no en el espacio — exactamente como los describe Borges.

Un ser que vive 200 frames es un gusano de 200 unidades de largo. Un ser que nunca se mueve es un cilindro. Un ser que se mueve aparece como un tubo diagonal. El instante de reproducción es una cúspide donde el tubo se bifurca.

---

## Bibliografía y referencias

**Fuentes literarias**

- Borges, J.L. & Guerrero, M. — «Seres Térmicos», *El libro de los seres imaginarios* (FCE, México, 1957; ed. ampliada 1967). Entrada del bestiario que da la especificación del proyecto.
- Steiner, R. — *Die Geheimwissenschaft im Umriss* (1907). Cosmogonía saturnina que Borges cita en la entrada: la fuente última de la imagen.
- Vonnegut, K. — *Slaughterhouse-Five* (1969). Los humanos vistos en 4D como "grandes milpiés": la imagen detrás de v08 y de las worldlines de B1.

**Física y matemática**

- Fourier, J.B.J. — *Théorie analytique de la chaleur* (1822). La difusión del campo; en B1, también el render ($q \propto \nabla T$ como canal alfa).
- Turing, A.M. — *The Chemical Basis of Morphogenesis* (1952). El origen del acoplamiento reacción-difusión.
- Gray, P. & Scott, S.K. — *Chemical Oscillations and Instabilities* (1994). Las ecuaciones de la línea del campo emergente.
- Pearson, J.E. — *Complex Patterns in a Simple System* (Science, 1993). Mapa completo de patrones Gray-Scott.
- Prigogine, I. & Stengers, I. — *La nueva alianza* (1979). Estructuras disipativas: el marco conceptual de todo el proyecto.
- Schrödinger, E. — *¿Qué es la vida?* (1944). Estructuras que se mantienen lejos del equilibrio.
- Berg, H.C. & Brown, D.A. — *Chemotaxis in Escherichia coli* (Nature, 1972). La estructura de la termotaxis de B1.
- Murray, J.D. — *Mathematical Biology* (Springer, 3ª ed. 2003). Quimiotaxis y morfogénesis: el marco general.

---

*Proyecto en desarrollo. Luciano Lamaita — [lemeit.ar](https://profe.lemeit.ar) · Documentación extendida con simulaciones embebidas: [profe.lemeit.ar/projects/seres-termicos](https://profe.lemeit.ar/projects/seres-termicos/)*