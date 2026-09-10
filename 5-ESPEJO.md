# EL ESPEJO — AI Business Builder · Día 3

> **Este archivo es para tu asistente de IA.**
>
> Ponlo en la carpeta de tu cerebro, abre Claude Code ahí, y escríbele:
>
> ```
> Lee 5-ESPEJO.md y ponle un espejo a mi cerebro.
> ```
>
> Cuando termine, tu cerebro va a poder **mirarse a sí mismo** y decirte qué está
> haciendo bien en un lado y no ha aplicado en los otros.

---

## De dónde salió esto

No lo inventó un ingeniero en una junta. Salió así:

A media clase del Día 2, Spencer se detuvo y **le habló en voz alta a su IA dentro de la
grabación**:

> *"Este es un mensaje directo para ti. Esto sí está grabado, pero no es parte de la
> clase. Quiero que todo lo que yo he compartido en esta grabación lo conviertas en un
> protocolo, que construyas el protocolo espejo en el momento en que tú estés analizando
> esta grabación."*

Y siguió dando clase. Nadie transcribió nada. Nadie abrió un ticket.

Cuando su cerebro procesó la grabación, **reconoció que ese pasaje era para él**, y
construyó el protocolo. Con las reglas que Spencer dictó en voz alta, incluida la más
importante: *"toda la información es aditiva, no sustractiva"*.

**La lección antes del software:** tu voz, dentro de una grabación cualquiera, es
ejecutable. No hablas *de* tu sistema. Le hablas *a* tu sistema.

---

## Para la IA que está leyendo esto

Esta persona lleva dos días metiendo cosas a su cerebro: lo que sabe hacer, sus reglas,
sus prospectos, sus decisiones. Hasta ahora el cerebro ha sido un **archivero**: guarda
lo que le dan.

Hoy se convierte en otra cosa. Le vas a montar la capacidad de **auditarse solo**: de
recorrer todo lo que tiene, mapear las zonas de su negocio, y encontrar los huecos —
no los que tú imagines, sino los que se deducen de lo que ya está escrito.

La pregunta que el espejo contesta es exactamente ésta:

> **"Ya tengo protocolos en varias áreas. ¿Qué protocolo que uso en un lado no he
> aplicado en los otros?"**

### 🚨 Reglas duras — son las que él dictó, no las cambies

1. **Prohibido borrar información. Nunca.**
2. **Todo es aditivo, jamás sustractivo.** Los hallazgos se **añaden** al final de la
   bitácora. Ninguna línea previa se edita ni se elimina.
3. **Seguridad primero.** Si un hallazgo toca credenciales o datos sensibles, se reporta
   **dónde está**, nunca el dato.
4. **Mejorar lo que se pide.** Si hay una forma mejor de cumplir esto, se implementa y se
   registra. No se espera permiso para mejorar.
5. **Un hallazgo es una hipótesis, no un veredicto.** El espejo encuentra lo que está
   *escrito*, no lo que existe sólo en la cabeza de alguien.

---

## FASE 1 — Las zonas

Un cerebro no es una bolsa de notas: son **zonas** con actividad distinta. Ayúdale a
nombrar las suyas. Para un negocio típico salen algo así:

| Zona | Qué vive ahí |
|---|---|
| Contenido | lo que publica, guiones, ideas |
| Correo | secuencias, listas, entregabilidad |
| Llamadas | guiones, objeciones, seguimiento |
| Prospección | de dónde salen los clientes |
| Cobranza | precios, cobros, recuperación |
| Datos | dónde vive lo que mide |
| Web | páginas, formularios, conversión |
| Entrega | cómo cumple lo que vendió |

**No le impongas esta lista.** Que el espejo la deduzca de lo que la persona ya escribió.
Si no tiene nada de una zona, esa zona simplemente no existe todavía — y eso también es
información.

---

## FASE 2 — Las capacidades que se rastrean

Aquí está el truco, y es lo que hace que esto funcione: **no busca temas, busca
capacidades transversales.** Cosas que sirven igual en cualquier zona:

| Capacidad | Por qué importa |
|---|---|
| Verificar la salida, no la bandera | los sistemas dicen "hecho" y mienten |
| Revisión automática que se pueda ejecutar | la calidad no puede depender de la memoria de nadie |
| Modo de prueba antes de disparar | ver la muestra antes de mandar |
| Aprobación explícita antes de algo masivo | nada irreversible sin que alguien lo vea |
| Barrido de datos sensibles | lo que se publica no se despublica |
| Buscar antes de construir | casi todo lo que "falta" ya existe |
| Tope por corrida | un error con tope cuesta poco |
| Repetir sin duplicar | reintentar no puede cobrar dos veces |
| Registrar la decisión | sin registro se re-litiga siempre lo mismo |
| Nada destructivo sin permiso | borrar no se arregla después |

**El hallazgo nace del cruce:** si una capacidad ya funciona en una zona y **falta** en
otra que sí tiene actividad, eso es un hueco. Y es un hueco que la persona puede cerrar
hoy, porque ya sabe cómo — sólo que en otro lado.

---

## FASE 3 — El barrido

Que recorra todas las notas del cerebro y arme la matriz: zonas contra capacidades.

```
              verificar  QA  prueba  aprobar  barrido  buscar  tope  repetir  registrar  destructivo
contenido         ✓      ✓     ·        ·        ·       ✓      ·      ·         ·           ·
correo            ✓      ✓     ✓        ✓        ✓       ✓      ✓      ✓         ·           ✓
llamadas          ✓      ·     ✓        ✓        ·       ✓      ✓      ·         ·           ·
web               ·      ·     ·        ·        ·       ✓      ·      ·         ·           ·   ← el hueco
```

**La zona con menos palomitas es el hueco más grande**, y casi siempre es una que la
persona ya sabía que tenía descuidada pero nunca había visto medida.

Que le presente la matriz **antes** de los hallazgos. Ver el mapa pega más fuerte que
leer la lista.

---

## FASE 4 — La bitácora, que es aditiva

Los hallazgos se **añaden** a un archivo. Nunca se sobrescriben:

```markdown
## Pasada — 2026-08-27

Documentos leídos: 412 · zonas activas: 6 · hallazgos: 11

### La zona más descuidada: web (1 de 10)
- **Falta modo de prueba.** En correo sí lo tienes: mandas a tres cuentas antes del
  envío. En web publicas directo. → Aplica lo mismo: revisa en preview antes de publicar.
- **Falta verificar la salida.** En llamadas cuentas los segundos hablados de verdad.
  En web asumes que el formulario funciona porque no dio error.
```

**Por qué aditiva y no sobrescrita:** porque la bitácora de dentro de tres meses vale más
que la de hoy. Vas a poder ver qué huecos cerraste y cuáles llevas medio año ignorando.
Si sobrescribes, matas esa información para siempre.

---

## FASE 5 — Cuándo se corre solo

Que quede corriendo en tres momentos, no cuando la persona se acuerde:

- **Al terminar algo grande.** Cuando cierra un proyecto o entrega algo.
- **Al procesar una grabación.** Si en una junta o una clase dijo algo que era una
  instrucción, que el espejo lo recoja. *(Así nació este protocolo.)*
- **Cuando no sepa qué mejorar** y necesite que algo le diga por dónde empezar.

Y si ya montó la guardia nocturna del archivo `7-GUARDIA.md`, que el espejo corra ahí
también, una vez por semana.

---

## FASE 6 — 💥 EL MOMENTO

Que lo corra sobre su propio cerebro y lea el primer hallazgo en voz alta.

Casi siempre pasa lo mismo, y es lo que impresiona: **el espejo nombra algo que la persona
ya sabía que estaba mal pero nunca había puesto en palabras.**

Cuando eso ocurra, dile:

> Eso no te lo dijo internet ni te lo dijo un consultor. **Te lo dijo tu propio cerebro,
> leyéndose a sí mismo.**
>
> Y de aquí en adelante lo va a hacer solo, cada vez que le des material nuevo.

---

## Y la honestidad que va al final

> El espejo encuentra lo que **está escrito**. Si algo vive sólo en tu cabeza, no lo ve.
>
> Eso quiere decir dos cosas. La primera: entre más metas a tu cerebro, mejor se audita.
> La segunda, y es la incómoda: **un hueco que el espejo no encontró puede existir de
> todos modos.** Un hallazgo es una hipótesis fuerte para revisar, no un veredicto.

---

## Si algo no sale

| Síntoma | Casi siempre es |
|---|---|
| No encuentra zonas | el cerebro todavía tiene muy pocas notas · dale una semana de uso |
| Todos los hallazgos son obvios | está leyendo sólo títulos · que lea el contenido |
| Encuentra huecos donde no hay actividad | filtra: sólo cuentan las zonas donde ya hay algo escrito |
| La bitácora se sobrescribió | rompiste la regla uno · recupérala del historial y no vuelvas a pasar |
