# Cómo crear el Consultor IA Omnisalud™ (GPT personalizado)

Necesitas una cuenta de **ChatGPT Plus, Team o Enterprise** para crear GPTs personalizados
(los alumnos que lo van a usar sí pueden hacerlo con cuenta gratuita si les compartes el link,
aunque con límites de mensajes según su plan).

## Pasos

1. Entra a chatgpt.com, inicia sesión, y en la barra lateral ve a **"Explorar GPTs"** →
   **"Crear"** (o "Create a GPT").
2. Se abren dos modos: "Create" (conversacional) y **"Configure"** (formulario). Usa **Configure**,
   es más rápido con lo que ya tenemos escrito.
3. Llena los campos:
   - **Name:** `Consultor IA Omnisalud™`
   - **Description:** algo como "Tu guía 24/7 dentro de Proyecto Renacer Omnisalud™. Orientación
     sobre tu programa, tus módulos y tus hábitos — no sustituye consejo médico."
   - **Instructions:** copia y pega todo el contenido de `instrucciones-sistema.md`.
   - **Conversation starters:** sugerencias, por ejemplo:
     - "¿Qué me toca esta semana según mi fase?"
     - "¿Qué módulo debo revisar si perdí la motivación?"
     - "Dame principios generales para organizar mi semana de comidas"
     - "Se me antoja mucho el azúcar, ¿qué hago?"
4. En **Knowledge**, sube `base-conocimiento.md` y también `recetario-base.md` (acepta varios
   archivos).
5. En **Capabilities**, puedes dejar activado "Web Browsing" apagado (no lo necesita) y
   "Code Interpreter" apagado — no lo necesita para esta función. Actívalos solo si luego quieres
   que genere PDFs de calendarios, por ejemplo.
6. Guarda y en "Who can access this GPT" elige:
   - **"Only me"** mientras lo pruebas.
   - **"Anyone with a link"** cuando esté listo para tus alumnos — así no queda en el directorio
     público de GPTs y solo lo abre quien tenga el link (por ejemplo, dentro de tu área de miembros
     o en un correo de bienvenida).
7. Pruébalo tú mismo con preguntas reales de un alumno nuevo, incluyendo una pregunta "trampa" de
   una receta que no existe todavía, y una pregunta de síntoma de emergencia — confirma que
   responde como se espera en instrucciones-sistema.md antes de compartirlo.

## Alternativa: Proyecto de Claude (si prefieres quedarte en Claude en vez de ChatGPT)
1. En claude.ai, crea un **Proyecto** nuevo llamado "Consultor IA Omnisalud™".
2. En "Project knowledge" sube `base-conocimiento.md`.
3. En las instrucciones personalizadas del proyecto pega `instrucciones-sistema.md`.
4. Cada alumno necesitaría su propia cuenta de Claude para entrar al proyecto (Claude no tiene hoy
   un equivalente directo a "compartir GPT por link" para que terceros lo usen sin ser colaboradores
   del proyecto) — por eso, para distribuir a muchos alumnos sin fricción, el GPT de ChatGPT es
   más práctico por ahora.

## Siguiente paso natural
Cuando tengas los primeros alumnos reales usándolo, guarda las preguntas que más se repiten y que
el asistente no supo responder bien — eso te dice exactamente qué contenido escribir primero para
`base-conocimiento.md` (probablemente empezando por el Recetario, que hoy no existe todavía).
