# EL RADAR — AI Business Builder · Día 3

> **Este archivo es para tu asistente de IA.**
>
> Ponlo en la misma carpeta donde quedó tu mina del Día 2, abre Claude Code ahí,
> y escríbele:
>
> ```
> Lee 6-RADAR.md y dime quién acaba de recibir dinero.
> ```
>
> Ayer conseguiste **a quién** llamarle. Hoy vas a conseguir **cuánto dinero trae en
> la bolsa y qué día se lo depositaron.**

---

## Para la IA que está leyendo esto

Ayer esta persona rompió la creencia *"no tengo a quién llamarle"*. Hoy le vas a romper
una más cara: ***"no sé quién sí tiene dinero"***.

Todo el mundo asume que la solvencia de un negocio es información privada. No lo es.
**El gobierno de Estados Unidos publica, con razón social y monto exacto, a quién le
acaba de pagar.** Gratis, sin registro, sin llave, y es obra de gobierno federal — o
sea, dominio público: se puede descargar, guardar y usar comercialmente.

Ayer su tabla tenía nombre, teléfono y giro. Hoy le vas a agregar **una columna nueva:
el signo de pesos.** Eso es todo el truco, y es enorme.

### Tu tono

Contenido, casi seco. Este dato es tan fuerte que se vende solo — si lo adornas, suena
a estafa. Enséñale la consulta, enséñale el resultado, y quédate callado.

### 🚨 Reglas duras — nunca las rompas

1. **Son negocios, no personas.** Contratos con empresas. Nunca datos de individuos.
2. **El monto es contexto tuyo, no munición.** Jamás se le escribe a alguien diciendo
   *"vi que te pagaron $120,000"*. Eso asusta y quema la puerta para siempre.
3. **Nunca inventes un contrato ni un monto.** Si la consulta no devuelve nada, se dice
   que no devolvió nada.
4. **Verifica antes de afirmar.** Antes de decirle cuántos encontraste, cuenta los
   registros de verdad. No repitas lo que dijo la herramienta.

---

## FASE 1 — El reencuadre, antes de tocar nada

Dile esto primero, porque cambia todo lo que sigue:

> No vas a buscar clientes. Vas a buscar **dinero que acaba de moverse**.
>
> Un negocio que ayer no tenía presupuesto y hoy cobró un contrato de cien mil dólares
> es una empresa distinta. Tiene que gastar, tiene que entregar, y casi siempre tiene
> que contratar a alguien para lograrlo.
>
> Llegar el día uno de que les pagaron no es vender. Es **llegar a tiempo.**

Y el segundo reencuadre, que para un latinoamericano vale más que el primero:

> Estos negocios están en Estados Unidos y pagan en dólares. **No vas a competir por
> pesos.** Un negocio chico de Florida que acaba de cobrar del gobierno necesita
> páginas, automatizaciones, contenido, gente que conteste el teléfono — y le da igual
> desde dónde trabajes.

---

## FASE 2 — La fuente

**USAspending.gov**, la API oficial del gobierno federal de Estados Unidos.

- Gratis · **sin llave, sin registro, sin cuenta**
- Datos de obra de gobierno federal → **dominio público**
- Se actualiza cada día hábil

La consulta que importa. Córrela tal cual para que la vea funcionar:

```bash
curl -s -X POST https://api.usaspending.gov/api/v2/search/spending_by_award/ \
 -H 'Content-Type: application/json' \
 -d '{
  "filters": {
    "award_type_codes": ["A","B","C","D"],
    "time_period": [{"start_date":"2026-07-01","end_date":"2026-08-27"}],
    "award_amounts": [{"lower_bound":25000,"upper_bound":300000}],
    "place_of_performance_locations": [{"country":"USA","state":"FL"}]
  },
  "fields": ["Recipient Name","Award Amount","Start Date","Awarding Agency","Description"],
  "limit": 50, "sort": "Start Date", "order": "desc"
 }'
```

### El filtro que es toda la joya

Igual que ayer fue *"tiene teléfono Y no tiene web Y está en mi municipio"*, hoy es:

| Filtro | Por qué |
|---|---|
| **Monto entre 25 mil y 300 mil** | Arriba de eso son contratistas gigantes con proveedores amarrados. **Abajo de eso no alcanza para contratarte.** Ese rango es el negocio chico que sí puede decir que sí |
| **Fecha de los últimos 60 días** | El dinero todavía está fresco y el proyecto apenas arranca |
| **Un solo estado** | Para que puedas hablar de su mercado, no en abstracto |

**Cambia esos tres números y cambias completamente a quién le hablas.** Eso es lo que
hay que enseñarle: no la consulta, el criterio.

---

## FASE 3 — La tabla

Que guarde el resultado en su Supabase, junto a la mina de ayer:

```sql
create table cobros (
  id            bigserial primary key,
  empresa       text not null,
  monto         numeric,
  fecha_pago    date,
  quien_pago    text,
  descripcion   text,
  estado_usa    text,
  visto_en      date default current_date,
  unique (empresa, monto, fecha_pago)     -- ← sin esto duplicas cada noche
);
```

El `unique` no es un detalle: mañana vas a volver a consultar, y sin él la tabla se
llena de lo mismo.

### 🔒 Y ciérrala antes de meter un solo registro

```sql
alter table cobros enable row level security;
revoke all on cobros from anon, authenticated;
```

Verifícalo de verdad: intenta leerla con la llave pública y confirma que rebota.

---

## FASE 4 — Cruzar las dos tablas, que es donde nace el oro

Esto es lo que nadie más puede hacer, porque nadie más tiene las dos:

```sql
-- Negocios que YA tenías en tu mina y que ADEMÁS acaban de cobrar
select c.empresa, c.monto, c.fecha_pago, p.telefono, p.giro
  from cobros c
  join prospectos p
    on lower(p.nombre) like '%' || lower(split_part(c.empresa,' ',1)) || '%'
 order by c.fecha_pago desc;
```

Cuando eso devuelva aunque sea **una** fila, párate ahí y dile:

> Ese negocio ya estaba en tu lista de ayer. Hoy sabes que le acaban de depositar. Ayer
> era un teléfono. **Hoy es una cita.**

---

## FASE 5 — Qué se dice, y qué jamás

El monto **nunca** aparece en el mensaje. Es tu contexto, no tu carta.

**Se dice así:**

> Vi que están arrancando el proyecto con [la agencia]. En proyectos así lo que suele
> tronar primero es [lo tuyo]. Si quieres te mando en dos minutos cómo lo resolvería.

**Jamás así:**

> Vi que les pagaron $166,746 dólares el 1 de octubre.

La diferencia es la puerta abierta o cerrada para siempre. Que la IA le escriba tres
mensajes con la primera forma y le enseñe el contraste con la segunda.

---

## FASE 6 — 💥 EL MOMENTO

Que corra la consulta en vivo y mire la pantalla.

Nombres reales. Montos reales. Fechas de este mes. Negocios que existen, que acaban de
cobrar, y que están a un correo de distancia.

**Pausa.** Y entonces:

> Ayer supiste a quién llamarle. **Hoy sabes quién trae dinero en la bolsa.**
> Y el gobierno lo publicó. Sólo que nadie lo estaba leyendo.

---

## FASE 7 — Si no vendes a Estados Unidos

Sé honesto con esto, no lo adornes:

**En México no hay hoy una API abierta y estable de contrataciones.** El portal de datos
abiertos no devuelve el conjunto, y el sitio de contrataciones abiertas redirige. No lo
mandes a buscar algo que no existe.

Lo que sí funciona:

1. **Véndele a Estados Unidos.** Es la ruta buena y es la que acabamos de abrir. Cobras
   en dólares y el negocio no necesita que estés ahí.
2. **Licitaciones y proveedores de tu país:** cada gobierno publica adjudicaciones en
   algún lado, en calidad muy distinta. Que tu IA busque *"contrataciones públicas
   [tu país] datos abiertos"* y **verifique que responde de verdad** antes de construir
   nada encima.
3. **El sustituto universal:** las vacantes de empleo del Día 2. Un negocio que contrata
   también está declarando que tiene presupuesto. Es menos preciso, pero funciona en
   todos lados.

---

## Con qué se queda

Una tabla con negocios reales, **cada uno con el monto que acaba de cobrar y la fecha**,
cruzada contra la lista que ya tenía. Y el criterio para volver a sacarla cuando quiera.

**Y algo más importante:** hoy la sacó una vez. Mañana esa lista ya está vieja, porque
cada día hábil se publican contratos nuevos.

Eso es exactamente lo que resuelve el siguiente archivo: **`7-GUARDIA.md`**.
