---
title: "GitHub Spec-Kit: /specify, /plan, /tasks para su agente IA"
description: "¿Sus agentes IA se desvían de su intención? El spec-kit de GitHub transforma su requerimiento en especificación ejecutable con 3 comandos. Así es como funciona."
pubDate: 2025-11-15
lang: "es"
translationKey: "2025-11-15"
---

Desde mayo de 2025, BMAD demostró que es posible salir del vibe coding. Al imponer un equipo de agentes especializados, analista, PM, arquitecto, dev, QA, que se transfieren artefactos estructurados, garantiza que la IA produzca exactamente lo que usted especificó. Funciona. Y también es un framework completo, con una curva de configuración real.

GitHub ha respondido con el spec-kit, lanzado en noviembre de 2025: ¿y si se pudiera hacer la misma apuesta desde el lado de la especificación, pero de forma mucho más ligera?

Una CLI. Tres comandos. Y su intención se transforma en especificación ejecutable para el agente IA que ya utiliza. Este es el principio del spec-driven development: menos iteraciones, más fiabilidad.

---

## El problema que resuelve el spec-kit de GitHub

Usted usa Cursor, Claude, Copilot u otro agente IA para desarrollar. Le describe lo que quiere. Produce algo. No es exactamente eso, reformula, corrige, otra cosa cambia. Itera.

No es vibe coding en sentido estricto: usted tiene un objetivo. Pero el agente IA no tiene una spec. Trabaja desde un prompt, no desde un documento estructurado que describa con precisión qué debe hacer el sistema, cómo se mide el éxito, y qué no debe hacer bajo ninguna circunstancia.

La diferencia entre un prompt y una especificación ejecutable es la diferencia entre "constrúyeme algo que se parezca a esto" y "aquí está el contrato exacto de lo que debes entregar".

Spec-kit produce ese pliego de condiciones estructurado. En tres comandos.

---

## Los tres comandos del spec-kit de GitHub

### `/specify`: transformar la intención en documento estructurado

Usted describe su requerimiento en lenguaje natural. Lo que quiere construir, para quién, en qué contexto, con qué restricciones. `/specify` abre un diálogo estructurado: hace preguntas de aclaración, identifica las zonas grises, y produce un documento de especificación para agente IA completo.

Ese documento no es un pliego de condiciones en PDF. Es un archivo de especificación estructurada que su agente IA puede leer como input directo. Contiene:

- El contexto y los objetivos
- Las funcionalidades requeridas, con su prioridad
- Los criterios de aceptación para cada funcionalidad
- Las restricciones técnicas y las dependencias
- Los casos límite y los comportamientos en caso de error

Lo que `/specify` hace y que usted no haría de forma natural en un prompt: impone la exhaustividad. No le permite ignorar los casos límite. No le permite escribir "la herramienta debe gestionar los errores" sin definir qué significa eso en concreto. Ese es el rol de la especificación para agente IA: acotar la intención antes de abrir el flujo de trabajo IA.

### `/plan`: descomponer la spec en pasos ejecutables

Una vez producida la spec, `/plan` la traduce en un plan de implementación. Descompone el proyecto en módulos, secuencia las dependencias e identifica los puntos de atención técnicos.

Ese plan es lo que su agente IA recibe para trabajar. No "construye este módulo", sino "aquí está el módulo, esto es lo que debe hacer, de esto depende, así se valida que es correcto".

El plan es también lo que le permite pilotar. Cada etapa está delimitada, con un entregable esperado y criterios de validación. Ya no mide el avance por intuición, sino por lo que se ha entregado y validado. Ahí es donde el desarrollo IA estructurado por la especificación cobra todo su sentido.

### `/tasks`: generar la lista de tareas para el agente

`/tasks` toma el plan y genera la lista de tareas concretas para el agente IA. Cada tarea es atómica, con su contexto, sus inputs, sus outputs esperados y sus dependencias.

Es el nivel de instrucción al que un agente IA trabaja de forma fiable. No una descripción general: una tarea precisa con un perímetro claro.

Lo que cambia en la práctica: su agente IA ya no "adivina" qué debe hacer. Recibe una tarea delimitada, produce un output definido, pasa a la siguiente. El resultado final es coherente porque cada tarea fue diseñada para serlo.

---

## Qué da esto en la práctica

La responsable de producto de una scale-up B2B usó spec-kit en un módulo de exportación de informes en octubre de 2025. Treinta minutos para expresar el requerimiento a `/specify`. Una hora para validar el documento producido y ajustar dos criterios de aceptación. `/plan` secuenció el proyecto en seis módulos. `/tasks` generó 23 tareas para el agente.

Duración del desarrollo: once días. Alineamiento con la spec inicial: 96 %. Ningún ciclo de reformulación durante el proceso.

"La diferencia es que leí el documento de spec y dije sí o no en cada punto antes de que se codificara nada. El agente no tuvo que adivinar. El 4 % de desviación son casos límite que yo había especificado de forma incompleta: soy yo, no el agente."

Un jefe de proyecto de una agencia digital lo utilizó en un proyecto de cliente en noviembre de 2025. Tres desarrolladores, un alcance de seis semanas. Cada semana, `/tasks` genera las tareas para la semana siguiente desde el plan. Los desarrolladores saben exactamente qué producir. El cliente sabe exactamente cómo validar.

"Dividimos por tres el tiempo dedicado a reuniones de encuadre. La spec hace ese trabajo en nuestro lugar."

> **¿Está pasando a un desarrollo IA estructurado?** Una [integración IA estructurada](https://izybiz.fr/integration-ia) cubre casos de uso, gobernanza, flujos de trabajo y herramientas, con resultados medibles desde el día 30. [Hablemos.](https://izybiz.fr/contact)

---

## Spec-kit de GitHub o BMAD: cuál elegir

La pregunta no es cuál es mejor. Es cuál corresponde a su proyecto.

| | spec-kit | BMAD |
|---|---|---|
| **Lo que aporta** | Especificación estructurada para el agente que ya utiliza | Equipo completo de agentes especializados en todo el ciclo |
| **Complejidad de implantación** | Baja, CLI, tres comandos | Media a alta, configuración de 21 agentes |
| **Punto de entrada** | Su agente IA actual (Cursor, Claude, Copilot...) | Sustitución de su flujo de trabajo de desarrollo |
| **Tipo de proyecto** | Módulo o herramienta delimitada, primer proyecto estructurado | Producto completo, varios módulos interdependientes |
| **Perfil requerido** | Referente de spec de negocio + dev para validación | Dev senior para orquestación de agentes |
| **Lo que conserva** | Sus herramientas actuales, añade la spec | Adopta el framework completo |

Spec-kit se inserta en su flujo de trabajo existente. Usted conserva el agente IA que ya utiliza: simplemente le da con qué trabajar de forma fiable.

BMAD reemplaza el flujo de trabajo. Impone su propia cadena de agentes especializados, su propia lógica de artefactos, su propia gobernanza.

**La regla práctica:** comience por el spec-kit de GitHub. Si su proyecto supera un módulo delimitado, o si quiere industrializar el modelo en proyectos complejos, considere BMAD para el siguiente paso.

Ambos resuelven el mismo problema: la ausencia de especificación estructurada en el desarrollo IA. Lo resuelven con distintos niveles de sofisticación, para contextos diferentes.

---

## Los dos errores que debe evitar con spec-kit

**Spec vaga, resultado vago.** `/specify` hace preguntas: respóndalas con precisión. "La herramienta debe permitir hacer seguimiento de las oportunidades" no es una spec. "La herramienta muestra las oportunidades en curso ordenadas por probabilidad de cierre, con una alerta cuando una oportunidad no ha tenido actividad en 7 días" sí lo es. La calidad del documento de especificación determina la calidad del entregable.

**Valide la spec antes de codificar.** El documento producido por `/specify` no es definitivo: es el punto de partida de una validación. Léalo. Corrija lo que no corresponde. Añada lo que falta. La inversión está ahí, no en los ciclos de reformulación durante el desarrollo.

---

## Lo que el spec-kit de GitHub cambia para sus proyectos IA

El problema del vibe coding no es la velocidad. Es la ausencia de contrato entre lo que usted quiere y lo que la IA produce.

El spec-kit de GitHub crea ese contrato. En treinta minutos o hasta dos días según la complejidad del proyecto, usted produce una especificación ejecutable que su agente IA puede seguir fielmente, que su equipo puede validar, y que usted puede auditar si algo no corresponde.

No es una restricción más en su proceso. Es la restricción que hace útiles a las demás. Es lo que los equipos que pilotan verdaderamente su flujo de trabajo IA han comprendido: la especificación estructurada precede a la ejecución.

¿Tiene proyectos de desarrollo IA que estructurar? Podemos acompañarle en la implantación de spec-kit o BMAD según su contexto, desde el primer documento de spec hasta el [pilotaje del rendimiento](https://izybiz.fr/pilotage-performance) de los entregables. Una [misión de dirección de transición tecnológica / CTO interino](https://izybiz.fr/management-de-transition) sienta las bases en 90 días. [Hable de su situación.](https://izybiz.fr/contact)
