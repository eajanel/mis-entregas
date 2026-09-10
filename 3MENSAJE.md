# EL MENSAJE — el que no se puede ignorar

> **Este archivo es para tu asistente de IA.**
>
> Ponlo en la **misma carpeta** donde quedaron tu inventario y tu lista de prospectos,
> abre Claude Code ahí, y escríbele:
>
> ```
> Lee 3-MENSAJE.md y escríbeme los mensajes de hoy.
> ```
>
> Al final vas a tener quince mensajes distintos, cada uno escrito con las palabras
> del negocio al que va. Y una liga que abre WhatsApp con el mensaje ya puesto.
>
> _Pieza 3 de 4 · 60 minutos · No se compra nada._

---

## Para la IA que está leyendo esto

Ya tiene la lista. Hoy le construyes **lo que va adentro del mensaje**.

Esta es la parte donde casi todo el mundo se tropieza: consigue 300 teléfonos, escribe
un solo texto, lo pega 300 veces, no le contesta nadie, y concluye que "eso no funciona".
No falló la lista. Falló que mandó **el mismo mensaje**.

Tu trabajo hoy es que salgan **quince mensajes distintos**, cada uno construido con dos
cosas que ya existen y que nadie más tiene juntas:

1. **Las palabras textuales del prospecto** — lo que ÉL escribió en su vacante, en su
   anuncio, en la reseña de una estrella que le dejaron.
2. **El vocabulario del gremio de esta persona** — que ya vive en su cerebro desde ayer.

La persona está en su primer curso de programación y está viendo su pantalla en vivo.

### Tu tono
- Español mexicano (tú/checar/ahorita). Nunca vos/tenés/vale/ordenador.
- Cero jerga sin explicar. Si dices "codificar la URL", explica qué es en una línea.
- **Explica ANTES de cada paso.** Un paso a la vez. Espera a que te confirme.
- Celebra el momento de la Fase 3. Es el que le va a cambiar la cabeza.

### 🚨 Reglas duras — nunca las rompas

1. **Jamás inventes evidencia.** Si una fila de la lista no trae palabras reales del
   prospecto, **esa fila no recibe mensaje hoy**. Escribir "vi su anuncio" cuando no
   viste nada es una mentira, se nota, y quema el número de esta persona. Salta la fila
   y dilo: *"a estos 4 no les tengo con qué; van otro día."*
2. **Tú NO mandas nada.** Tú preparas las ligas; la persona aprieta enviar, una por una,
   con su dedo. Nunca automatices el envío, ni aunque te lo pida.
3. **Nunca escribas a un número que esté en `bajas.csv`.** Ese archivo solo crece.
   No lo edites, no lo borres, no lo "limpies".
4. **A negocios sí; a personas, solo a las que ya la conocen.** Si al leer su nombre el
   otro no puede decir *"ah, sí, tú"*, ese contacto no va hoy.
5. **Nunca le pidas contraseñas ni llaves de API.** Esto no usa ninguna. Cero.
6. **Nada destructivo.** Si vas a sobreescribir un archivo que ya existe, respáldalo
   primero con extensión `.respaldo` y avísale.
7. **Verifica contando.** No confíes en un "listo": cuenta los renglones, cuenta las
   ligas, cuenta los repetidos. Los sistemas dicen "hecho" y mienten.
8. **Si algo falla dos veces, para.** Dile qué error salió y que lo pegue en el chat
   del curso.

### Antes de empezar: dile qué van a hacer

> *"Ya tienes la lista. Hoy le vamos a poner palabras. Pero no un mensaje repetido
> quince veces: quince mensajes distintos, cada uno escrito con lo que ESE negocio
> escribió en internet. Y al final te dejo una liga por cada uno que te abre WhatsApp
> con el mensaje ya escrito. Tú nada más lo lees y le das enviar."*

---

## FASE 1 — Qué traes en las manos

No preguntes qué archivos tiene. **Búscalos y cuéntalos.**

**Primero, dónde viven de verdad** (las piezas anteriores del día no los dejan aquí):

```bash
ls -la ~/mina/*.csv 2>/dev/null          # los prospectos (pieza 2, LA MINA)
ls -la ~/mi-mina/salidas/*.csv 2>/dev/null   # el inventario (pieza 1) — PERSONAS
```

**Copia a esta carpeta SOLO los de negocios**, nunca los del inventario:

```bash
cp ~/mina/amarilla.csv ~/mina/denue.filtrado.csv ~/mina/vacantes.csv . 2>/dev/null
ls -la *.csv 2>/dev/null
wc -l *.csv 2>/dev/null
```

> 🚨 **`contactos.csv`, `red-cercana.csv`, `donde-gasto.csv`, `cruce.csv` y
> `clientes.csv` NO se copian aquí.** Ésas son personas de su agenda, no negocios.
> Meterlas a esta máquina sería exactamente lo que el día prohibió. `cola.py` ya
> las bloquea por nombre, pero la primera defensa es no traerlas.
>
> Si de plano no encuentras ningún CSV de negocios, los prospectos están en su
> tabla `prospectos` de Supabase: que los exporte desde el SQL Editor
> (`select negocio, telefono, ciudad, senal, url_fuente from prospectos where baja = false;`
> → botón de descargar CSV) y guarde ese archivo aquí.

Interpreta tú y repórtale en humano: *"Tienes 312 negocios entre los tres archivos que
trajiste de la mina. Ahorita reviso cuáles traen con qué escribirles."*

Ahora lo que de verdad importa: **cuáles traen evidencia**. Ábrelos y checa los
encabezados y tres filas de ejemplo.

```bash
head -4 *.csv
```

Una fila sirve para hoy si trae, además del teléfono, **palabras que el prospecto
escribió**: el texto de su vacante, su descripción, la reseña que le dejaron. Si solo
trae nombre y teléfono, no sirve para un mensaje bueno — sirve para una llamada.

Dile el número real, sin adornarlo:

> *"De 312, hay 118 que traen texto propio. Esos son los que hoy pueden recibir un
> mensaje que no parezca publicidad. Los otros 194 no se tiran: son para el teléfono."*

Si no encuentras ningún archivo con evidencia, **para aquí** y dile que primero termine
la pieza 2 (LA MINA).

---

## FASE 2 — Su vocabulario (esto sale de su cerebro, no de ti)

Aquí está la mitad del truco y hay que decirlo en voz alta.

Pregúntale a su cerebro **antes** de preguntarle a ella:

```bash
python3 ~/cerebro/bin/buscar.py "a qué me dedico, qué vendo, quién es mi cliente"
```

Léelo y **repítele lo que su propio cerebro contestó**. Luego completa nada más lo que
falte, con tres preguntas cortas, una a la vez:

1. *"¿Cómo le dicen a tu servicio los que YA te compran? Con sus palabras, no con las
   bonitas."*
2. *"¿Cuál es la objeción número uno que te ponen antes de comprarte?"*
3. *"¿Qué es lo más chiquito que le puedes entregar a alguien sin que te pague nada?"*

Guarda el resultado en su cerebro, no en esta carpeta:

`~/cerebro/memoria/mi-vocabulario.md`

```markdown
# Mi vocabulario

Vuelve a [[INICIO]] · Ver también [[mi-negocio]]

- **Cómo le dicen mis clientes a lo que vendo:**
- **Las palabras que YO nunca usaría (suenan a agencia):**
- **La objeción número uno:**
- **Lo más chiquito que puedo entregar gratis:**
- **Frases que ya me funcionaron (se llena solo, con el tiempo):**
```

Commitea: `cd ~/cerebro && git add -A && git commit -q -m "mi vocabulario"`

Y dile esto, porque es literal:

> *"Fíjate en algo. Yo no sé nada de tu gremio. Lo que acaba de salir ahí no lo puso la
> inteligencia artificial: lo puso TU memoria. Cualquier otra persona en esta clase le
> está dando este mismo archivo a su IA, y a cada quien le van a salir mensajes
> distintos. La diferencia entre los suyos y los tuyos es lo que tú ya llevas escrito."*

---

## FASE 3 — La prueba de los dos mensajes 💥

**Este es el momento del bloque. No lo apures.**

Agarra **un solo prospecto real de su lista** — uno que traiga evidencia jugosa — y
escríbele **dos mensajes**. Enséñaselos juntos, sin explicarlos antes.

**Mensaje A** — el que manda todo el mundo:

```
Hola, buenas tardes. Somos expertos en soluciones digitales para negocios
como el suyo. Ofrecemos páginas web, redes sociales y marketing con IA a
precios accesibles. ¿Le interesa recibir más información? 🚀
```

**Mensaje B** — el mismo negocio, con sus propias palabras:

```
Buenas tardes. Vi que están buscando recepcionista para contestar el
teléfono de 9 a 6 y agendar citas, en 12 mil al mes.

Hago un contestador que agenda solo, sin sueldo y sin que se enferme.
Ya lo tengo armado para otro consultorio.

¿Le mando el enlace para que lo pruebe? Si no le sirve, no le vuelvo a escribir.
```

Y pregúntale nada más esto:

> *"Los dos llegan al mismo dentista. ¿Cuál contestarías tú?"*

Espera su respuesta. Cuando conteste, dile por qué:

> *"El primero le habla a cualquiera, entonces no le habla a nadie. El segundo repite
> **lo que él escribió** — el horario, el sueldo, la palabra 'agendar'. Cuando alguien
> lee sus propias palabras en un mensaje, deja de leer publicidad y empieza a leer una
> conversación. Y el costo de conseguir esas palabras fue cero: él las publicó."*

Ahora la pregunta con la que se cierra el punto:

> *"¿Cuánto te tomaría escribir el mensaje B a mano, de verdad, leyendo la vacante de
> cada uno? ¿Cinco minutos? Por quince son hora y cuarto diarias. Eso es lo que hoy vas
> a bajar a seis minutos. No es que la máquina escriba mejor que tú: es que va a leer
> ciento dieciocho anuncios sin cansarse."*

---

## FASE 4 — La anatomía (y por qué la regla ética va adentro)

Explícale las cuatro piezas. Son cuatro renglones, no cuatro párrafos.

| Pieza | Qué es | Ejemplo |
|---|---|---|
| **1. La prueba** | Lo que ESE negocio escribió, textual | *"Vi que buscan recepcionista de 9 a 6 en 12 mil"* |
| **2. El puente** | Qué significa eso en el idioma de ella | *"Hago un contestador que agenda solo"* |
| **3. La cosa chiquita** | Algo ya hecho, o de diez minutos. Nunca "una llamada de una hora" | *"Ya lo tengo armado, le mando el enlace"* |
| **4. La salida** | El permiso de decir que no | *"Si no le sirve, no le vuelvo a escribir"* |

**La pieza 4 no es cortesía: es el diseño.** Un mensaje que trae salida no se reporta,
se ignora. Y cuando alguien la toma, esta persona **cumple** — para eso existe
`bajas.csv` en la Fase 5. La regla de no molestar no va como advertencia hasta abajo:
va escrita adentro del mensaje y la hace cumplir un programa.

**Prohibido en todos los mensajes** — díselo tal cual y cúmplelo tú:

- ❌ "Espero que se encuentre muy bien" — nadie lo espera, todos lo reconocen.
- ❌ Ligas dentro del primer mensaje. Una liga de un desconocido es lo que la gente
  reporta. La liga se manda cuando conteste.
- ❌ Más de 60 palabras. Se lee en el celular, no en una junta.
- ❌ Dos preguntas. Una sola, al final.
- ❌ Emojis de cohete, fuego y dinero.
- ❌ Mandar el mismo texto dos veces. Si se repite, deja de ser mensaje y es volante.

Y un detalle que casi nadie sabe: **la notificación de WhatsApp muestra las primeras
palabras**. Si el mensaje arranca con "Hola, buenas tardes, somos", ya perdió. Que las
primeras ocho palabras traigan la prueba.

Guarda esta anatomía en su cerebro, en `~/cerebro/memoria/como-escribo-mensajes.md`,
enlazada a `[[mi-vocabulario]]` y a `[[INICIO]]`. Mañana, cuando ella le pida a su IA
"escríbeme un mensaje", esto va a estar ahí sin que lo pida.

---

## FASE 5 — Las tres herramientas

Explícale la división del trabajo antes de crear nada, porque es lo que hace que esto
no sea una plantilla:

> *"Los programas NO escriben los mensajes. Uno decide a quién le toca hoy, otro arma
> las ligas y revisa que no haya dos mensajes iguales, y el tercero da de baja a quien
> pida que no le escribas. **Los mensajes los escribo yo, uno por uno, leyendo lo que
> cada negocio publicó.** Si un programa los escribiera, serían el mensaje A."*

```bash
mkdir -p bin
```

### 5.1 — `bin/cola.py` — a quién le toca hoy

```python
#!/usr/bin/env python3
"""Arma la cola de hoy: a quién le toca, con sus palabras textuales."""
import csv
import re
import sys
import unicodedata
from datetime import date
from pathlib import Path

AQUI = Path(__file__).resolve().parent.parent

LADA = "52"   # ← MX 52 · CO 57 · AR 549 · CL 569 · PE 51 · EC 593 · GT 502
TOPE = 15     # ← el tope del día. No lo subas.

BAJAS = AQUI / "bajas.csv"
BITACORA = AQUI / "bitacora.csv"
SALIDA = AQUI / "cola-de-hoy.md"
# 🚨 Estas NUNCA entran a la cola. Las cuatro últimas son las listas de PERSONAS
#    del inventario (su agenda, su familia, sus clientes). La regla del día es
#    "negocios, no personas": esta línea es la que la hace cumplir de verdad.
IGNORAR = {"bajas.csv", "bitacora.csv", "mensajes-de-hoy.csv",
           "contactos.csv", "red-cercana.csv", "donde-gasto.csv",
           "cruce.csv", "clientes.csv"}


def sin_acentos(t):
    return "".join(c for c in unicodedata.normalize("NFD", t or "")
                   if unicodedata.category(c) != "Mn").lower()


def normaliza(tel):
    d = re.sub(r"\D", "", tel or "")
    if d.startswith("00"):
        d = d[2:]
    if len(d) <= 10 and not d.startswith(LADA):
        d = LADA + d
    if LADA == "52" and d.startswith("521") and len(d) == 13:
        d = "52" + d[3:]
    return d if 10 <= len(d) <= 15 else ""


def columna(cab, *claves):
    for c in cab:
        n = sin_acentos(c)
        if any(k in n for k in claves):
            return c
    return None


def leer_csv(ruta):
    try:
        with open(ruta, encoding="utf-8-sig", errors="replace", newline="") as f:
            muestra = f.read(4096)
            f.seek(0)
            sep = ";" if muestra.count(";") > muestra.count(",") else ","
            return [r for r in csv.DictReader(f, delimiter=sep)]
    except Exception as e:
        print("  ⚠️  no pude leer %s: %s" % (ruta.name, e))
        return []


def telefonos_de(ruta, col_claves=("telefono", "tel", "celular", "whats", "movil")):
    fuera = set()
    if not ruta.exists():
        return fuera
    for fila in leer_csv(ruta):
        c = columna(fila.keys(), *col_claves)
        t = normaliza(fila.get(c, "")) if c else ""
        if t:
            fuera.add(t)
    return fuera


def main():
    fuentes = [p for p in sorted(AQUI.glob("*.csv")) if p.name not in IGNORAR]
    if not fuentes:
        print("No encontré ningún .csv con prospectos en esta carpeta.")
        return

    bajas = telefonos_de(BAJAS)
    ya = telefonos_de(BITACORA)

    total = con_tel = 0
    vistos, cola = set(), []

    for ruta in fuentes:
        filas = leer_csv(ruta)
        if not filas:
            continue
        cab = list(filas[0].keys())
        c_tel = columna(cab, "telefono", "tel", "celular", "whats", "movil")
        c_nom = columna(cab, "nombre", "negocio", "razon", "empresa", "titulo")
        if not c_tel:
            print("  ⚠️  %s no tiene columna de teléfono; la salto" % ruta.name)
            continue
        for fila in filas:
            total += 1
            tel = normaliza(fila.get(c_tel, ""))
            if not tel:
                continue
            con_tel += 1
            if tel in bajas or tel in ya or tel in vistos:
                continue
            vistos.add(tel)
            extras = {k: (v or "").strip() for k, v in fila.items()
                      if k and k not in (c_tel, c_nom) and (v or "").strip()}
            cola.append({"tel": tel,
                         "nombre": (fila.get(c_nom) or "sin nombre").strip(),
                         "fuente": ruta.name,
                         "extras": extras})

    hoy = cola[:TOPE]
    lineas = ["# Cola de hoy — %s" % date.today().isoformat(),
              "",
              "_Tope del día: %d · Disponibles sin contactar: %d_" % (TOPE, len(cola)),
              ""]
    for i, p in enumerate(hoy, 1):
        lineas.append("## %d. %s" % (i, p["nombre"]))
        lineas.append("- **telefono:** %s" % p["tel"])
        for k, v in p["extras"].items():
            lineas.append('- **%s:** "%s"' % (k, v[:600]))
        lineas.append("")
    SALIDA.write_text("\n".join(lineas), encoding="utf-8")

    print("── Cola de hoy ──")
    print("filas leídas:            %d" % total)
    print("con teléfono usable:     %d" % con_tel)
    print("en bajas (nunca):        %d" % len(bajas))
    print("ya contactados antes:    %d" % len(ya))
    print("disponibles:             %d" % len(cola))
    print("cola de hoy:             %d  →  %s" % (len(hoy), SALIDA.name))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("[cola] error: %s" % e, file=sys.stderr)
    sys.exit(0)
```

**Pregúntale de qué país son sus prospectos y cambia `LADA` tú.** No lo adivines.

### 5.2 — `bin/armar.py` — las ligas, y el detector de plantilla

```python
#!/usr/bin/env python3
"""Arma las ligas de wa.me y la página del día. No manda nada: eso lo hace un humano."""
import csv
import html
import re
import sys
from datetime import date
from pathlib import Path
from urllib.parse import quote

AQUI = Path(__file__).resolve().parent.parent

LADA = "52"          # ← la misma que pusiste en cola.py
TOPE = 15
MAX_CARACTERES = 420

ENTRADA = AQUI / "mensajes-de-hoy.csv"
SALIDA = AQUI / "mensajes-de-hoy.html"
BITACORA = AQUI / "bitacora.csv"
BAJAS = AQUI / "bajas.csv"


def normaliza(tel):
    d = re.sub(r"\D", "", tel or "")
    if d.startswith("00"):
        d = d[2:]
    if len(d) <= 10 and not d.startswith(LADA):
        d = LADA + d
    if LADA == "52" and d.startswith("521") and len(d) == 13:
        d = "52" + d[3:]
    return d if 10 <= len(d) <= 15 else ""


def telefonos_de(ruta):
    fuera = set()
    if not ruta.exists():
        return fuera
    with open(ruta, encoding="utf-8-sig", errors="replace", newline="") as f:
        for fila in csv.DictReader(f):
            for k, v in fila.items():
                if k and "tel" in k.lower():
                    t = normaliza(v)
                    if t:
                        fuera.add(t)
    return fuera


def cuerpo(msj):
    """El mensaje sin su última línea: la salida SÍ se puede repetir, lo demás no."""
    lineas = [l for l in msj.splitlines() if l.strip()]
    return " ".join(lineas[:-1]) if len(lineas) > 1 else msj


def racha(a, b):
    """La frase más larga idéntica entre dos mensajes. Así se detecta una plantilla."""
    A = [w.lower() for w in re.findall(r"\w+", cuerpo(a))]
    B = [w.lower() for w in re.findall(r"\w+", cuerpo(b))]
    mejor, fin, prev = 0, 0, [0] * (len(B) + 1)
    for i in range(1, len(A) + 1):
        cur = [0] * (len(B) + 1)
        for j in range(1, len(B) + 1):
            if A[i - 1] == B[j - 1]:
                cur[j] = prev[j - 1] + 1
                if cur[j] > mejor:
                    mejor, fin = cur[j], i
        prev = cur
    return mejor, " ".join(A[fin - mejor:fin])


def main():
    if not ENTRADA.exists():
        print("Falta %s (columnas: telefono,negocio,mensaje)" % ENTRADA.name)
        return
    with open(ENTRADA, encoding="utf-8-sig", errors="replace", newline="") as f:
        filas = [r for r in csv.DictReader(f)]

    bajas, ya = telefonos_de(BAJAS), telefonos_de(BITACORA)
    buenos, rechazos = [], []

    for fila in filas:
        tel = normaliza(fila.get("telefono", ""))
        msj = (fila.get("mensaje") or "").strip()
        neg = (fila.get("negocio") or "sin nombre").strip()
        if not tel:
            rechazos.append((neg, "teléfono inválido"))
        elif tel in bajas:
            rechazos.append((neg, "ESTÁ EN BAJAS — no se le escribe"))
        elif tel in ya:
            rechazos.append((neg, "ya lo contactaste antes"))
        elif not msj:
            rechazos.append((neg, "sin mensaje"))
        elif len(msj) > MAX_CARACTERES:
            rechazos.append((neg, "muy largo: %d caracteres" % len(msj)))
        elif "http" in msj.lower():
            rechazos.append((neg, "trae liga adentro del primer mensaje"))
        else:
            buenos.append({"tel": tel, "neg": neg, "msj": msj})

    peor, frase, par = 0, "", ("", "")
    for i in range(len(buenos)):
        for j in range(i + 1, len(buenos)):
            r, f = racha(buenos[i]["msj"], buenos[j]["msj"])
            if r > peor:
                peor, frase, par = r, f, (buenos[i]["neg"], buenos[j]["neg"])

    print("── Revisión ──")
    print("renglones leídos:        %d" % len(filas))
    print("mensajes válidos:        %d" % len(buenos))
    print("rechazados:              %d" % len(rechazos))
    for neg, por in rechazos:
        print("   ✗ %s — %s" % (neg, por))
    print("frase repetida más larga (sin contar la salida): %d palabras" % peor)
    if peor:
        print('   «%s»' % frase)
    if peor >= 12:
        print("   ✗ %s y %s son casi el mismo mensaje. ESO ES PLANTILLA." % par)
        print("   Reescribe esa frase con las palabras de cada negocio y corre esto otra vez.")
        return
    if peor >= 8:
        print("   ⚠️  se están pareciendo demasiado. Revísalos.")
    if len(buenos) > TOPE:
        print("   ✗ son %d y el tope del día es %d. Corta la lista." % (len(buenos), TOPE))
        return
    if not buenos:
        print("No quedó ningún mensaje que armar.")
        return

    tarjetas = []
    for i, b in enumerate(buenos, 1):
        liga = "https://wa.me/%s?text=%s" % (b["tel"], quote(b["msj"], safe=""))
        tarjetas.append(
            '<div class="c"><label><input type="checkbox" data-k="%s"> '
            '<b>%d. %s</b></label><p>%s</p>'
            '<a class="b" href="%s" target="_blank" rel="noopener">Abrir WhatsApp</a>'
            '<span class="t">%s</span></div>'
            % (b["tel"], i, html.escape(b["neg"]),
               html.escape(b["msj"]).replace("\n", "<br>"), html.escape(liga), b["tel"]))

    css = ("body{background:#12100E;color:#EDE6DA;font:16px/1.55 system-ui,sans-serif;"
           "max-width:760px;margin:0 auto;padding:28px}"
           "h1{font-size:22px;margin:0 0 4px}.s{color:#9C948A;font-size:14px}"
           ".c{background:#1C1916;border:1px solid #2C2823;border-radius:12px;"
           "padding:16px 18px;margin:14px 0}"
           ".c p{white-space:pre-wrap;color:#CFC6B8;margin:10px 0 14px}"
           ".b{display:inline-block;background:#F2A03D;color:#12100E;font-weight:700;"
           "text-decoration:none;padding:9px 16px;border-radius:9px}"
           ".t{color:#6F675E;font-size:13px;margin-left:12px}"
           "label{cursor:pointer}.hecho{opacity:.42}"
           ".r{border:1px dashed #3A342C;border-radius:12px;padding:12px 16px;"
           "color:#9C948A;font-size:14px;margin-top:26px}")

    js = ("var K='enviados-%s';var S=JSON.parse(localStorage.getItem(K)||'[]');"
          "document.querySelectorAll('input').forEach(function(x){"
          "if(S.indexOf(x.dataset.k)>=0){x.checked=true;x.closest('.c').classList.add('hecho');}"
          "x.addEventListener('change',function(){"
          "var i=S.indexOf(x.dataset.k);if(x.checked&&i<0)S.push(x.dataset.k);"
          "if(!x.checked&&i>=0)S.splice(i,1);"
          "x.closest('.c').classList.toggle('hecho',x.checked);"
          "localStorage.setItem(K,JSON.stringify(S));"
          "document.getElementById('n').textContent=S.length;});});"
          "document.getElementById('n').textContent=S.length;") % date.today().isoformat()

    pagina = ("<!doctype html><html lang=es><meta charset=utf-8>"
              "<meta name=viewport content='width=device-width,initial-scale=1'>"
              "<title>Mensajes de hoy</title><style>%s</style>"
              "<h1>Mensajes de hoy — %s</h1>"
              "<p class=s>Mandados: <span id=n>0</span> de %d · "
              "sepáralos, no los dispares seguidos.</p>%s"
              "<div class=r>Si alguien te pide que no le escribas:<br>"
              "<code>python3 bin/baja.py SU_TELEFONO</code><br>"
              "Inmediato y para siempre. No hay 'una más'.</div>"
              "<script>%s</script></html>"
              % (css, date.today().isoformat(), len(buenos), "".join(tarjetas), js))
    SALIDA.write_text(pagina, encoding="utf-8")

    nueva = not BITACORA.exists()
    with open(BITACORA, "a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        if nueva:
            w.writerow(["fecha", "telefono", "negocio", "mensaje", "estado", "respuesta"])
        for b in buenos:
            w.writerow([date.today().isoformat(), b["tel"], b["neg"],
                        b["msj"].replace("\n", " ⏎ "), "preparado", ""])

    print("✅ %d ligas armadas  →  %s" % (len(buenos), SALIDA.name))
    print("   y %d renglones nuevos en %s" % (len(buenos), BITACORA.name))


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print("[armar] error: %s" % e, file=sys.stderr)
    sys.exit(0)
```

### 5.3 — `bin/baja.py` — el más importante de los tres

```python
#!/usr/bin/env python3
"""Baja inmediata y permanente. Uso: python3 bin/baja.py 5512345678 "pidió que no" """
import csv
import re
import sys
from datetime import date
from pathlib import Path

AQUI = Path(__file__).resolve().parent.parent
LADA = "52"
BAJAS = AQUI / "bajas.csv"


def normaliza(tel):
    d = re.sub(r"\D", "", tel or "")
    if d.startswith("00"):
        d = d[2:]
    if len(d) <= 10 and not d.startswith(LADA):
        d = LADA + d
    if LADA == "52" and d.startswith("521") and len(d) == 13:
        d = "52" + d[3:]
    return d


def main():
    if len(sys.argv) < 2:
        print('Uso: python3 bin/baja.py 5512345678 "razón opcional"')
        return
    tel = normaliza(sys.argv[1])
    razon = sys.argv[2] if len(sys.argv) > 2 else "pidió que no le escriba"
    nueva = not BAJAS.exists()
    with open(BAJAS, "a", encoding="utf-8", newline="") as f:
        w = csv.writer(f)
        if nueva:
            w.writerow(["fecha", "telefono", "razon"])
        w.writerow([date.today().isoformat(), tel, razon])
    total = sum(1 for _ in open(BAJAS, encoding="utf-8")) - 1
    print("✅ %s dado de baja. Para siempre." % tel)
    print("   %d en bajas.csv. Este archivo nunca se borra." % total)


if __name__ == "__main__":
    main()
```

```bash
chmod +x bin/*.py
```

---

## FASE 6 — La cola de hoy

```bash
python3 bin/cola.py
```

**Lee los números en voz alta con ella.** No pases a la siguiente fase sin explicarle
qué significa cada renglón, sobre todo estos dos:

- **en bajas** → los que ya dijeron que no. El programa no los va a dejar pasar aunque
  ella se equivoque.
- **ya contactados antes** → por qué nunca le va a llegar el mismo mensaje dos veces a
  la misma persona. *"Prefiero que se te escape uno a que le llegue doble."*

Ábrele `cola-de-hoy.md` y que lo vea. Ahí están las palabras textuales de quince
negocios, cada uno con lo que él mismo publicó.

---

## FASE 7 — Los quince, uno por uno

**Esta es la fase donde no puedes hacer trampa.** Ni tú, ni ella.

Lee `cola-de-hoy.md` completo y escribe **un mensaje por prospecto**, con estas
condiciones, que son obligatorias:

1. **Cada mensaje cita algo textual de ESE negocio.** El puesto, el horario, el sueldo,
   la queja de la reseña, la palabra rara que usó.
2. **Cada mensaje usa el vocabulario de `~/cerebro/memoria/mi-vocabulario.md`.**
3. **Máximo 60 palabras. Una sola pregunta. Sin ligas. Con la salida al final.**
4. **De usted**, salvo que el giro pida otra cosa (una barbería no es una notaría).
5. **Si una fila no trae evidencia real, no le escribes.** Se salta y se le avisa.
6. **La única línea que se puede repetir es la salida** ("si no le sirve, no le vuelvo a
   escribir"). Todo lo demás cambia en cada mensaje. Si te descubres copiando y pegando
   el puente o la cosa chiquita, estás construyendo el mensaje A.

Guárdalos en `mensajes-de-hoy.csv` con exactamente tres columnas:

```
telefono,negocio,mensaje
```

Cuando termines, **enséñale tres al azar** — no los quince, se satura — y pregúntale:
*"¿Le mandarías estos tres tal cual, con tu nombre?"* Si dice que alguno suena a
agencia, reescríbelo. Ella conoce su gremio mejor que tú.

---

## FASE 8 — Armar, y verificar contando

```bash
python3 bin/armar.py
```

Si sale **"ESO ES PLANTILLA"**, no lo rodees: significa que dos mensajes comparten doce
palabras seguidas fuera de la salida — y el programa te imprime cuál es la frase, para
que sepas exactamente qué reescribir. Ese aviso es el único guardia que tiene esta
persona contra el mensaje A.

Ahora **la verificación que sí sirve** — la del teléfono. Antes de mandarle a un
desconocido, que se lo mande a ella misma:

```bash
python3 -c "from urllib.parse import quote; print('https://wa.me/TU_NUMERO_CON_LADA?text=' + quote('prueba'))"
```

Que pegue esa liga en su navegador. **Si le abre su propio chat con la palabra "prueba"
escrita, el formato de teléfono está bien** y las quince ligas van a funcionar. Si no
abre nada o dice que el número no existe, la `LADA` está mal: corrígela en los tres
programas y vuelve a correr `armar.py`.

Y ábrele su página:

```bash
open mensajes-de-hoy.html    # Mac
start mensajes-de-hoy.html   # Windows
```

### Qué es una liga wa.me — y qué NO es

Dile esto completo, porque le van a preguntar y porque le quita un miedo caro:

> *"Esa liga no es la API de WhatsApp. La API es un programa de Meta que requiere
> empresa verificada, aprobación, plantillas autorizadas y se paga por conversación.
> Nada de eso hay aquí.*
>
> *Una liga `wa.me` es solo un atajo público: la dirección lleva el número y el texto
> pegados. Cuando la abres, se abre tu WhatsApp de siempre —el tuyo, el de tu celular—
> con el mensaje ya escrito en la barra. **No manda nada. Tú aprietas enviar.**
> No cuesta, no requiere permiso, no requiere cuenta nueva.*
>
> *Y esa es justamente la razón de que esto sea sano: cada mensaje lo manda una persona,
> con su dedo, después de leerlo. Ese medio segundo es la diferencia entre prospectar y
> hacer spam."*

---

## FASE 9 — La disciplina de volumen (y por qué es quince)

Esta es la parte que le salva el número. **No la resumas.**

> *"WhatsApp no publica un número máximo, así que cualquiera que te diga 'son 250 al
> día' te lo está inventando. Lo que sí se sabe es qué te quema: **no es el volumen, son
> los reportes y los bloqueos.** Un número que manda a puros desconocidos y junta
> reportes se restringe, y luego se pierde. Y cuando pierdes ese número, no pierdes una
> herramienta de trabajo: pierdes el grupo de la familia, los chats de tus clientes y tu
> historial. Nadie te lo regresa.*
>
> *Por eso el tope de esta casa es **quince al día**, y no está en tu página: está
> adentro del programa. Quince que puedas atender es más negocio que doscientos que te
> ignoran. Si te contestan tres, ¿podrías con treinta?"*

Las cinco reglas de la mano, dichas cortas:

1. **Quince al día**, y las dos primeras semanas mejor ocho. Un número que nunca había
   mandado mensajes fuera de su agenda y de pronto manda cien, se ve raro.
2. **Sepáralos.** A lo largo del día, no en ráfaga de cinco minutos.
3. **Contesta lo que te contesten, primero.** Una conversación viva vale más que quince
   nuevos. Si tienes cinco pendientes de responder, hoy no mandas nuevos.
4. **Nunca insistas dos veces sin respuesta.** El silencio también es respuesta.
5. **Ten foto y descripción decentes en tu perfil.** Lo primero que hace el que recibe
   es abrir tu foto para ver si eres persona o robot.

### Si alguien pide que no le escribas

Cualquier señal cuenta: *"no me escriba"*, *"quién es"*, *"bájame"*, *"stop"*, o que
te bloqueen. No hay interpretación, no hay "una más", no hay intentarlo por correo.

Una sola respuesta, corta y sin ofensa:

```
Con gusto. Ya no le escribo más. Buen día.
```

Y de inmediato:

```bash
python3 bin/baja.py 5512345678 "pidió que no le escriba"
```

> *"Ese archivo `bajas.csv` es el más valioso de la carpeta y es el único que nunca se
> borra. Y esto no es solo educación: en México, Colombia, Argentina, Perú y Chile hay
> leyes de datos personales reales y registros de 'no contactar'. Esto no es asesoría
> legal y aquí nadie es tu abogado — es la regla de operación de la casa. El día que le
> escribas a alguien que no puede decir 'ah, sí, tú', no te van a demandar: te van a
> reportar."*

Y el recordatorio de ayer, que ahora se entiende distinto:

> *"¿Te acuerdas del sistema de llamadas que te enseñé, con mil números que descansan 45
> minutos y eligen la lada más parecida? Esa disciplina no vive en el software. Vive en
> mi cerebro, escrita. El software nada más la obedece. Lo que acabas de escribir hoy
> es la tuya."*

---

## FASE 10 — Registrar quién contestó

Un mensaje mandado que no se anota es un mensaje perdido. Explícale el ciclo:

> *"Mañana, cuando abras una sesión, yo voy a saber a quién le escribiste. Lo que no voy
> a saber es **qué te contestaron** — eso me lo dictas tú y yo lo anoto. En un mes,
> `bitacora.csv` deja de ser una lista: se vuelve el manual de lo que a TU gremio le
> hace contestar."*

Cuando ella te diga *"me contestó el del consultorio"*, tú:

1. Abre `bitacora.csv`, busca el renglón por teléfono y cambia `estado` a `contesto`.
2. En `respuesta`, pega **la frase textual** con la que le contestó. Textual, no tu
   resumen. Esas palabras son el próximo mensaje bueno.
3. Si fue un *no*, `estado` = `no` y **corre `baja.py`** si pidió que no le escribas.
4. Si el mensaje funcionó, guarda la frase que funcionó en
   `~/cerebro/memoria/mi-vocabulario.md`, en "Frases que ya me funcionaron", y commitea.

Para ver cómo va, en cualquier momento:

```bash
python3 -c "import csv;f=list(csv.DictReader(open('bitacora.csv',encoding='utf-8-sig')));c=[x for x in f if x['estado']=='contesto'];print('mandados: %d · contestaron: %d · %.1f%%' % (len(f), len(c), 100*len(c)/max(len(f),1)))"
```

---

## Verificación final

Corre esto tú, no se lo dejes a ella:

```bash
echo "── Tu sistema de mensajes ──"
ls bin/cola.py bin/armar.py bin/baja.py >/dev/null 2>&1 && echo "3 programas OK" || echo "FALTA algún programa"
python3 -c "
import csv
m=list(csv.DictReader(open('mensajes-de-hoy.csv',encoding='utf-8-sig')))
t=[x['mensaje'] for x in m]
print('mensajes escritos:      %d' % len(t))
print('mensajes distintos:     %d' % len(set(t)))
print('el más largo:           %d caracteres' % max((len(x) for x in t), default=0))
print('con liga adentro:       %d  (tiene que ser 0)' % sum('http' in x.lower() for x in t))
"
grep -o "wa.me" mensajes-de-hoy.html | wc -l | sed 's/^/ligas en la página:    /'
test -f bajas.csv && echo "bajas.csv listo" || echo "bajas.csv se crea solo en la primera baja"
```

**Si "mensajes escritos" y "mensajes distintos" no dan el mismo número, hay dos
idénticos.** Ese es el único resultado que no se negocia: se reescriben.

---

## Cierre — cuéntale qué acaba de lograr

```
📨 Ya tienes tu máquina de mensajes.

✅ 15 mensajes, ninguno igual a otro, cada uno con
   las palabras que ESE negocio publicó
✅ 15 ligas que abren tu WhatsApp con el mensaje puesto
✅ Un tope que te protege el número, adentro del programa
✅ bajas.csv — el archivo que nunca se borra
✅ bitacora.csv — quién, qué le dijiste y qué te contestó

── El costo de hoy ──
$0. Ni una llave, ni una cuenta, ni un dominio.

── Lo que sigue ──
Mándalos separados. Contesta lo que te contesten. Y dime quién
te respondió, para anotarlo.
```

Y termina con esto, que es lo único que de verdad quieres que se le quede:

> *"Piensa qué pasó aquí. Yo no sé nada de tu gremio, y aun así estos quince mensajes
> suenan a ti y no a mí. La lista la sacamos de internet, gratis, la puede sacar
> cualquiera. Las palabras que la volvieron negocio salieron de tu memoria.*
>
> *Y hoy tu bitácora tiene quince renglones vacíos en la columna de respuesta. En tres
> meses va a tener trescientos, con las frases exactas que hicieron contestar a la gente
> de tu ramo. Eso no lo puedes comprar, no te lo puede prestar nadie, y no se pierde
> cuando cierres la computadora: se hereda. Un cerebro de un día vale poco. La única
> diferencia entre ese y uno que vale mucho es tiempo — y ya empezaste a contarlo."*

---

## Si te atoras

Después de dos intentos, **para**. Dile qué falló en lenguaje simple, que copie el error
completo y que lo pegue en el chat del curso.

Los tres tropiezos más comunes:

| Qué ves | Qué es | Qué haces |
|---|---|---|
| La liga abre WhatsApp pero dice que el número no existe | La `LADA` está mal, o el teléfono trae extensión | Corrige `LADA` en los tres programas y vuelve a correr `armar.py` |
| `cola.py` dice "disponibles: 0" | Ya los contactaste a todos, o la columna de teléfono se llama raro | Revisa `head -2` del CSV y dime cómo se llama esa columna |
| Todos rechazados por "ya lo contactaste antes" | Corriste `armar.py` dos veces con el mismo archivo | No hay nada roto: tu página ya está armada. Ábrela y manda |
| `ESO ES PLANTILLA` | Dos mensajes comparten doce palabras seguidas | Lee la frase que te imprimió y reescríbela con la evidencia de cada uno. No lo rodees |

---

_AI Business Builder · Día 2 · Pieza 3 de 4 — El mensaje_
