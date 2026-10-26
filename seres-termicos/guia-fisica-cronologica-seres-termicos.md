# Guía física y cronológica de Seres Térmicos

*Modelos implementados hasta V4.6 y propuesta de una edición visual para redes.*

Documento de trabajo para Luciano Lamaita. Corte de revisión física: 16 de octubre de 2026. Formato adaptado para GitHub el 19 de octubre de 2026.

[Volver al índice de simulaciones](README.md) · [Borrador original para Hugo](guia-fisica-cronologica-seres-termicos-hugo.md)

El proyecto parte de una imagen literaria de Borges y Guerrero y construye distintas maneras de representar cuerpos hechos de diferencias de temperatura. Esta guía explica qué calcula cada simulador, cómo cambió el modelo y qué límites debe tener su interpretación. La versión actual permite observar intercambio térmico, reservas finitas y una respuesta de control ante amenazas externas; esos mecanismos están programados y no constituyen una demostración de vida emergente.

La base documental principal es el README de la raíz del repositorio simus, contrastado con el código disponible de cada HTML y con las versiones locales recientes. El [README de esta carpeta](README.md) contiene el índice de simulaciones. Esta edición utiliza bloques matemáticos de GitHub, con cada ecuación separada y numerada; la copia para Hugo conserva los metadatos originales.

La numeración v01 a v08 y la serie V4.1 a V4.6 pertenecen a etapas y ramas distintas. v04-grayscott no es V4.4. La cronología que sigue respeta el recorrido de versiones recuperado; no atribuye fechas de creación que no puedan confirmarse con un historial de cambios.

## Nombres del relato

Los nombres públicos siguen un relato. Los nombres de archivo y códigos de versión se conservan como identificadores técnicos: no cambian las rutas, las ecuaciones ni la cronología del desarrollo. Los números de los capítulos de esta guía son secciones técnicas, no actos del relato.

| Lugar en el relato | Nombre público | Archivo técnico |
| --- | --- | --- |
| Prólogo | El primer encuentro | `v00-contacto-termico.html` |
| Acto I | El calor deja una huella | `v01-calor-capacidad.html` |
| Acto II | La energía cruza la frontera | `v02-primera-ley.html` |
| Acto III | La dirección del cambio | `v03-entropia.html` |
| Acto IV | El límite del frío | `v04-tercera-ley.html` |
| Acto V | Una pendiente conduce calor | `v05-conduccion-fourier.html` |
| Acto VI | El calor recorre una línea | `v06-difusion-1d.html` |
| Acto VII | La línea se vuelve superficie | `v07-difusion-2d.html` |
| Acto VIII | El calor habita un volumen | `v08-difusion-3d.html` |
| Interludio | Una recta de temperaturas | `v00-temperatura.html` |
| Acto IX · Escena I | El campo que disuelve | `index.html` |
| Acto IX · Escena II | Seguir el gradiente | `v02-gradiente.html` |
| Interludio técnico | Hacer visible un campo | `v03-raymarching.html` |
| Acto X · Escena I | Las manchas encuentran una forma | `v04-grayscott.html` |
| Acto X · Escena II | Las ondas recorren el medio | `v05-fhn.html` |
| Acto XI | Contar a los individuos | `v06-ciclovida.html` |
| Acto XII | Un bestiario de calor | `bestiario.html` |
| Acto XIII · Escena I | El mundo que los contiene | `v07-3d.html` |
| Acto XIII · Escena II | La huella del tiempo | `v08-espaciotiempo.html` |
| Acto XIV · Escena I | El primer volumen térmico | `seres_termicos_V4_1.html` |
| Acto XIV · Escena II | Las formas del campo | `seres_termicos_V4_2.html` |
| Acto XIV · Escena III | Una ventana al campo | `seres_termicos_V4_2_1.html` |
| Acto XIV · Escena IV | Frío y fuego articulados | `seres_termicos_V4_3.html` |
| Acto XIV · Escena V | Nacer y extinguirse | `seres_termicos_V4_4.html` |
| Acto XIV · Escena VI | Mirar sin halos | `seres_termicos_V4_5.html` |
| Acto XIV · Escena VII | Resistir hasta agotarse | `seres_termicos_V4_6.html` |
| Taller técnico | Comprobar la ventana tridimensional | `test_3D.html` |

## Cómo leer la guía

Los capítulos 1 a 3 establecen el lenguaje y el mapa del proyecto. Los capítulos 4 a 8 explican las primeras ramas. Los capítulos 9 a 12 desarrollan el modelo actual, su resolución numérica y su visualización. Los capítulos 13 a 16 reúnen controles, ensayos, correcciones al README y la propuesta para una próxima edición pública.

## 1 Conceptos que no conviene confundir

### Temperatura relativa y calor

**Ecuación (01)**

```math
\theta=\frac{T-T_a}{\Delta T_{ref}}
```

T es temperatura absoluta, Tₐ es la referencia ambiental y ΔTref fija una escala. En los simuladores recientes θ es una variable adimensional. Un valor negativo significa más frío que el ambiente, no una temperatura absoluta negativa. El código abrevia esta idea como θ = T − Tₐ al trabajar con escala unitaria.

**Ecuación (02)**

```math
H=\sum_{c} c_v\theta_c\Delta V+\sum_{i,k}C\theta_{i,k}
```

H es el exceso de calor sensible normalizado respecto de la referencia, con capacidad volumétrica cᵥ y capacidades C de los órganos. En V4.6 se toma cᵥ = 1. H puede ser negativo porque se mide respecto de un estado de referencia; no es una reserva utilizable de energía negativa.

Eᵢ es otra variable: representa un presupuesto de trabajo disponible para sostener al ser. Se consume al regular sus órganos, mantener actividad o escapar. H y Eᵢ no deben sumarse indiscriminadamente como si el código cerrara una termodinámica molecular completa. La contabilidad actual verifica por separado el calor firmado y el presupuesto de reserva.

### Qué es físico y qué es una hipótesis de organismo

La difusión y la conducción proporcional a una diferencia de temperatura tienen fundamento físico. El nacimiento de un individuo, la forma de sus articulaciones, la consigna térmica, el movimiento activo y la regla de ahorro son hipótesis del modelo. Un render luminoso vuelve visible el campo, pero no añade una ley térmica. Esa separación permite experimentar con una ficción científica sin confundirla con una predicción biológica.

Las variables u y v de Gray–Scott o FitzHugh–Nagumo pertenecen a modelos diferentes de θ. En el primero representan concentraciones abstractas; en el segundo, activación y recuperación. Aunque sus paletas se parezcan a fuego y hielo, no son temperaturas termodinámicas.

## 2 Mapa cronológico de archivos y ramas

| Archivo o etapa | Cambio principal | Interpretación |
| --- | --- | --- |
| index.html o v01 | Difusión 2D y fuentes gaussianas | Primer campo térmico con cinco agentes |
| v02-gradiente.html | Movimiento sensible a ∇T | Acoplamiento fenomenológico agente campo |
| test_3D.html | Prueba de WebGL2 y textura 3D | Diagnóstico gráfico sin nueva física |
| v03-raymarching.html | Volumen 3D y ray marching | Prototipo gráfico con reconstrucción del campo |
| v04-grayscott.html | Dos campos con autocatálisis | Rama de reacción difusión |
| v05-fhn.html | Activación y recuperación | Rama de medios excitables |
| v06-ciclovida.html | Energía individual y eliminación | Individuos con reglas de ciclo vital |
| v07-3d.html | Campo 3D y doble perspectiva | Vista esférica e interior de un ser |
| v08-espaciotiempo.html | Historial 2D como volumen | El tercer eje contiene tiempo |
| bestiario.html o B1 | Órganos acoplados y fuego innato | Rama anatómica y poética |
| V4.1 a V4.2.1 | Difusión pasiva 3D persistente | Cinco condiciones iniciales que se disuelven |
| V4.3 | Fuentes articuladas y temperaturas firmadas | Cuerpos sostenidos por reservorios externos |
| V4.4 | Intercambio conservativo y reservas | Nacer desarrollar extinguirse y moverse en 3D |
| V4.5 | Puntos simultáneos y guía de modelos | Cambia la observación sin cambiar la física |
| V4.6 | Amenazas externas y defensa opcional | Homeostasis modelada con costes explícitos |

El bestiario B1 no es simplemente el siguiente número después de v08. Explora órganos y expresividad visual. La serie V4 retoma la difusión 3D y luego incorpora la anatomía activa del bestiario con un presupuesto más explícito. V4.0 no se recuperó para esta revisión; el punto de partida verificable de esa serie es el V4.1 aportado desde Descargas.

## 3 Base común de difusión y conducción

**Ecuación (03)**

```math
\mathbf{q}=-k_{th}\nabla T
```

La ley de Fourier relaciona el flujo de calor por unidad de área con el gradiente de temperatura. kₜₕ es conductividad y no debe confundirse con la variable k de muerte en Gray–Scott ni con un coeficiente numérico de difusión.

**Ecuación (04)**

```math
\rho c_p\frac{\partial T}{\partial t}=k_{th}\nabla^2T+Q_v
```

La conservación local de energía más Fourier da la ecuación del calor para un medio homogéneo, isotrópico y sin advección. Qᵥ es potencia por volumen. Su formulación presupone un medio con capacidad térmica; el campo no representa calor viajando por un vacío físico sin materia.

**Ecuación (05)**

```math
\frac{\partial\theta}{\partial t}=\alpha\nabla^2\theta-\lambda\theta+Q
```

La difusividad es α = kₜₕ/(ρcₚ). El término −λθ, cuando existe, modela relajación hacia un ambiente y tiene que explicarse como intercambio externo. No es una propiedad universal de la ecuación del calor.

Sin fuentes, el campo se suaviza. Con borde a temperatura fija, tiende a la referencia ambiental. Con bordes perfectamente aislantes, tiende a una temperatura uniforme determinada por el calor inicial. Esto no significa que cualquier sistema lineal abierto sea incapaz de mantener una forma: una fuente estacionaria puede sostener un perfil. Lo que no aparece espontáneamente en la difusión pasiva es un organismo autónomo con metabolismo y reproducción.

### La escala espacial y el paso de tiempo

**Ecuación (06)**

```math
r=\frac{\alpha\Delta t}{h^2},\qquad r\leq\frac{1}{2d}
```

Para el esquema explícito con vecinos ortogonales, una malla isotrópica y difusión pura, d es la dimensión espacial: r ≤ 1/4 en 2D y r ≤ 1/6 en 3D. La reacción, el control y los demás términos pueden imponer restricciones adicionales; este límite no certifica por sí solo todo el simulador.

**Ecuación (07)**

```math
\theta_c^{n+1}=\theta_c^n+r(\sum_{j\in N(c)}\theta_j^n-2d\theta_c^n)
```

El stencil usa cuatro vecinos en 2D y seis en 3D, más la celda central. Al cambiar resolución, deben actualizarse h y los subpasos para conservar el mismo problema físico. Un deslizador llamado α en un prototipo antiguo puede controlar directamente r o una versión reescalada, no una difusividad calibrada en unidades SI.

## 4 Primeros campos y movimiento por gradiente

### Acto IX · El campo que disuelve

**Ecuación (08)**

```math
Q_i(\mathbf{x},t)=A_i(t)\exp(-\frac{|\mathbf{x}-\mathbf{x}_i|^2}{2\sigma_i^2})
```

Una gaussiana representa el aporte de un agente. σᵢ controla el ancho y Aᵢ puede ser positivo o negativo. Es una fuente impuesta: no prueba la existencia de un cuerpo material que conserve la energía que emite.

index.html usa una grilla 220 × 160, coeficiente de stencil 0.22, amortiguación multiplicativa 0.994 y tres pasos por cuadro. Sus cinco agentes se trasladan por velocidades prescritas, rebotan y modulan sus fuentes con una sinusoide. La implementación copia celdas vecinas en el borde para aproximar flujo nulo. Las fuentes se acumulan sobre un campo persistente.

**Ecuación (09)**

```math
\theta^{n+1}=p(\theta^n+rL\theta^n),\qquad \lambda_{ef}=-\frac{\ln p}{\Delta t}
```

El factor p = 0.994 equivale a una tasa de relajación sólo después de definir Δt. Como varios prototipos avanzan una cantidad fija de pasos por cuadro, su velocidad física puede cambiar con los fps. Esto debe corregirse o declararse al comparar grabaciones.

### Acto IX · Seguir el gradiente

**Ecuación (10)**

```math
\frac{d\mathbf{v}_i}{dt}=-s_i\chi\nabla\theta(\mathbf{x}_i)-\gamma\mathbf{v}_i+\mathbf{f}_{centro}+\boldsymbol{\xi}
```

sᵢ es la polaridad del ser. El código añade una atracción débil al centro, ruido, amortiguación, velocidad máxima y rebotes. La regla de movimiento se elige como hipótesis; Fourier explica la conducción, no determina que un organismo persiga o evite una temperatura.

El coeficiente numérico de difusión es α del control multiplicado por 0.14. Las fuentes siguen siendo externas y no se debitan de una reserva individual. El modelo gana interacción aparente porque el campo cambia las trayectorias, pero no incorpora reproducción ni muerte por agotamiento.

### Interludio técnico · Hacer visible un campo

test_3D verifica la capacidad gráfica. v03 agrega una textura tridimensional y una integración visual a lo largo de rayos. Sin embargo, su bucle vacía field en cada cuadro, vuelve a sumar gaussianas y aplica una difusión. Por lo tanto, no conserva la historia térmica como un solucionador transitorio persistente. Es un antecedente gráfico valioso, pero no debe usarse para validar memoria del calor o conservación temporal.

## 5 La rama de reacción difusión

### Acto X · Las manchas encuentran una forma

**Ecuación (11)**

```math
\frac{\partial u}{\partial t}=D_u\nabla^2u-uv^2+F(1-u)
```

**Ecuación (12)**

```math
\frac{\partial v}{\partial t}=D_v\nabla^2v+uv^2-(F+k)v
```

u es sustrato y v es producto autocatalítico. El término uv² transforma sustrato en producto; F repone el sustrato y F + k retira producto. El sistema está abierto. Interpretar sus manchas como organismos es una analogía visual, no una identidad física con temperatura.

La implementación utiliza Dᵤ = 0.21, Dᵥ = 0.05, Δt = 1 y condiciones periódicas. Calcula laplacianos con cuatro vecinos y recorta ambas concentraciones al intervalo [0, 1]. Ese recorte es una salvaguarda numérica que puede alterar la dinámica si se activa con frecuencia. La restricción difusiva más severa permite Δt ≤ 1/(4 × 0.21), aproximadamente 1.19; la estabilidad completa de la reacción necesita análisis adicional.

Según parámetros y perturbaciones iniciales, pueden aparecer manchas que crecen y se dividen, filamentos o patrones que colapsan. Pearson documentó patrones y división de manchas para este tipo de sistema [R2](#r2). No todos los regímenes muestran una sucesión de nacimiento, reproducción y muerte, ni cada mancha tiene una identidad individual inequívoca.

El estado uniforme u = 1, v = 0 es una solución exacta. Sin semilla, ruido o perturbación que genere v, la ecuación determinista no crea producto de la nada porque uv² = 0 cuando v = 0. La difusión de una concentración tampoco equivale al desplazamiento de un animal entero. Los mapas de parámetros del README sirven como orientación, no como garantía universal de un patrón con cualquier malla e inicialización.

### Acto X · Las ondas recorren el medio

**Ecuación (13)**

```math
\frac{\partial u}{\partial t}=D_u\nabla^2u+u-\frac{u^3}{3}-v
```

**Ecuación (14)**

```math
\frac{\partial v}{\partial t}=\varepsilon(u+\beta-\gamma v)
```

u es activación rápida y v es recuperación lenta. Esta variante del archivo no difunde v. El término cúbico y la recuperación producen excitabilidad y, en regímenes adecuados, ondas y espirales.

v05 usa Dᵤ = 0.5, Δt = 0.10 y bordes periódicos. Las perturbaciones iniciales se construyen en addSpiral y reset. Una espiral puede durar mucho, pero su permanencia depende del régimen y las condiciones; llamarla perpetua no es una garantía matemática. Esta rama estudia un medio excitable, no cuerpos térmicos con reserva Eᵢ. La referencia al modelo de FitzHugh–Nagumo se mantiene separada de la interpretación cromática [R3](#r3).

## 6 Individuos con presupuesto y memoria temporal

### Acto XI · Contar a los individuos

**Ecuación (15)**

```math
Q_i=s_i A\frac{E_i}{E_0}\exp(-\frac{|\mathbf{x}-\mathbf{x}_i|^2}{2\sigma_i^2})[0.70+0.30\sin(\omega_i n+\phi_i)]
```

**Ecuación (16)**

```math
E_i^{n+1}=E_i^n-0.15\mu
```

La implementación avanza energía por paso discreto, no por un segundo físico calibrado. El código permite nacimientos aleatorios externos y elimina a un ser cuando su E se agota. La amplitud de su fuente disminuye con E/E₀, pero esa emisión no se calcula como el calor exacto que se resta del presupuesto.

Esta etapa introduce individuos contables, gráficas de población y edades. Cada nacimiento inicializa E en el intervalo [0.5E₀, E₀]. La probabilidad de nuevos individuos se ensaya varias veces por paso y depende del control de nacimientos, sin un reservorio global finito. Se trata de un mecanismo de creación prescrito, no de una fluctuación cuántica del vacío.

**Ecuación (17)**

```math
E_i>r_{rep}E_0\ \Rightarrow\ E_{padre}=0.6E_0,\quad E_{hijo}=0.4E_0
```

La condición de reproducción está escrita, pero con E₀ fijo, rrep ≥ 1.2 y un individuo que nace con E ≤ E₀ y sólo pierde energía, no puede alcanzarse. No hay alimentación que eleve E por encima del umbral. Cambiar E₀ durante la ejecución puede alterar esa comparación, pero eso no constituye reproducción emergente. Esta limitación también alcanza a las extensiones que conservan la misma lógica.

### Acto XIII · El mundo que los contiene

**Ecuación (18)**

```math
\mathbf{v}^{\prime}=\mathbf{v}-2(\mathbf{v}\cdot\mathbf{n})\mathbf{n}
```

Se usa reflexión especular para orientar al ser hacia el interior cuando supera el radio de confinamiento. El campo se almacena en una grilla rectangular 64 × 48 × 32 y se actualiza con seis vecinos.

El ray marching corta una esfera y muestra una vista exterior y otra interior desde un agente. La esfera del render y el rebote no equivalen a resolver la ecuación del calor sobre una malla esférica con una condición térmica en esa superficie: el solucionador sigue trabajando sobre el volumen rectangular y copia sus caras. La métrica de los índices y el reescalado de cada eje también importan si se quisiera interpretar una esfera física isotrópica.

### Acto XIII · La huella del tiempo

**Ecuación (19)**

```math
\mathcal{T}(x,y,\tau)=\theta(x,y,t_0+\tau\Delta t_{hist})
```

El modelo térmico sigue siendo bidimensional. Se guardan cortes sucesivos en una textura 3D; el tercer eje indica tiempo almacenado, no profundidad espacial. Las trayectorias forman tubos de historia o worldtubes.

Un tubo comienza cuando se registra un ser y termina cuando deja de aparecer. La amplitud y el movimiento pueden verse como una geometría de su historia reciente. No se simula un espacio de cuatro dimensiones ni relatividad. La memoria es finita y el archivo organiza los cortes en un búfer circular. La bifurcación visual por reproducción está sujeta a la limitación energética señalada para v06.

## 7 Acto XII · Un bestiario de calor

### Temperaturas de los órganos

**Ecuación (20)**

```math
\frac{d\theta_k}{dt}=A_k\sin(\omega_k t+\phi_k)+\kappa\theta_m+k_r(\theta_{set}-\theta_k)-\lambda_o\theta_k+D_o(\theta_{k-1}+\theta_{k+1}-2\theta_k)
```

El latido es externo, κθₘ representa la lectura del campo, kᵣ restaura una temperatura propia y Dₒ acopla órganos vecinos. En el archivo se usan κ = 0.22, kᵣ = 0.5, λₒ = 0.08 y Dₒ = 2.6. Las temperaturas se limitan a [−1.2, 1.2].

Los órganos giran con velocidades angulares y radios modulados; el centro del cuerpo combina termotaxis, oscilaciones de deriva, repulsión y confinamiento. Cada órgano deposita en el medio una fracción de su temperatura mediante splats de distintos radios. Ese retorno al campo hace el acoplamiento bidireccional, pero no es un intercambio conservativo: no se descuenta exactamente del órgano el calor que recibe la grilla.

**Ecuación (21)**

```math
\theta^*=\frac{k_r}{k_r+\lambda_o}\theta_{set}\approx0.862\theta_{set}
```

Este equilibrio describe una cadena uniforme en medio neutro, sin latido neto y sin otras variaciones. No es la solución instantánea de todo el bestiario acoplado. El campo y las oscilaciones pueden desplazar o hacer oscilar el promedio.

### Niveles y termotaxis

| Media del cuerpo | Nombre mostrado |
| --- | --- |
| θ̄ < −0.55 | Forma térmica |
| −0.55 ≤ θ̄ < −0.15 | Cuerpo saturnino |
| −0.15 ≤ θ̄ < 0.25 | Ser articulado |
| 0.25 ≤ θ̄ < 0.68 | Cuerpo encendido |
| θ̄ ≥ 0.68 | Espíritu del fuego |

El valor de la temperatura media se calcula; los nombres y sus umbrales están programados. Por eso es correcto decir que el nivel se asigna a partir del estado térmico, pero no que toda la taxonomía emerge sin decisiones del autor.

**Ecuación (22)**

```math
\mathbf{a}_{tax}=140[1-2S(0.10,0.70,\bar\theta)]\nabla\theta_m
```

S es la interpolación smoothstep del código. La forma de esta respuesta es una elección fenomenológica. A ella se añaden fuerzas sinusoidales, repulsión y rozamiento. El campo crea el gradiente; la regla de conducta determina cómo responde el cuerpo.

Las frecuencias que multiplican t dentro de sin(ωt + φ) son frecuencias angulares. Para expresarlas en ciclos por segundo corresponde f = ω/(2π). No basta con que se sorteen valores reales para probar inconmensurabilidad exacta ni una trayectoria que no se repite nunca; puede hablarse de oscilación irregular o cuasiperiódica bajo hipótesis adicionales.

### Por qué es visualmente expresivo

B1 dibuja el campo, suma dos reducciones para producir bloom y añade órganos, segmentos y nombres. La opacidad de cada segmento depende de la diferencia de temperatura entre sus extremos. Ese vínculo con el estado térmico es valioso, pero los nodos y líneas son una capa gráfica explícita. La luz azul de un cuerpo frío y el resplandor no son radiación de cuerpo negro calculada.

La ventaja de esta rama es perceptiva: permite reconocer partes, asociarlas a un individuo y leer acontecimientos mediante fichas y crónica. Su límite para el problema de muerte por agotamiento es que el fuego innato puede sostenerse indefinidamente. V4.4 y V4.6 recuperan esa expresividad e incorporan una reserva que sí puede terminarse.

## 8 Acto XIV · Las primeras escenas del volumen

### Escena I · El primer volumen térmico

El archivo de Descargas usa 48³ celdas y cinco gaussianas positivas como condición inicial. El campo persiste y se actualiza con un stencil de seis vecinos; los bordes permanecen en cero. El control llamado difusión modifica directamente r, inicialmente 0.105 y limitado a 0.16. El tiempo mostrado cuenta pasos, no segundos calibrados.

La textura 3D R8 permite transportar al render un valor normalizado de un solo canal. En esa versión la intensidad relativa se calcula con el máximo instantáneo, lo cual ayuda a ver estructuras mientras se debilitan pero oculta parte del descenso absoluto. También había un doble avance del parámetro del rayo; V4.2 lo corrige.

### Escenas II y III · Formas del campo y una ventana para observarlas

V4.2 construye cinco anatomías iniciales mediante gaussianas conectadas sobre 56³ celdas. No hay fuentes posteriores: las formas se ensanchan y desaparecen por difusión hacia el borde ambiental. Se fija h = 2/55 y Δt = 0.04 y se subdivide si hace falta para no superar r = 0.15. La escala de color es fija, con corte científico y estadísticas.

V4.2.1 conserva esa física y ajusta la composición a la ventana. Reduce automáticamente resolución de render y muestras del rayo para mejorar fluidez. Cambiar esos controles gráficos no modifica la grilla del campo. Los ensayos por software mostraron una mejora respecto de V4.2, pero esos fps no son una garantía para otra computadora.

### Escena IV · Frío y fuego articulados

**Ecuación (23)**

```math
\frac{\partial\theta}{\partial t}=\alpha\nabla^2\theta-0.22\theta+Q(\mathbf{x},t)
```

Los órganos prescriben fuentes gaussianas calientes o frías. Se añaden latido y deriva y se mantiene una pérdida al ambiente. La simulación está abierta y no posee todavía una reserva finita individual que se consuma por sostener la forma.

Esta versión muestra cinco estructuras articuladas y permite apagar las fuentes para volver a la difusión pura. Las posiciones y articulaciones están prescritas. El render sigue siendo volumétrico por ray marching; el coste gráfico hizo necesaria una reconstrucción más ligera en V4.4.

## 9 Acto XIV · De nacer a resistir

### Un solo campo persistente y órganos con capacidad térmica

**Ecuación (24)**

```math
\frac{\partial\theta}{\partial t}=\alpha\nabla^2\theta+Q_{org}+Q_{ext}
```

**Ecuación (25)**

```math
q_{i,k}=G[\theta_{i,k}-\theta_m(\mathbf{x}_{i,k})]
```

**Ecuación (26)**

```math
C\frac{d\theta_{i,k}}{dt}=P_{i,k}-q_{i,k}+CD_oL_1\theta_{i,k}
```

Cada órgano tiene una temperatura y una capacidad C. G es conductancia hacia el medio y Dₒ modela conducción interna por una cadena. El signo de q define qué lado entrega calor. La lectura del campo se interpola trilinealmente; el depósito se distribuye mediante un núcleo normalizado.

**Ecuación (27)**

```math
\Delta\theta_c=\frac{q_{i,k}\Delta t}{\Delta V}\frac{w_c}{\sum_jw_j},\qquad\Delta\theta_{i,k}=-\frac{q_{i,k}\Delta t}{C}
```

La suma del calor agregado a la grilla es qΔt y coincide con lo que pierde el órgano, salvo redondeo Float32. Los pesos gaussianos se normalizan sobre las celdas realmente incluidas, también cerca de un borde.

**Ecuación (28)**

```math
q_{ij}=G_{ij}(\bar\theta_i-\bar\theta_j),\qquad G_{ij}=0.00014[\max(0,1-d_{ij}/0.40)]^2
```

Esta conexión añade conducción efectiva entre cuerpos próximos. A uno se le resta qᵢⱼΔt y al otro se le suma. La conductancia es no negativa y el flujo va hacia menor temperatura. Es un enlace mesoscópico elegido para representar proximidad, no una solución detallada del contacto entre superficies.

### Control de temperatura y reserva

**Ecuación (29)**

```math
\theta^*_{i,k}=s_i[0.70+0.10\sin(1.7a_i+0.6k)](1-\exp(-a_i/1.1))b_i
```

**Ecuación (30)**

```math
P_{i,k}=Ck_{ctrl}(\theta^*_{i,k}-\theta_{i,k})
```

aᵢ es edad, sᵢ es polaridad y bᵢ reduce la consigna cuando se activa ahorro. La ganancia basal es 0.9. El controlador puede añadir calor o extraerlo; en ambos casos consume reserva según |P|. Se limita la energía aplicada en el paso si no alcanza la reserva restante.

**Ecuación (31)**

```math
\frac{dE_i}{dt}=-\sum_k|P_{i,k}|-\mu a_{act,i}-P_{esc,i}-D_i
```

En V4.4, aact = 1, Pesc = 0 y D = 0. V4.6 añade ahorro, escape y drenaje externo. El término de mantenimiento se interpreta como trabajo o disipación fuera del campo mostrado. No se ha modelado una máquina frigorífica con temperaturas absolutas y rendimiento de Carnot; el coste de enfriar es una aproximación de presupuesto.

### Nacimiento desarrollo y muerte

El estado inicial contiene seis cuerpos tridimensionales, con siete órganos cada uno. Son condiciones iniciales con edad y temperatura propias; no se presentan como seis fluctuaciones espontáneas del vacío. Los nacimientos posteriores transfieren E₀ de la reserva común a un ser nuevo. La geometría se desarrolla con la edad mediante una función suave; esa anatomía está programada.

**Ecuación (32)**

```math
g(a)=0.25+0.75[1-\exp(-a/2.2)]
```

**Ecuación (33)**

```math
E_i\leq0\ \Rightarrow\ P_{i,k}=0
```

El ser deja de mantener sus temperaturas, pero los órganos continúan intercambiando calor pasivamente. El individuo se retira cuando lleva al menos 3 unidades de tiempo extinguido y todos sus órganos tienen |θ| < 0.08. Antes de quitarlo se deposita en el medio el calor que aún almacena. La difusión del campo continúa después de desaparecer la identidad individual.

La muerte es un criterio sobre la reserva y la pérdida de identidad es otro criterio, sobre el estado térmico residual. Ninguno equivale a borrar píxeles por un efecto de transparencia. La V4.6 no implementa reproducción heredable, selección natural ni evolución genética.

## 10 Movimiento tridimensional y homeostasis

### Traslación en un baño externo

**Ecuación (34)**

```math
d\mathbf{v}_i=(-\gamma\mathbf{v}_i-s_i\chi\nabla\theta+\mathbf{a}_{esc,i})dt+\sigma d\mathbf{W}_t
```

**Ecuación (35)**

```math
\frac{d\mathbf{x}_i}{dt}=\mathbf{v}_i
```

La velocidad combina rozamiento, una termorrespuesta elegida, agitación estocástica y, en V4.6, escape activo. La posición tiene tres coordenadas. El ruido representa un baño externo; no se ha derivado una relación de fluctuación disipación calibrada con masa y temperatura absoluta.

**Ecuación (36)**

```math
f=\exp(-\gamma\Delta t),\qquad\sigma_v=\sigma\sqrt{\frac{1-f^2}{2\gamma}}
```

El código integra exactamente el factor de rozamiento y la varianza del ruido para un paso con fuerza congelada, y actualiza la posición numéricamente. No resuelve hidrodinámica, presión, flotación ni Navier–Stokes. Los rebotes de frontera multiplican la componente de velocidad por −0.8, así que tampoco son colisiones elásticas de un gas molecular.

### La amenaza térmica

**Ecuación (37)**

```math
Q_{ext}=-\kappa_{ext}w(\mathbf{x}-\mathbf{X}_{ext})(\theta-\theta_{ext})
```

**Ecuación (38)**

```math
\theta^{n+1}=\theta_{ext}+(\theta^n-\theta_{ext})\exp(-\kappa_{ext}w\Delta t)
```

Es un baño localizado, no una criatura ni un halo decorativo. El centro sigue una trayectoria externa prescrita. La actualización exponencial evita inestabilidad por relajación y se registra el calor firmado que aporta o retira del medio.

En V4.6 dura 14 unidades de tiempo; su ancho gaussiano es 0.13, θext = −sobjetivo × 0.065 y κext = 0.75 × intensidad. Se ubica cerca del ser seleccionado o del primer ser vivo. Es adverso para esa polaridad; para un vecino de polaridad contraria podría ser beneficioso. El efecto real depende de la trayectoria y de los gradientes resultantes.

### El sifón de reserva

**Ecuación (39)**

```math
D_i=0.00035 I\exp(-\frac{|\mathbf{x}_i-\mathbf{X}_{ext}|^2}{2(0.24)^2})
```

I es intensidad. El sifón extrae presupuesto disponible, no calor directamente. La cantidad retirada se registra en una cuenta externa y nunca se deja E por debajo de cero. Alejarse reduce el drenaje por la caída espacial de la gaussiana.

### Detección respuesta y ahorro

**Ecuación (40)**

```math
z_T=\min(1,\frac{\max(0,-s_i\theta_m)}{0.15}),\qquad z_D=\exp(-\frac{d_i^2}{2R^2})
```

z es una señal de amenaza: para el frente se mide la temperatura opuesta a la polaridad; para el sifón se usa proximidad. Se activa la alarma cuando z > 0.12. Es un criterio de control diseñado, no un órgano sensorial emergente.

**Ecuación (41)**

```math
u_i=\min(1,\frac{E_i/E_{0,i}}{0.32}),\qquad a_{act,i}=0.35+0.65u_i
```

**Ecuación (42)**

```math
b_i=0.45+0.55u_i
```

Con respuesta adaptativa y reserva menor al 32%, se reduce el mantenimiento y la magnitud de la temperatura objetivo. Si bajar la consigna obligara a gastar energía activamente en el sentido contrario de la polaridad, el código suprime esa potencia y deja que el intercambio pasivo reduzca el contraste. Sin respuesta adaptativa, actividad y consigna conservan sus valores basales.

**Ecuación (43)**

```math
|\mathbf{a}_{esc}|\leq0.22\min(1,z)\sqrt{a_{act}}
```

**Ecuación (44)**

```math
P_{esc}=\frac{0.001|\mathbf{a}_{esc}\cdot\mathbf{v}|}{0.3}+0.000003
```

Cuando hay alarma y una amenaza localizada, la aceleración apunta desde el centro de esa perturbación hacia afuera. La ganancia térmica sube de 0.9 a 1.8. El coste mecánico se suma al mantenimiento y se debita de la reserva; el término basal se aplica durante la alarma. Es una estimación de coste dentro de un modelo activo abierto, no un cierre de toda la energía mecánica del baño.

La defensa puede permitir escapar, consumir energía demasiado rápido o no llegar a tiempo. Ahorrar prolonga la reserva, pero reduce el contraste térmico que hace visible al cuerpo. El código no impone un resultado heroico ni recarga al ser cuando detecta peligro. Retirar la amenaza permite observar recuperación, pero no devuelve la reserva extraída ni borra la temperatura que ya alteró.

### Qué significa hablar de vida

Sostener un estado interno frente a perturbaciones ilustra homeostasis. Un termostato también tiene regulación, por lo que esa capacidad no define por sí sola la vida. El proyecto permite discutir mantenimiento fuera del equilibrio, identidad temporal y coste de persistir; no prueba metabolismo bioquímico, reproducción con herencia o evolución abierta. La pregunta filosófica puede acompañar la experiencia sin convertirse en una conclusión física que el modelo no calcula.

## 11 Parámetros y balances de la versión actual

| Magnitud | Valor de referencia en V4.6 | Función |
| --- | --- | --- |
| Dominio y grilla | Lado 2 y 40³ celdas | Volumen adimensional |
| h y Δt | 2/39 y 0.04 | Espacio y paso de integración |
| α y límite r | 0.002 y 0.15 | Difusión y subpasos |
| C y G | 0.00012 y 0.000035 | Órgano y acoplamiento al medio |
| Dₒ | 0.32 | Difusión interna multiplicada por C |
| μ | 0.00007 | Mantenimiento basal |
| Reserva común inicial | 0.035 | Presupuesto externo finito |
| E₀ por ser | 0.0017 a 0.0035 por factor de duración | Nacimiento |
| Cantidad inicial y tope | 6 iniciales y 10 vivos como máximo | Población de agentes |
| Nacimientos automáticos | Cada 5 unidades si hay reserva y lugar | Creación externa prescrita |
| γ y χ | 0.45 y 0.007 | Rozamiento y termorrespuesta |
| Agitación y σ | 0.55 y 0.10 × agitación | Ruido externo |
| Duración de amenaza | 14 | Tiempo de perturbación |
| Frente térmico | R 0.13 y θext opuesta de magnitud 0.065 | Relajación localizada |
| Sifón | R 0.24 y D₀ 0.00035 × intensidad | Extracción de reserva |
| Escala de color y textura | ±0.02 y ±0.125 | Lectura visual y transporte R8 |

Estos parámetros son adimensionales o efectivos. Para asignar metros, segundos, kelvin y joules habría que fijar escalas de longitud, tiempo, temperatura y capacidad térmica y reescalar coherentemente todos los términos. No corresponde leer una reserva de 0.003 como una energía real en joules sin esa calibración.

### Balance de reserva

**Ecuación (45)**

```math
R_E=E_{ext}-R-\sum_iE_i-E_{gastada}-E_{retirada}
```

R es reserva común. Los nacimientos transfieren presupuesto entre R y Eᵢ. La recarga aumenta Eext y R por igual; los gastos aumentan Egastada; el sifón y la extinción impuesta aumentan Eretirada. Un R_E próximo a cero comprueba esa contabilidad, no la segunda ley completa.

### Balance de calor

**Ecuación (46)**

```math
R_H=H-H_0-A+B-Q_{ext,acum}
```

A acumula el calor firmado del controlador, B el calor firmado que salió por las fronteras y Qext,acum el aporte firmado del baño externo. El intercambio entre órganos y medio y el contacto entre seres se cancelan internamente. Un R_H pequeño comprueba que no se pierde calor al depositarlo o retirar órganos.

En los ensayos de desarrollo de V4.6, los residuos de reserva estuvieron cerca del redondeo de doble precisión y los residuos térmicos fueron del orden de 10⁻¹⁰ a 10⁻⁹ en casos probados. Son resultados de pruebas concretas. No sustituyen una campaña de convergencia espacial, análisis de errores ni validación experimental.

## 12 Entropía y límites de la interpretación termodinámica

**Ecuación (47)**

```math
\frac{dS}{dt}=\dot S_e+\dot S_i,\qquad\dot S_i\geq0
```

El balance de entropía de un sistema abierto separa intercambio con el entorno y producción interna. En régimen estacionario, ambos términos pueden compensarse. La desigualdad del README que exige exportar siempre más entropía de la que se produce no es una condición general para que exista una estructura disipativa [R1](#r1).

**Ecuación (48)**

```math
\dot S_{prod}=q_{ij}(\frac{1}{T_j}-\frac{1}{T_i})=G_{ij}\frac{(T_i-T_j)^2}{T_iT_j}\geq0
```

Esta expresión usa temperaturas absolutas positivas y una conductancia positiva. No debe evaluarse con θ negativa o con 1/θ. Ilustra por qué el intercambio conductivo tiene el signo físico correcto [R4](#r4).

V4.6 no calcula entropía ni rendimiento frigorífico real. El baño que agita las partículas, el ruido, las consignas y el mantenimiento representan intercambios con un exterior no resuelto. Hay una contabilidad útil de calor y reserva, pero todavía no un modelo cerrado de materia, trabajo, entropía y mecanismos de refrigeración. Esta distinción permite decir que el comportamiento está inspirado en física y construido con balances explícitos, sin afirmar una validación termodinámica completa.

La linealidad de la difusión explica el suavizado, pero la no linealidad y dos campos activador inhibidor no son ingredientes obligatorios de todo sistema lejos del equilibrio. Son una vía de modelado particular, relevante para Gray–Scott y medios excitables. La formación de estructuras disipativas se estudia en muchos otros sistemas [R1](#r1).

## 13 Cómo se calcula y cómo se dibuja

### Integración desacoplada del dibujo

Las versiones recientes acumulan tiempo de reloj y realizan pasos físicos de 0.04. Si αΔt/h² superara 0.15, se subdivide ese paso. El dibujo puede bajar resolución automáticamente sin cambiar el campo de 40³. Cuando la computadora no puede seguir el ritmo y se limita el acumulador, el tiempo simulado puede ir más lento que el reloj; debe usarse el contador simulado al interpretar duraciones.

El orden de V4.6 es difusión, actualización de la amenaza, órganos y movimiento, conexiones de proximidad y, si corresponde, nacimiento. Es una separación de operadores de primer orden; cambiar el orden o reducir Δt puede cambiar pequeños detalles. Se usan Float32 para el campo y números de doble precisión para varias cuentas. No se ha realizado aquí una prueba sistemática de independencia de malla.

### Ray marching y emisión por vóxeles

**Ecuación (49)**

```math
a=1-\exp(-\sigma_{opt}\Delta\ell)
```

**Ecuación (50)**

```math
\mathbf{C}^{\prime}=\mathbf{C}+(1-A)a\mathbf{c},\qquad A^{\prime}=A+(1-A)a
```

V4.1 a V4.3 recorren muestras a lo largo del rayo y componen color y absorción. a es opacidad de un tramo, mientras σopt es un coeficiente de extinción; no son la misma magnitud. La paleta y la iluminación son ilustrativas, no una solución de radiación térmica de cuerpo negro.

V4.4 a V4.6 sustituyen ese recorrido por la proyección de vóxeles activos con núcleos suaves y suma aditiva, como emisión ópticamente delgada. Es más ligera, pero no resuelve sombras, absorción ni oclusión física. La malla parecida a un teseracto que se ve con zoom procede de la grilla y de su reconstrucción gráfica; no indica cuatro dimensiones físicas.

**Ecuación (51)**

```math
b=\mathrm{round}[128+127\,\mathrm{clamp}(\theta/0.125,-1,1)]
```

**Ecuación (52)**

```math
\theta_{tex}=0.125\frac{b-128}{127}
```

La textura R8 tiene un byte por celda. El cero se codifica exactamente en 128 y el error máximo de redondeo dentro del rango es aproximadamente 0.000492. La saturación afecta sólo a la imagen, no al campo Float32. La transferencia de color usa una referencia fija de ±0.02 y la selección de muestras activas descarta visualmente |θ| ≤ 0.0008; el corte científico conserva la lectura del dato.

### Recuadro y viñetas

La vista cinemática lee los mismos cuerpos, posiciones, tiempo y cámara. En centros muestra un punto por individuo; en órganos, uno por nodo térmico. No es una segunda simulación ni una teoría cinética de moléculas. Las viñetas o callouts se anclan a posiciones 3D proyectadas: nacimientos, reserva, defensa y flujos de interacción. Los flujos se actualizan cuando el enlace de proximidad sigue activo.

La captura PNG integra campo, viñetas, región de amenaza y recuadro. Los colores del frío son una convención: un cuerpo frío no emite luz azul por estar frío. La suma de emisiones por profundidad tampoco permite leer una temperatura puntual directamente del brillo volumétrico; para eso debe usarse el corte científico o la ficha numérica.

## 14 Resistir hasta agotarse · Controles y protocolo de prueba

| Acción | Efecto en el modelo |
| --- | --- |
| Recargar reserva de nacimientos | Añade 0.020 a la reserva común y a la cuenta de aporte externo. No altera el campo ni la energía de seres existentes. |
| Crear un ser ahora | Crea un individuo y transfiere E₀. Si no alcanza la reserva, añade explícitamente el aporte externo necesario para cubrir el máximo de nacimiento y deja el remanente común. |
| Extinguir toda la vida | Retira todas las reservas, detiene nacimientos automáticos y cesa la alimentación de los órganos. Conserva calor y restos térmicos. |
| Nacimientos automáticos | Permite o detiene nuevas creaciones periódicas. No detiene a los individuos existentes. |
| Apagar las fuentes | Congela órganos, movimiento, nacimientos y amenaza. El medio continúa con difusión pura. |
| Evento externo | Introduce la perturbación elegida cerca de un ser vivo. El tipo predeterminado es sifón de reserva. |
| Respuesta adaptativa | Activa o desactiva la regulación de emergencia, escape y ahorro. No desactiva el controlador térmico basal. |
| Retirar amenaza | Detiene el agente externo. No devuelve reserva ni restaura el campo previo. |
| Reiniciar | Restaura población y reserva iniciales con semilla fija. Algunos controles, incluida la selección de respuesta, conservan el valor elegido. |

Para comparar defensa y ausencia de defensa: fijar tipo de amenaza, intensidad y controles; detener nacimientos automáticos después de cada reinicio; usar el mismo ser y el mismo instante simulado; introducir el evento con respuesta desactivada; registrar reserva y estado a un tiempo determinado; reiniciar y repetir con respuesta activada. No basta con mirar dos clips iniciados en momentos diferentes.

En una prueba determinista del sifón a intensidad 1 durante 8 unidades simuladas, sin agitación y sin nuevos nacimientos, el Ser 1 estaba extinguido sin defensa. Con defensa seguía vivo, tenía E aproximadamente 0.000584 y se había alejado. La reserva extraída del conjunto fue aproximadamente 0.002653 sin defensa y 0.001228 con defensa. Estos valores describen ese caso y sus condiciones, no una ley general de supervivencia.

Las verificaciones de desarrollo incluyeron difusión de un impulso no negativo, normalización del depósito gaussiano, recarga que no modifica el campo, creación, extinción sin renacimiento automático, retirada de amenaza, balances, vista móvil y apertura directa como archivo HTML. No se volvió a ejecutar exhaustivamente cada simulador antiguo para esta guía; su descripción se basa en lectura del código.

## 15 Matices y correcciones propuestos para el README

Esta sección conserva las observaciones de la revisión física del 16 de octubre. El índice de simulaciones de esta carpeta se corrigió y las versiones V4.1 a V4.6 se publicaron posteriormente, el 19 de octubre de 2026.

- Reemplazar “la física que produce vida” por una descripción de patrones de reacción difusión. Dividir una mancha no equivale a demostrar reproducción biológica.

- Distinguir la rama térmica de las ramas Gray–Scott y FHN. u y v no son automáticamente calor y frío.

- Usar el balance de entropía de un sistema abierto y evitar una desigualdad universal de exportación. El modelo actual no calcula S ni un balance completo de entropía.

- Explicar que la termotaxis es una ley de conducta añadida al campo. Buscar o evitar una temperatura no se deduce de Fourier.

- Reconocer que B1 dibuja nodos y segmentos además del campo y que sus etiquetas corresponden a umbrales elegidos por el autor.

- Expresar correctamente las frecuencias angulares y evitar afirmar inconmensurabilidad o ausencia de repetición sin un análisis que lo pruebe.

- Indicar que la reproducción de v06 y sus derivados no se alcanza con E₀ fijo y energía únicamente decreciente en los rangos presentes.

- Llamar al nacimiento aleatorio una regla externa y no una fluctuación física del vacío. Declarar de dónde entra el presupuesto.

- Aclarar que v03 reconstruye el campo por cuadro y que v08 representa historia 2D apilada, no una evolución espacial 3D o relativista.

- Separar rendimiento observado de estimaciones de operaciones. Un cálculo de Mflops no prueba que se use menos del 1% de cualquier CPU; también importan memoria, dibujo, navegador y GPU.

- Distinguir reserva disponible, calor relativo y trabajo externo. Los balances de V4.6 son un avance contable, no validación de metabolismo o termodinámica molecular.

## 16 Propuesta de una próxima versión visual para redes

### Objetivo y alcance

La próxima edición debería ser una presentación de la física de V4.6 con una configuración estándar congelada. El cambio principal sería la interfaz y la puesta en escena. No conviene añadir otra ley física a la vez: sería más difícil saber si una diferencia visual proviene del modelo, de los parámetros o del encuadre. Se propone el nombre provisional V4.7 Visual; no se ha creado ni publicado ese simulador con este documento.

La V4.6 queda como laboratorio completo. La edición pública abre directamente el campo y oculta controles de α, vida, agitación, ganancia, calidad y detalles del modelo detrás de un acceso secundario. La física y la contabilidad continúan iguales. La explicación corta puede decir que son agentes térmicos activos con reserva finita y defensa programada ante perturbaciones.

### Configuración estándar propuesta

| Parámetro o decisión | Valor o política propuesta |
| --- | --- |
| Motor físico | V4.6 sin cambiar ecuaciones ni orden de integración |
| Grilla y paso | 40³ y Δt 0.04 con subpasos por r ≤ 0.15 |
| Difusividad y agitación | α 0.002 y agitación 0.55 |
| Vida y velocidad | Factor de duración 1 y tiempo 1× |
| Población inicial | Seis seres con semilla fija; repetir exactamente el experimento tras reiniciar |
| Reserva inicial | 0.035 y nacimientos cada 5 unidades si hay lugar |
| Defensa | Activada de manera predeterminada |
| Evento para el clip principal | Sifón de reserva de intensidad 1 y duración física 14 |
| Presentación del campo | Escala de color fija ±0.02 y calidad gráfica automática |
| Viñetas | Una acción principal visible; segunda sólo si aporta información |
| Recuadro de puntos | Oculto al abrir; disponible como vista opcional |
| Cámara | Órbita lenta prescrita o encuadre fijo reproducible; sin mover partículas por motivos de composición |

Esta configuración es una propuesta para ensayar. Antes de fijarla como estándar público hay que comprobar que el evento se ve bien con agitación 0.55 y que el ser objetivo permanece visible en formatos vertical y horizontal. Si el relato requiere cambiar parámetros, deben registrarse como un nuevo preset y volver a probarse, no retocarse durante una grabación sin declararlo.

### Controles visibles mínimos

- Pausar o continuar. Permite detener una viñeta sin alterar el modelo.

- Evento externo. Introduce el sifón con parámetros fijos; su aparición es una intervención declarada.

- Reiniciar. Repite la misma escena y repone la condición inicial.

Capturar o grabar y acceder a “Cómo funciona” pueden ubicarse en un menú secundario. Crear vida, extinción y el conjunto de deslizadores quedan en el modo laboratorio. Un indicador discreto muestra tiempo simulado, población y reserva del ser seguido. Así se reduce la carga de opciones sin ocultar el carácter del experimento.

### Secuencia sugerida para un clip

| Momento orientativo | Qué mostrar | Qué afirma el texto |
| --- | --- | --- |
| 0 a 5 s | Cuerpos y primeras interacciones | Agentes térmicos sostenidos por una reserva |
| 5 a 8 s | Aparece la región del sifón | Una perturbación externa empieza a extraer reserva |
| 8 a 18 s | Escape o regulación y descenso de E | Responder consume energía y puede reducir la exposición |
| 18 a 25 s | Amenaza termina o el ser se agota | La defensa tiene límites y el calor residual permanece |
| Cierre | Campo y estado final real de la corrida | Modelo físico simplificado con reglas explícitas |

Los tiempos anteriores son una propuesta editorial; deben ajustarse al contador simulado y a la duración real del evento. Se puede dirigir la cámara y elegir cuándo introducir la amenaza, pero no forzar supervivencia, ocultar el agotamiento ni animar una recuperación que las variables no muestran. Un resultado fallido también explica el modelo.

### Formatos y criterios de aceptación

Proponer un encuadre 9 a 16 para historias o reels y otro 16 a 9 para explicaciones. Son proporciones de diseño, no especificaciones de una plataforma verificadas aquí. El texto debe ser legible en una pantalla de teléfono; las ecuaciones pueden aparecer de a una con una frase breve. La escala gráfica puede adaptarse automáticamente al dispositivo manteniendo la grilla y el tiempo físico.

- Al iniciar, la escena se comprende sin abrir un panel ni desplazar la página en el formato elegido.

- Pausa, reinicio y evento funcionan con teclado y tacto; los textos no se superponen al cuerpo seguido.

- Reiniciar con el mismo preset reproduce la condición inicial y el momento de intervención registrado.

- La interfaz no altera energía, posiciones ni temperaturas para conseguir un desenlace visual.

- Los residuos de reserva y calor permanecen dentro de tolerancias definidas y se registra cuándo satura la transferencia de color.

- Se informa si el tiempo simulado no sigue al reloj o si la captura no alcanza la tasa de cuadros prevista.

La grabación de video necesitaría una función de captura del canvas y composición de anotaciones, o una grabación externa de pantalla. En el estado actual se dispone de PNG; no debe anunciarse exportación de video hasta implementarla y probarla. Alojamiento estático en Hugo, GitHub Pages o Cloudflare facilita compartir el HTML, pero el cálculo continúa en el navegador del visitante y no gana potencia por alojarse en un servidor.

## 17 Fuentes y alcance de la revisión

### Fuentes primarias del proyecto

**P1.** [README del proyecto](https://github.com/lemeit/simus). Base conceptual y secuencia v01 a v08 y B1. La referencia efectivamente revisada fue la copia local del repositorio; no se comprobó su igualdad completa con la versión remota.

**P2.** Código de los primeros simuladores en el [repositorio simus](https://github.com/lemeit/simus). Archivos revisados: `index.html`, `v02-gradiente.html`, `test_3D.html`, `v03-raymarching.html`, `v04-grayscott.html`, `v05-fhn.html`, `v06-ciclovida.html`, `v07-3d.html`, `v08-espaciotiempo.html`, `bestiario.html`.

**P3.** Archivo `seres_termicos_V4_1.html` aportado para la revisión y versiones locales V4.2, V4.2.1, V4.3, V4.4, V4.5 y V4.6. Se contrastaron ecuaciones, parámetros, balances y cambios de render. Los ensayos de desarrollo de las versiones recientes respaldan las verificaciones descritas. Estas versiones aún eran locales durante la preparación original de la guía. Desde el 19 de octubre de 2026 están disponibles en el [índice de simulaciones](README.md).

**P4.** [Sitio de Seres Térmicos](https://profe.lemeit.ar/projects/seres-termicos/) y [repositorio público indicado por el autor](https://github.com/lemeit/simus). La documentación literaria se conserva como referencia del README; no se cotejaron en esta revisión las ediciones originales ni todas las atribuciones bibliográficas a Steiner.

### Referencias de contraste científico

#### R1

**R1.** Ilya Prigogine. Conferencia Nobel de Química de 1977 sobre tiempo, estructura y fluctuaciones. Se consultó la información indexada de la conferencia; el acceso directo al PDF fue limitado. Referencia para estructuras disipativas y el marco de sistemas abiertos: https://www.nobelprize.org/uploads/2018/06/prigogine-lecture.pdf

#### R2

**R2.** John E. Pearson. Complex Patterns in a Simple System, 1993. Prepublicación del autor: https://arxiv.org/abs/patt-sol/9304003 . DOI del artículo: https://doi.org/10.1126/science.261.5118.189 . Referencia para la diversidad de patrones, división y colapso de manchas en reacción difusión.

#### R3

**R3.** Eugene M. Izhikevich y Richard FitzHugh. FitzHugh Nagumo model, Scholarpedia 1(9), 1349, 2006. Registro y ecuaciones consultados mediante la información indexada: https://doi.org/10.4249/scholarpedia.1349 . La forma exacta de la ecuación de esta guía se contrastó con v05-fhn.html.

#### R4

**R4.** Neville Hogan. Heat Transfer and the Second Law. MIT OpenCourseWare, curso 2.141 de 2006. Material docente primario sobre conducción, signo del flujo y producción de entropía: https://ocw.mit.edu/courses/2-141-modeling-and-simulation-of-dynamic-systems-fall-2006/5b5774760fca05d98c89ba06b88808d0_heat_transfer.pdf

Las referencias científicas explican marcos generales; no validan automáticamente estos parámetros, esta implementación ni una equivalencia entre los agentes y la vida biológica. El contenido físico registra el estado revisado el 16 de octubre de 2026, con un preset visual propuesto. Esta edición adapta su presentación a GitHub y actualiza las notas sobre la publicación de los archivos, sin cambiar las ecuaciones.
