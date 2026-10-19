# Seres Térmicos

Laboratorio de simulación inspirado en los seres de temperaturas cambiantes de Borges y Guerrero. El proyecto explora difusión térmica, patrones de reacción-difusión y organismos activos con órganos, reservas finitas y respuesta a perturbaciones.

## Empezar por la versión actual

**[V4.6 — Amenazas y respuesta adaptativa](seres_termicos_V4_6.html)** es la versión más completa. Incluye seres móviles en tres dimensiones, nacimiento y extinción, intercambio de calor, reserva finita, viñetas con ecuaciones y una vista simultánea de puntos sin halos.

Permite introducir un frente térmico o un sifón de reserva y comparar la respuesta con y sin defensa adaptativa. El movimiento, el ciclo vital y la defensa tienen reglas explícitas; no se presentan como vida biológica que emerge de la difusión por sí sola.

## Cómo ejecutar las simulaciones

Los enlaces a archivos `.html` de este README abren **el código en GitHub**, no una simulación ejecutándose. GitHub no ejecuta los scripts de los archivos del repositorio ni los estilos y scripts de un README.

1. [Descargá el repositorio como ZIP](https://github.com/lemeit/simus/archive/refs/heads/main.zip) y descomprimilo, o actualizá tu copia local.
2. Abrí el [catálogo de la raíz](../index.html) **desde la carpeta descargada**, o abrí directamente el HTML de la versión que quieras probar.
3. Usá un navegador con WebGL2 y aceleración gráfica para las versiones tridimensionales.

La serie V4 puede abrirse con doble clic, sin servidor ni bibliotecas externas. Un servidor local también sirve, pero no aumenta la potencia de cálculo: la simulación se ejecuta en el navegador de tu computadora. El sitio de documentación y sus simulaciones publicadas están en [profe.lemeit.ar](https://profe.lemeit.ar/projects/seres-termicos/).

## Últimas simulaciones

Estas versiones están guardadas como archivos independientes para poder comparar su evolución. La numeración **V4.4** no corresponde al archivo antiguo **v04-grayscott.html**.

| Versión | Archivo y cambio principal |
| --- | --- |
| V4.1 | [Base funcional con WebGL2 y textura 3D R8](seres_termicos_V4_1.html). Cinco gaussianas iniciales que difunden. Versión histórica anterior a las correcciones del recorrido del rayo. |
| V4.2 | [Campo y forma](seres_termicos_V4_2.html). Cinco anatomías iniciales, difusión persistente, iluminación ilustrativa y modo científico. |
| V4.2.1 | [Vista compacta y calidad automática](seres_termicos_V4_2_1.html). Mejora el tamaño de la interfaz y el coste gráfico. |
| V4.3 | [Bestiario de frío y fuego](seres_termicos_V4_3.html). Fuentes articuladas, latido, deriva y cuerpos calientes o fríos sostenidos por el exterior. |
| V4.4 | [Bestiario en movimiento](seres_termicos_V4_4.html). Intercambio conservativo, reservas individuales, ciclo de vida, trayectorias 3D y viñetas ancladas. |
| V4.5 | [Campo y vista cinemática simultánea](seres_termicos_V4_5.html). Recuadro de centros u órganos sin halos y guía de la evolución de los modelos. |
| **V4.6** | **[Amenazas y respuesta adaptativa](seres_termicos_V4_6.html)**. Creación manual, extinción, recarga explicada, perturbaciones externas y defensa con costes de energía. |

## Simuladores anteriores y ramas del proyecto

| Rama | Simulación | Qué explora |
| --- | --- | --- |
| Campo térmico | [v01 — El campo](index.html) | Difusión 2D y fuentes gaussianas móviles. |
| Campo térmico | [v02 — Gradiente](v02-gradiente.html) | Respuesta de agentes al gradiente de temperatura. |
| Diagnóstico | [Prueba WebGL2 y textura 3D](test_3D.html) | Compatibilidad gráfica del navegador. |
| Volumen | [v03 — Ray marching](v03-raymarching.html) | Antecedente técnico del render volumétrico; reconstruye el campo en cada cuadro. |
| Reacción-difusión | [v04 — Gray–Scott](v04-grayscott.html) | Patrones de concentraciones con autocatálisis. No es difusión de temperatura ni una demostración de vida. |
| Medio excitable | [v05 — FitzHugh–Nagumo](v05-fhn.html) | Activación, recuperación, ondas y espirales. |
| Individuos | [v06 — Ciclo de vida 2D](v06-ciclovida.html) | Presupuesto energético individual y reglas explícitas de nacimiento y muerte. |
| Cosmos | [v07 — Campo 3D y doble perspectiva](v07-3d.html) | Vista exterior esférica y vista desde un ser. |
| Historia | [v08 — Espaciotiempo](v08-espaciotiempo.html) | Historial de un campo 2D apilado: el tercer eje representa tiempo. |
| Anatomía | [B1 — Bestiario articulado](bestiario.html) | Órganos térmicos, fuego innato, termotaxis, fichas y crónica. |

## Documentación y ecuaciones

- [Guía física y cronológica completa](guia-fisica-cronologica-seres-termicos.md): ecuaciones, parámetros, límites, balances y propuesta de una futura versión visual simplificada.
- [README general del proyecto](../README.md): contexto original y desarrollo de las primeras ramas.
- [Documentación en el sitio del autor](https://profe.lemeit.ar/projects/seres-termicos/).

La guía distingue temperatura relativa, calor almacenado y reserva de trabajo disponible. La termotaxis y la respuesta adaptativa son hipótesis de control añadidas: la ley de Fourier, por sí sola, no define conducta ni organismos.

## Qué observar en V4.6

- **Recargar reserva de nacimientos** añade presupuesto común; no calienta el campo ni recarga a los seres existentes.
- **Crear un ser ahora** transfiere una reserva individual y declara un aporte externo si hace falta.
- **Extinguir toda la vida** retira reservas y detiene nacimientos, conservando el calor residual.
- **Evento externo** introduce una perturbación localizada; **Respuesta adaptativa** permite comparar regulación, escape y ahorro con su coste energético.
- Las **viñetas** siguen acciones del modelo y muestran sus ecuaciones. El **recuadro de puntos** comparte el mismo estado y cámara; representa agentes u órganos, no moléculas de un gas.
- La malla que puede aparecer con mucho zoom pertenece a la discretización del campo; no es una estructura física del ser.

La edición visual simplificada para redes está propuesta en la guía; todavía no se incluye un simulador V4.7.
