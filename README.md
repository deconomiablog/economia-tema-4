# Laboratorio de mercado — Tema 4

Web de autoevaluación para Economía de 1.º de Bachillerato. D'economíaBlog.

## Probarla

Abre `index.html` en un navegador. No requiere instalación, servidor, claves, registro ni conexión para las actividades. El almacenamiento local al abrir archivos puede depender del navegador; GitHub Pages proporciona un origen estable.

## Contenido

60 preguntas, 12 por bloque: demanda; oferta; equilibrio de mercado; cambios simultáneos; elasticidad de demanda y oferta. Incluye 14 cálculos, preguntas conceptuales y de verdadero/falso razonado, gráficos SVG trazados a partir de funciones, pistas y explicación de las respuestas.

Tres modos: Aprender (pistas y corrección inmediata), Practicar (sin pistas), Comprobarme (corrección final). Sesiones mixtas de 15 preguntas, tres de cada bloque. Orden aleatorio de preguntas y alternativas, repaso de errores, reanudación de sesión y descarga del progreso en texto.

Cada barra refleja cuántas preguntas distintas están correctas en el último intento, no una estimación de dominio. El informe final muestra los errores conceptuales a repasar. No sustituye la evaluación docente.

## Publicar en GitHub Pages

1. Crea un repositorio llamado `economia-tema-4`. Para GitHub Free, usa un repositorio público.
2. Sube el contenido de esta carpeta a la raíz del repositorio. `index.html` debe quedar en la raíz, no dentro de otra carpeta.
3. En Settings → Pages, selecciona Deploy from a branch, rama main y carpeta /(root), y guarda.
4. Espera la publicación y usa la dirección que muestre GitHub. No necesita GitHub Actions personalizado ni compilación.

Guía oficial: https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## Archivos y mantenimiento

- `index.html`: web completa, autónoma, con estilos, lógica y preguntas incluidas.
- `questions.json`: copia editable del banco. Para cambiar preguntas, edita este archivo y ejecuta `python3 actualizar.py`; se actualiza la copia dentro del HTML.
- `actualizar.py`: sincronización del banco de preguntas.
- `verificar.cjs`: pruebas sin dependencias (`node verificar.cjs`).
- `.nojekyll`: evita procesamientos de Jekyll. No hay dependencias externas.

En las opciones, `correct` indica el índice correcto antes de barajar; no la letra que verá el alumnado. Los identificadores deben ser estables para conservar el progreso. Si cambias el significado de preguntas existentes, cambia también la clave KEY del almacenamiento en index.html para empezar una versión nueva del progreso.

## Criterios didácticos

Basado en el tema fuente y las actualizaciones trabajadas en la conversación. Se distingue demanda de cantidad demandada, precio propio de otros determinantes y pendiente de elasticidad. Los cambios de equilibrio suponen D decreciente y O creciente habituales. Los cálculos de elasticidad utilizan porcentajes sobre valores iniciales y valor absoluto para demanda. La curva Q=1000/P tiene elasticidad puntual unitaria e ingreso constante; no se infiere elasticidad unitaria mediante porcentajes iniciales de un salto finito.

## Privacidad y límites

Las respuestas solo se guardan en localStorage del navegador. No se solicitan nombres, no hay analítica ni llamadas a servicios externos. Borrar datos del navegador elimina el progreso. No se sincroniza entre dispositivos y, en equipos compartidos, conviene borrar el progreso al cambiar de estudiante. GitHub recibe las peticiones habituales al servir la página; la aplicación no le envía las respuestas.

Las soluciones forman parte de los archivos públicos: esta web es para práctica autónoma, no para un examen protegido. La descarga del progreso es informativa y no constituye un registro docente verificado.

## Verificación

Pruebas automatizadas de las 60 respuestas correctas, reparto por bloques, valores numéricos, gráficos, entrada decimal, errores, doble envío, informe y recuperación de sesión. Prueba manual en navegador de una sesión completa, corrección incorrecta, pistas, recarga y corrección diferida. Diseño adaptable con CSS para móvil; no se ha realizado una prueba física en móvil.
