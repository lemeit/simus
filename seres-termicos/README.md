# Seres Térmicos

[![sitio: profe.lemeit.ar](https://img.shields.io/badge/sitio-profe.lemeit.ar-009688?style=flat-square&labelColor=555555)](https://profe.lemeit.ar/projects/seres-termicos/)
[![docs: guía física](https://img.shields.io/badge/docs-gu%C3%ADa%20f%C3%ADsica-009688?style=flat-square&labelColor=555555)](https://github.com/lemeit/simus/blob/main/seres-termicos/guia-fisica-cronologica-seres-termicos.md)
[![relato: Acto XIV](https://img.shields.io/badge/relato-Acto%20XIV-FF5722?style=flat-square&labelColor=555555)](https://github.com/lemeit/simus/blob/main/seres-termicos/seres_termicos_V4_6.html)
[![diseño: lemeit](https://img.shields.io/badge/dise%C3%B1o-lemeit-009688?style=flat-square&labelColor=555555)](https://design.lemeit.ar)

A partir de «Los seres térmicos», de Jorge Luis Borges y Margarita Guerrero, este proyecto explora el encuentro entre literatura, física y simulación. La imagen de seres hechos de temperaturas cambiantes abre una pregunta: ¿cómo representar esas formas y qué leyes o hipótesis podrían sostenerlas?

[Leer «Los seres térmicos» en *El libro de los seres imaginarios* (PDF, página 62)](https://tavapy.gov.py/biblioteca/wp-content/uploads/2023/01/BorgesJ-El-libro-de-los-seres-imaginarios.pdf#page=62). Texto de Borges y Margarita Guerrero, disponible en la biblioteca digital de la Municipalidad de Tavapy.

## Empezar por el Prólogo

**[Prólogo — El primer encuentro](v00-contacto-termico.html)** presenta dos cuerpos que intercambian calor. Desde allí, el [recorrido visual](termodinamica.html) sigue por ocho actos hasta la difusión en un volumen y en el tiempo.

Las nueve actividades ya están disponibles: animaciones o exploraciones de modelo, gráficas cartesianas y pocos controles. Los detalles se despliegan al pedirlos. Funcionan sin servidor ni WebGL. [Ver el recorrido y sus modelos](recorrido-termodinamica.md).

La [tabla de nombres públicos y archivos técnicos](denominaciones.md) mantiene coherentes el catálogo, las guías y el sitio. La numeración de versiones se conserva para trazabilidad, no como título público.

## Acto XIV · Resistir hasta agotarse

**[Acto XIV · Escena VII — Resistir hasta agotarse](seres_termicos_V4_6.html)** es la versión más completa. Incluye seres móviles en tres dimensiones, nacimiento y extinción, intercambio de calor, reserva finita, viñetas con ecuaciones y una vista simultánea de puntos sin halos.

Permite introducir un frente térmico o un sifón de reserva y comparar la respuesta con y sin defensa adaptativa. El movimiento, el ciclo vital y la defensa tienen reglas explícitas; no se presentan como vida biológica que emerge de la difusión por sí sola.

## Cómo ejecutar las simulaciones

Los enlaces a archivos `.html` de este README abren **el código en GitHub**, no una simulación ejecutándose. GitHub no ejecuta los scripts de los archivos del repositorio ni los estilos y scripts de un README.

1. [Descargá el repositorio como ZIP](https://github.com/lemeit/simus/archive/refs/heads/main.zip) y descomprimilo, o actualizá tu copia local.
2. Abrí el [catálogo de la raíz](../index.html) **desde la carpeta descargada**, o abrí directamente el HTML de la versión que quieras probar.
3. Usá un navegador con WebGL2 y aceleración gráfica para las versiones tridimensionales.

La serie V4 puede abrirse con doble clic, sin servidor ni bibliotecas externas. Un servidor local también sirve, pero no aumenta la potencia de cálculo: la simulación se ejecuta en el navegador de tu computadora. El sitio de documentación y sus simulaciones publicadas están en [profe.lemeit.ar](https://profe.lemeit.ar/projects/seres-termicos/).

## Las escenas del acto XIV

Estas versiones están guardadas como archivos independientes para poder comparar su evolución. La numeración **V4.4** no corresponde al archivo antiguo **v04-grayscott.html**.

| Versión | Archivo y cambio principal |
| --- | --- |
| Escena I | [Acto XIV · Escena I — El primer volumen térmico](seres_termicos_V4_1.html). Cinco gaussianas iniciales que difunden. Versión histórica anterior a las correcciones del recorrido del rayo. |
| Escena II | [Acto XIV · Escena II — Las formas del campo](seres_termicos_V4_2.html). Cinco anatomías iniciales, difusión persistente, iluminación ilustrativa y modo científico. |
| Escena III | [Acto XIV · Escena III — Una ventana al campo](seres_termicos_V4_2_1.html). Mejora el tamaño de la interfaz y el coste gráfico. |
| Escena IV | [Acto XIV · Escena IV — Frío y fuego articulados](seres_termicos_V4_3.html). Fuentes articuladas, latido, deriva y cuerpos calientes o fríos sostenidos por el exterior. |
| Escena V | [Acto XIV · Escena V — Nacer y extinguirse](seres_termicos_V4_4.html). Intercambio conservativo, reservas individuales, ciclo de vida, trayectorias 3D y viñetas ancladas. |
| Escena VI | [Acto XIV · Escena VI — Mirar sin halos](seres_termicos_V4_5.html). Recuadro de centros u órganos sin halos y guía de la evolución de los modelos. |
| **Escena VII** | **[Acto XIV · Escena VII — Resistir hasta agotarse](seres_termicos_V4_6.html)**. Creación manual, extinción, recarga explicada, perturbaciones externas y defensa con costes de energía. |

## Simuladores anteriores y ramas del proyecto

| Rama | Simulación | Qué explora |
| --- | --- | --- |
| Campo térmico | [Acto IX · Escena I — El campo que disuelve](index.html) | Difusión 2D y fuentes gaussianas móviles. |
| Campo térmico | [Acto IX · Escena II — Seguir el gradiente](v02-gradiente.html) | Respuesta de agentes al gradiente de temperatura. |
| Diagnóstico | [Taller técnico — Comprobar la ventana tridimensional](test_3D.html) | Compatibilidad gráfica del navegador. |
| Volumen | [Interludio técnico — Hacer visible un campo](v03-raymarching.html) | Antecedente técnico del render volumétrico; reconstruye el campo en cada cuadro. |
| Reacción-difusión | [Acto X · Escena I — Las manchas encuentran una forma](v04-grayscott.html) | Patrones de concentraciones con autocatálisis. No es difusión de temperatura ni una demostración de vida. |
| Medio excitable | [Acto X · Escena II — Las ondas recorren el medio](v05-fhn.html) | Activación, recuperación, ondas y espirales. |
| Individuos | [Acto XI — Contar a los individuos](v06-ciclovida.html) | Presupuesto energético individual y reglas explícitas de nacimiento y muerte. |
| Cosmos | [Acto XIII · Escena I — El mundo que los contiene](v07-3d.html) | Vista exterior esférica y vista desde un ser. |
| Historia | [Acto XIII · Escena II — La huella del tiempo](v08-espaciotiempo.html) | Historial de un campo 2D apilado: el tercer eje representa tiempo. |
| Anatomía | [Acto XII — Un bestiario de calor](bestiario.html) | Órganos térmicos, fuego innato, termotaxis, fichas y crónica. |

## Documentación y ecuaciones

- [Guía física y cronológica completa](guia-fisica-cronologica-seres-termicos.md): ecuaciones, parámetros, límites, balances y propuesta de una futura versión visual simplificada.
- [README general del proyecto](../README.md): contexto original y desarrollo de las primeras ramas.
- [Documentación en el sitio del autor](https://profe.lemeit.ar/projects/seres-termicos/).

La guía distingue temperatura relativa, calor almacenado y reserva de trabajo disponible. La termotaxis y la respuesta adaptativa son hipótesis de control añadidas: la ley de Fourier, por sí sola, no define conducta ni organismos.

## Qué observar en Resistir hasta agotarse

- **Recargar reserva de nacimientos** añade presupuesto común; no calienta el campo ni recarga a los seres existentes.
- **Crear un ser ahora** transfiere una reserva individual y declara un aporte externo si hace falta.
- **Extinguir toda la vida** retira reservas y detiene nacimientos, conservando el calor residual.
- **Evento externo** introduce una perturbación localizada; **Respuesta adaptativa** permite comparar regulación, escape y ahorro con su coste energético.
- Las **viñetas** siguen acciones del modelo y muestran sus ecuaciones. El **recuadro de puntos** comparte el mismo estado y cámara; representa agentes u órganos, no moléculas de un gas.
- La malla que puede aparecer con mucho zoom pertenece a la discretización del campo; no es una estructura física del ser.

La edición visual simplificada para redes está propuesta en la guía; todavía no se incluye un simulador V4.7.
