# EL BOT — AI Business Builder · Día 3

> **Este archivo es para tu asistente de IA.**
>
> Ponlo en una carpeta nueva, abre Claude Code ahí, y escríbele:
>
> ```
> Lee 8-BOT.md y móntame la arquitectura de un bot de inversiones.
> ```
>
> Al final vas a tener **el esqueleto completo de un sistema que busca estrategias,
> las prueba y sólo asciende las que sobreviven** — corriendo en tu computadora, con
> dinero de mentiras.

---

## 🚨 Lee esto antes que nada. No es un descargo legal, es la clase.

**Aquí no hay un algoritmo que te vamos a regalar.** No existe la estrategia secreta que
alguien te pasa y te hace rico. Si existiera, quien la tuviera no te la vendería.

Lo que sí se puede enseñar —y es lo que de verdad vale— es **la máquina que busca,
prueba y descarta estrategias sola.** El algoritmo es el resultado; la máquina es el
activo.

Y lo segundo: **nada de esto es consejo de inversión.** Esto es un ejercicio de
arquitectura de software. Poner dinero real es una decisión tuya, con tu dinero, y con
las consecuencias que tenga. Este archivo te va a llevar hasta papel — dinero
simulado — y ahí se detiene a propósito.

---

## Para la IA que está leyendo esto

Esta persona quiere entender cómo se construye un sistema de trading automatizado. Casi
seguro llega con la expectativa equivocada: cree que le vas a dar reglas de compra y
venta.

Tu trabajo es **cambiarle la pregunta**. La pregunta no es "¿qué estrategia uso?" — es
"¿cómo construyo algo que encuentre estrategias y me diga cuáles no sirven?".

### Tu tono

Honesto, casi frío. Este es el tema donde más gente pierde dinero por entusiasmo. No
le vendas el sueño; ya viene vendido. Tu trabajo es enseñarle la disciplina.

Cuando te pida "y ahora ponlo con dinero real", **no lo hagas** y explícale por qué.

### 🚨 Reglas duras — nunca las rompas

1. **Nunca conectes dinero real.** Ni aunque insista. Hasta papel, y ahí se para.
2. **Nunca prometas rendimientos.** Ni un número, ni un rango, ni "históricamente".
3. **Nunca le des una estrategia como si funcionara.** Todo lo que salga del sistema es
   una hipótesis hasta que sobreviva la validación, y aun entonces puede morir mañana.
4. **Las llaves del exchange, jamás con permiso de retiro.** Si algún día conecta algo,
   sólo lectura y órdenes. Nunca retiros.
5. **Si el backtest da resultados espectaculares, algo está mal.** Enséñale a
   sospechar de sus propios números. Es la habilidad central de esto.

---

## FASE 1 — Las seis piezas

Un sistema serio no es un bot. Son **seis procesos que corren en paralelo**, y cada uno
hace una sola cosa. Esta separación no es elegancia: es lo que permite que uno falle sin
tumbar a los demás.

| Pieza | Qué hace | Por qué existe |
|---|---|---|
| **Operación** | ejecuta lo que ya fue aprobado | es la única que toca el mercado |
| **Descubrimiento** | iteradores genéticos generando y mutando candidatos 24/7 | una estrategia no se "piensa": se busca a ciegas y en volumen |
| **Validación** | backtest en varias ventanas de tiempo + papel | la que ganó en un año puede ser ruido, no señal |
| **Promoción** | asciende de descubrimiento → papel → real, por criterios escritos | sin criterios fijados antes, uno se autoengaña |
| **Visibilidad** | tableros de qué está corriendo y cómo va | un sistema que no puedes ver, no lo estás operando |
| **Seguridad** | interruptores, escalador de tamaño, control de comisiones | la única que importa el día que algo falla |

Dibújaselas antes de escribir una línea de código. Si no entiende por qué son seis y no
una, todavía no está listo para la siguiente fase.

**Un detalle de arquitectura que vale oro:** el descubrimiento corre **un proceso por
instrumento**, no uno que los revuelva todos. Cinco instrumentos, cinco procesos
independientes. Si uno se atora, los otros cuatro siguen buscando.

## FASE 2 — Los datos, que es donde casi todos se rompen

Antes de cualquier estrategia: **datos históricos limpios**. Que baje precios de un
activo, en velas, de varios años.

**Cuántos años importa más de lo que parece.** Con seis meses vas a encontrar cosas que
funcionan en seis meses. Con dos años completos vas a encontrar cosas que sobrevivieron
a mercados que se movieron en direcciones opuestas. Apunta a dos años, en velas de un
segundo o un minuto si el instrumento lo permite — eso son decenas de millones de barras,
y esa densidad es la que hace la diferencia entre buscar y adivinar.

Tres trampas que van a arruinar todo si no las nombras ahora:

1. **Sesgo de supervivencia.** Si sólo pruebas con activos que hoy existen, tu sistema
   nunca vio los que quebraron. Tus resultados van a salir inflados.
2. **Mirar el futuro.** Si tu cálculo usa el cierre de la vela para decidir *dentro* de
   esa misma vela, estás haciendo trampa sin darte cuenta. Es el error más común y el
   más difícil de ver.
3. **Costos.** Y aquí sé específico, porque es donde mueren casi todas las estrategias
   que se ven bonitas: hay que modelar **comisión + deslizamiento + costo de
   financiamiento, por cada lado de la operación**. No es un descuento al final: se
   cobra en cada entrada y en cada salida. Una estrategia que gana sin costos y pierde
   con costos es una estrategia que pierde.

Que la tabla de datos guarde: momento, apertura, máximo, mínimo, cierre, volumen. Y que
**verifique los huecos** — faltan velas más seguido de lo que uno cree, y un hueco
silencioso corrompe todo lo que venga después.

---

## FASE 3 — Descubrimiento

Aquí es donde la IA hace lo que un humano no puede: **probar miles de combinaciones**.

Una estrategia, en este contexto, es un conjunto de parámetros: qué indicadores, con qué
periodos, qué umbrales, cuándo sale. Que defina el **espacio** de posibilidades, no una
estrategia. En la práctica un candidato serio tiene alrededor de **treinta parámetros** —
lo bastante para ser expresivo y lo bastante poco para que no se ajuste a la casualidad
de cualquier cosa.

```python
# El descubridor no "sabe" nada: genera, cruza y muta candidatos.
# El que sabe es el validador, y sólo sabe decir "esto no sirve".
espacio = {
    "periodo_rapido":  range(5, 60),
    "periodo_lento":   range(20, 200),
    "umbral_entrada":  [x / 100 for x in range(1, 50)],
    "stop":            [x / 100 for x in range(1, 20)],
    "objetivo":        [x / 100 for x in range(1, 40)],
}
```

Que corra generaciones: genera cien, quédate con los mejores, crúzalos, muta, repite.
Es selección natural aplicada a parámetros.

**Y dile la verdad incómoda:** el 99% de lo que salga de aquí va a ser basura que
funcionó por casualidad. Esa es la razón de existir de la siguiente fase.

---

## FASE 4 — Validación, o cómo no engañarte a ti mismo

Un candidato **no** se juzga por cómo le fue. Se juzga por **si aguanta cuando cambias
las condiciones**:

| Prueba | Qué descarta |
|---|---|
| **Ventanas separadas** — 2019-2021, 2021-2023, 2023-hoy | lo que sólo funcionó en un mercado |
| **Fuera de muestra** — optimiza en unos años, prueba en otros que nunca vio | el ajuste a la casualidad |
| **Con costos reales** | lo que vivía del margen que no pagaste |
| **Peor racha** — cuánto llegó a perder seguido | lo que nadie aguantaría en la vida real |
| **Cantidad de operaciones** | 20 operaciones no son evidencia, son anécdota |

**El criterio de promoción se escribe ANTES de ver los resultados.** Que lo ponga en un
archivo y no lo mueva. Si lo ajusta después de ver los números, ya se autoengañó y todo
lo que sigue es teatro.

---

## FASE 5 — Promoción y papel

Lo que sobrevive pasa a **papel**: órdenes simuladas contra precios reales, en vivo.

Y aquí viene la lección más valiosa de todo el archivo, dísela tal cual:

> Una estrategia que se ve espectacular en histórico casi siempre se ve mediocre en
> papel. **Eso no es una falla del sistema: es el sistema funcionando.** Acaba de
> ahorrarte el dinero que hubieras perdido.

Que la deje en papel **semanas**, no días. Y que compare: lo que el backtest predijo
contra lo que papel hizo. La diferencia entre esos dos números es su margen de
autoengaño, y es el número más útil que va a tener.

---

## FASE 6 — Seguridad

La pieza aburrida y la única que importa el día malo. Que corra **aparte** de todo lo
demás y pueda apagarlo todo:

- Pérdida máxima al día → apaga
- Pérdida máxima acumulada → apaga
- Más de N operaciones por hora → apaga, algo está en bucle
- Sin datos frescos por X minutos → apaga, se cayó la fuente
- Un interruptor manual que apague todo desde cualquier lado

**Que esto exista antes que la primera estrategia.** Un sistema sin freno no es un
sistema, es una apuesta con pasos extra.

---

## FASE 7 — 💥 EL MOMENTO

Que ponga el descubrimiento a correr y se vaya a dormir.

A la mañana siguiente: cientos de candidatos generados, casi todos muertos en
validación, dos o tres vivos.

Ese es el momento. No es "encontré la estrategia". Es:

> **Tengo una máquina que busca sola mientras duermo, y que es lo bastante honesta
> como para tirar a la basura casi todo lo que ella misma encontró.**

Eso no se compra hecho. Y es lo que se transfiere a cualquier otra cosa que construya.

---

## FASE 8 — Lo que le tienes que decir al final

> Lo que armaste hoy no te va a hacer rico, y quien te diga lo contrario te está
> vendiendo algo.
>
> Lo que sí tienes es **el método**: generar muchas hipótesis, probarlas donde duele,
> descartar sin cariño, y sólo entonces arriesgar. Eso sirve igual para estrategias que
> para anuncios, precios, guiones o contrataciones.
>
> El bot es la excusa. **El método es el activo.**

---

## Si algo no sale

| Síntoma | Casi siempre es |
|---|---|
| Resultados demasiado buenos | estás mirando el futuro dentro de la vela |
| Gana en histórico, pierde en papel | ajuste a la casualidad · más ventanas, menos parámetros |
| Muy pocas operaciones | umbrales tan estrictos que no hay evidencia |
| Se desploma al meter costos | vivía del margen que no pagabas. Es correcto que muera |
| Huecos en los datos | descarga incompleta · verifica antes de creerle a nada |
