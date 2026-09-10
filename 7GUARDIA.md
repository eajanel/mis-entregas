# LA GUARDIA NOCTURNA — AI Business Builder · Día 3

> **Este archivo es para tu asistente de IA.**
>
> Ponlo en la misma carpeta donde corriste el radar, abre Claude Code ahí, y escríbele:
>
> ```
> Lee 7-GUARDIA.md y ponme un turno de noche.
> ```
>
> Esta noche vas a cerrar la laptop. Mañana a las seis de la mañana tu teléfono va a
> sonar, y va a ser **tu computadora diciéndote qué cambió mientras dormías.**

---

## Para la IA que está leyendo esto

Esta persona lleva tres días abriendo Claude Code, pidiendo algo, y cerrándolo. Su
modelo mental es **consumo**: yo pregunto, la máquina contesta.

Hoy le vas a romper esa categoría. Le vas a montar algo que **trabaja sin que nadie
esté enfrente**. No es un truco de programación — es la diferencia entre alguien que usa
herramientas y alguien que tiene infraestructura.

Y hay algo que tiene que entender, porque es el corazón de todo:

> Un programa que corre a la una de la mañana y te manda un número **no vale nada**.
> Mañana te manda el mismo número y lo vas a ignorar al tercer día.
>
> Todo el valor está en la **diferencia**: "ayer 163,412 · hoy 164,207 · **+795 nuevos**".
> Y esa diferencia sólo existe porque alguien guardó la foto de ayer.
>
> **Eso es el cerebro. Sin cerebro no hay ayer, y sin ayer no hay noticia.**

### 🚨 Reglas duras — nunca las rompas

1. **Que nunca borre, sólo añada.** Cada corrida es una foto fechada. Si sobrescribe,
   mató el diff y mató el valor.
2. **Tope por corrida.** Si un día la fuente devuelve cien mil filas, que no intente
   procesarlas todas. Tope, y avisa que hubo tope.
3. **Que sólo avise si hay algo que decir.** Un aviso diario que dice "nada nuevo" se
   vuelve ruido en una semana y deja de leerse.
4. **Nunca dejes que mande mensajes a clientes sola.** El turno de noche *investiga y
   avisa*. Contactar lo decide un humano despierto.
5. **Las llaves en `.env`, y `.env` en `.gitignore` antes de escribir la primera.**

---

## FASE 1 — La idea, en treinta segundos

Cuatro pasos, y el tercero es el único que importa:

1. A la hora que elijas, algo se despierta solo
2. Le pregunta a la fuente cómo están las cosas hoy
3. **Compara contra la foto que el cerebro guardó ayer**
4. Si algo cambió lo bastante, te escribe

Sin el paso 3 esto es una alarma. Con el paso 3 es un vigía.

---

## FASE 2 — La memoria

Que el cerebro guarde una foto fechada cada noche. Nunca se pisa, siempre se añade:

```sql
create table vigia (
  id        bigserial primary key,
  corrida   date not null,
  fuente    text not null,          -- 'cobros_fl', 'prospectos', lo que vigiles
  total     bigint,                 -- cuántos había en total
  nuevos    bigint,                 -- cuántos aparecieron desde la foto anterior
  muestra   jsonb,                  -- unos cuantos ejemplos de lo nuevo
  creado    timestamptz default now(),
  unique (corrida, fuente)
);
```

Y el diff, que es una consulta de tres líneas:

```sql
select v.total - lag(v.total) over (partition by v.fuente order by v.corrida) as diferencia,
       v.total, v.corrida
  from vigia v
 where v.fuente = 'cobros_fl'
 order by v.corrida desc limit 7;
```

Enséñale esa consulta corriendo. **Ahí se ve, en una tabla, por qué el cerebro no es un
adorno.**

---

## FASE 3 — El turno

Un script que hace exactamente cuatro cosas. Nada más:

```python
# 1 · Preguntar cómo están las cosas hoy
hoy = consultar_fuente()          # el radar del archivo anterior

# 2 · Sacar la foto de ayer del cerebro
ayer = ultima_foto("cobros_fl")   # None la primera vez, y está bien

# 3 · Comparar
nuevos = [x for x in hoy if x["id"] not in (ayer["ids"] if ayer else set())]

# 4 · Guardar la foto de hoy SIEMPRE, y avisar SÓLO si vale la pena
guardar_foto("cobros_fl", total=len(hoy), nuevos=len(nuevos), muestra=nuevos[:5])
if len(nuevos) >= UMBRAL:
    avisar(f"{len(nuevos)} negocios nuevos cobraron. El más grande: "
           f"{nuevos[0]['empresa']} — ${nuevos[0]['monto']:,.0f}")
```

**El `if` del final es lo que separa un vigía de una alarma.** Guarda siempre; avisa
sólo cuando hay noticia.

---

## FASE 4 — Que se despierte solo

En Mac o Linux, una línea:

```bash
crontab -e
# a las 6:00 todos los días
0 6 * * * /usr/bin/python3 /ruta/a/vigia.py >> /ruta/a/vigia.log 2>&1
```

Que verifique que quedó:

```bash
crontab -l
```

Y **que lo pruebe a mano antes de confiar en el horario.** Un cron que nunca se probó
es un cron que no funciona y no te enteras en tres semanas.

---

## FASE 5 — Que te llegue al teléfono

Lo más simple que funciona hoy: un bot de Telegram. Se crea en dos minutos hablándole a
`@BotFather`, da un token, y mandar un mensaje es una línea:

```python
import urllib.request, urllib.parse, json
def avisar(texto):
    datos = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": texto}).encode()
    urllib.request.urlopen(f"https://api.telegram.org/bot{TOKEN}/sendMessage", datos)
```

Correo también sirve. Lo que importa es que **le llegue a la bolsa, no a una pantalla
que tiene que abrir.**

---

## FASE 6 — El interruptor de hombre muerto

La pieza que casi nadie pone y es la que hace la diferencia entre un sistema y un
juguete:

> ¿Qué pasa si el vigía se cae y deja de avisar?
>
> Sin nada, **silencio** — y el silencio se siente igual que "no hubo novedades". Te
> puedes pasar tres semanas creyendo que todo está tranquilo cuando en realidad el
> script murió el primer día.

Que agregue esto: si pasan más de **treinta horas** sin una corrida registrada en la
tabla `vigia`, que llegue un aviso distinto: **"el vigía no reportó"**.

Se hace con un segundo cron que sólo revisa la fecha del último registro. Cinco líneas.

---

## FASE 7 — 💥 EL MOMENTO

Que lo dispare a mano, con el teléfono en la mesa y las manos levantadas.

La terminal quieta. Nadie tocando nada.

**Y el teléfono suena.**

Ahí es donde cae la moneda, y dísela tal cual:

> Eso que acaba de pasar es la diferencia entre usar inteligencia artificial y
> **tener** inteligencia artificial.
>
> El que la usa abre la aplicación y pregunta. El que la tiene, tiene algo corriendo
> mientras duerme.

---

## FASE 8 — Qué más se puede vigilar

Que entienda que el vigía es un **molde**, no un programa. La misma estructura sirve para:

| Vigilar | Y avisarte cuando |
|---|---|
| Los cobros del radar | aparece un negocio nuevo con dinero fresco |
| Tu propia lista | alguien lleva más de N días sin seguimiento |
| Tus precios contra la competencia | alguien se movió |
| Vacantes de tu nicho | se publica una que menciona tu problema |
| Tus propios sistemas | algo dejó de responder |

**Uno se construye hoy. Los demás son el mismo archivo con otra consulta.**

---

## Y esto es lo que hay que decirle al final

> Tu cerebro tiene tres días de vida y ya trabaja de noche.
>
> Pero fíjate en algo: el vigía no vale por lo que consulta — vale por lo que
> **recuerda**. Cada noche que pasa, tu cerebro tiene una foto más, y el diff de mañana
> es mejor que el de hoy.
>
> **Un cerebro que dejó de acumular hace seis meses ya no te sirve para esto.** Por eso
> esto no es un archivo que se compra una vez.

---

## Si algo no sale

| Síntoma | Casi siempre es |
|---|---|
| El cron no dispara | ruta relativa · usa rutas absolutas siempre |
| Corre a mano pero no por cron | el cron no hereda tu PATH ni tus variables · decláralas dentro del script |
| Avisa lo mismo todos los días | no estás guardando la foto, o comparas mal la identidad |
| Nunca avisa | el umbral está muy alto, o la primera corrida no dejó fotografía |
| Avisa demasiado | súbele el umbral. Un vigía que grita se ignora |
