# Recorrido visual de termodinámica

Este orden es didáctico: no reemplaza la cronología de los primeros simuladores ni renumera sus archivos. El objetivo es pasar de cuerpos con temperatura uniforme a campos de temperatura que dependen del lugar y del tiempo. Cada etapa incorpora una pregunta, una visualización cartesiana y pocas variables.

| Etapa | Experiencia y gráfica | Ecuaciones e ideas | Estado |
| --- | --- | --- | --- |
| 00 · Contacto y equilibrio | Dos cuerpos intercambian energía; curvas T_A(t) y T_B(t), potencia y calor acumulado | Q = C·ΔT, P = G·(T_A − T_B); conservación, sentido del intercambio y equilibrio | [Disponible](v00-contacto-termico.html) |
| 01 · Calor y capacidad térmica | Calentamiento por un aporte conocido, gráfica Q frente a ΔT; comparar masas/materiales | Q = m·c·ΔT, C = m·c; sin cambio de fase | Propuesta |
| 02 · Primera ley y trabajo | Energía que entra y sale; representar Q, W y ΔU con el mismo convenio de signos | ΔU = Q − W; W positivo si lo realiza el sistema | Propuesta |
| 03 · Segunda ley y entropía | Recuperar el contacto de 00 y sumar ΔS_A, ΔS_B y ΔS_total frente al tiempo | ΔS_i = C_i·ln(T_i/T_i0), con temperaturas absolutas en K; ΔS_total ≥ 0 para la pareja aislada | Propuesta |
| 04 · Tercera ley | Gráfica conceptual de S frente a T cerca del cero absoluto, con condiciones y límites explícitos | Para un cristal perfecto con estado fundamental único, S → 0 cuando T → 0 K; no extrapolar c constante de 00 | Propuesta |
| 05 · Conducción y perfiles | Gráfica de temperatura frente a posición; conectar pendiente y flujo | Ley de Fourier; perfil estacionario lineal bajo supuestos precisos | [Recta disponible](v00-temperatura.html), explicación de Fourier a ampliar |
| 06 · Difusión 1D y tiempo | Una barra dividida en celdas; T(x) animada y termómetros T(t) | Balance entre vecinos; ecuación del calor en 1D, energía y condiciones de borde | Propuesta |
| 07 · Difusión 2D y tiempo | Mapa de temperatura, corte cartesiano y evolución de un punto | Dos coordenadas espaciales, difusión sin agentes primero | Propuesta; v01 histórico ya incorpora fuentes móviles |
| 08 · Difusión 3D y tiempo | Volumen con cortes X–Y, X–Z e Y–Z y termómetro temporal | Tres coordenadas espaciales y tiempo; no confundir valor de T con dimensión espacial | Propuesta; existen ramas volumétricas avanzadas |
| Puente a Seres Térmicos | Comparar difusión pasiva, fuentes externas, reservas y órganos | Distinguir leyes físicas de hipótesis de movimiento, reproducción y defensa | Ramas históricas y serie V4 disponibles |

## Alcance de la primera experiencia

La ley cero establece una relación transitiva de equilibrio térmico, no una velocidad de intercambio. El contacto entre dos cuerpos ilustra equilibrio, primera y segunda ley; el tercer cuerpo de la formulación de la ley cero se explica como un termómetro común, no se representa como un cuerpo adicional en la escena.

Los cuerpos son de un mismo material ideal, c = 1000 J/(kg·°C), A de 100 g y B de 100 o 200 g. Las temperaturas iniciales están entre 10 y 90 °C. Se supone mezcla interna o conducción interior suficientemente rápida para asignar una temperatura uniforme a cada cuerpo. No hay fuentes, pérdidas al ambiente, trabajo ni cambios de fase. La conductancia G es un parámetro de contacto constante; el dibujo no calcula geometría de contacto ni conducción espacial.

La solución durante cada intervalo de contacto conserva C_A·T_A + C_B·T_B y hace decaer exponencialmente la diferencia. Al separar, el intercambio se anula. El equilibrio final de un contacto sostenido es (C_A·T_A0 + C_B·T_B0)/(C_A + C_B), independiente de G. Esta expresión usa °C válidamente porque es un promedio ponderado; las ecuaciones de entropía de la etapa 03 requerirán K.

La tercera ley no significa que todo material tenga entropía nula a 0 K sin condiciones, ni que un deslizador demuestre la imposibilidad de alcanzar el cero absoluto. Su futura representación deberá declarar el modelo de material y no reutilizar la capacidad térmica constante de esta primera experiencia.

## Criterios para cada próxima entrega

- Mostrar primero el fenómeno y después su ecuación, con unidades y convenio de signos.
- Mantener controles mínimos; separar configuraciones iniciales de cambios durante la experiencia.
- Usar la misma escala de colores y ejes legibles; acompañar color con etiquetas y trazos distintos.
- Distinguir equilibrio, estado estacionario y proceso transitorio.
- Declarar cuándo una gráfica es conceptual, una solución calculada o una simulación numérica.
- Conservar energía y comprobar el comportamiento límite adecuado al modelo antes de publicar.

Referencias introductorias: [OpenStax — temperatura y equilibrio](https://openstax.org/books/university-physics-volume-2/pages/1-1-temperature-and-thermal-equilibrium), [OpenStax — calor y calorimetría](https://openstax.org/books/university-physics-volume-2/pages/1-4-heat-transfer-specific-heat-and-calorimetry).
