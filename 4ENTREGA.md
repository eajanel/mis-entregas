# 4 · LA ENTREGA — llega con el trabajo ya hecho

> **Este archivo es para tu asistente de IA.**
>
> Guárdalo en la carpeta de tu proyecto, abre Claude Code ahí, y escríbele:
>
> ```
> Lee 4-ENTREGA.md y hazme las 10 páginas.
> ```
>
> Cuando termine vas a tener **diez ligas que puedes mandar hoy**, cada una con el
> nombre, el teléfono y la dirección reales de un negocio que no tiene página.
>
> No vas a llamar a ofrecer. Vas a llamar a entregar.

---

## Para la IA que está leyendo esto

Esta persona lleva medio día construyendo. Ya tiene tres cosas:

1. **Un inventario** de sus activos ocultos (contactos, gremio, familia, clientes viejos).
2. **Una lista de negocios reales** sacada de datos públicos — muchos de ellos **sin sitio web**, porque así los filtró. Vive en `~/mina/` (sobre todo `~/mina/denue.filtrado.csv`, que es justo el filtro de "con teléfono y sin página") y también en su tabla `prospectos` de Supabase.
3. **Mensajes** escritos con las palabras de su gremio.

Hoy cierras la cadena: **le construyes la página a diez de esos negocios ANTES de hablarles.**

El movimiento no es "le hablo para ofrecerle una página". Es: *"Buenas tardes, le hice esto a su negocio, aquí está la liga, véala. Si le gusta hablamos, si no, se la regalo."*

Eso le quita todo el riesgo al otro. No le pides junta, ni presupuesto, ni tiempo. Le das algo.

### Tu tono
- Español mexicano (tú/checar/ahorita). Nunca vos/tenés/vale/ordenador.
- Cero jerga sin explicar. Si dices "slug" o "deploy", explícalo en una línea la primera vez.
- **Explica ANTES de cada paso, un paso a la vez.** No sueltes tres instrucciones juntas: se pierden. Después de cada fase, para y espera a que te conteste.
- Celebra lo que va saliendo. Está a punto de tener algo que puede mandar hoy mismo.

### 🚨 Reglas duras — nunca las rompas

1. **Nunca pidas contraseñas ni llaves secretas.** Estas páginas **no llevan ninguna llave**: ni de Supabase, ni de nada. Si te dan ganas de conectarles un formulario a su base de datos, **no lo hagas** (la Fase 3 explica por qué).
2. **Nada destructivo.** No borres carpetas, no hagas `rm -rf`, no toques lo que ya estaba publicado. Si vas a escribir encima de un archivo que ya existe, **respáldalo primero** con extensión `.respaldo` y avísale.
3. **Cero datos inventados.** Ni precios, ni horarios, ni promociones, ni testimonios, ni "20 años de experiencia". Estás escribiendo sobre el negocio de **otra persona**: inventarle algo no es creatividad, es ponerle en la boca algo que no dijo. Si un dato no está en la lista, **no aparece en la página**.
4. **Nada de logos, fotos ni imágenes del negocio ajeno.** No bajes su foto de Facebook, de Google ni de ningún lado. La página se hace con tipografía, color y espacio. Se ve mejor y no le pertenece a nadie más.
5. **Publica en `main`. No crees ramas. No abras Pull Requests.** Si creas una rama, lo que sale es una *preview* protegida con login y **no hay liga pública que mandar**. Ésta es la causa número uno de "me sale una pantalla de login de Vercel".
6. **Verifica contando, no confiando.** Cuando termines, no digas "ya quedaron las 10". Cuéntalas: cuenta carpetas, cuenta archivos, abre las ligas y cuenta cuántas responden. Los sistemas dicen "hecho" y mienten.
7. **Si algo falla dos veces, para.** No entres en ciclo de intentos. Dile qué error salió exactamente y que lo pegue en el chat del curso.

### Antes de empezar: dile qué van a hacer

Con tus palabras, algo así:

> *"Vamos a agarrar diez negocios de tu lista que no tienen página, y les vamos a construir una. Una cada uno, con su nombre, su teléfono y su dirección de verdad. Cuando terminemos vas a tener diez ligas. Y el mensaje no va a ser 'le vendo una página', va a ser 'ya se la hice, véala'."*

Y luego arranca con la Fase 1. No le pidas permiso para revisar sus archivos — revísalos y repórtale.

---

## FASE 1 — Qué ya tiene (3 min)

Revisa en silencio y luego repórtale en una frase. No lo conviertas en interrogatorio.

```bash
# ¿Dónde estamos y qué hay?
pwd
ls

# ¿Ya hay una lista de negocios? (la pieza 2 los deja en ~/mina)
ls -la ~/mina/*.csv *.csv 2>/dev/null || echo "SIN LISTA todavía"
head -3 ~/mina/denue.filtrado.csv 2>/dev/null   # los SIN página web viven aquí

# ¿Ya hay un proyecto publicado? (esto dice a dónde se sube el código)
git remote -v 2>/dev/null || echo "SIN REPOSITORIO todavía"
```

Y lee su cerebro, que es de donde va a salir el tono de todo lo que escribas hoy:

```bash
python3 ~/cerebro/bin/buscar.py "mi ciudad mi giro a qué me dedico"
python3 ~/cerebro/bin/buscar.py "cómo hablo con clientes de tú o de usted"
```

Interpreta así:

| Qué encontraste | A dónde vas |
|---|---|
| Hay lista en `~/mina` **y** hay repositorio con remote | **Fase 2.** Camino normal. |
| Hay lista en `~/mina` pero no hay repositorio | Fase 2, y en la Fase 6 usas el **Camino B** (proyecto nuevo). |
| No hay lista en ningún lado | Fase 2, opción manual: se los va a dictar él. **No inventes negocios.** |

> **Lo que le tienes que decir si su cerebro sí traía su giro y su ciudad:**
> *"Fíjate en algo: no te pregunté a qué te dedicas ni en qué ciudad estás. Ya lo sabía. Eso no lo hizo la inteligencia artificial — eso lo hizo tu memoria."*

---

## FASE 2 — Los diez (10 min)

No son diez cualquiera. Son diez **escogidos**, y el criterio importa más que la cantidad.

### Cómo se escogen

De su lista, deja pasar solo a los que cumplan **todo** esto:

- **No tienen sitio web.** Es el punto entero del ejercicio.
- **Tienen teléfono legible** (10 dígitos, no un "01 800" cortado ni un campo vacío).
- **Tienen dirección completa** — calle y colonia, no nada más "Centro".
- **Son un giro donde una página SÍ sirve**: alguien a quien la gente busca antes de ir o antes de llamar (dentista, salón, taller, veterinaria, papelería, gimnasio, cocina económica, clínica, refaccionaria). Una fábrica de tornillos que le vende a tres clientes por contrato, no.
- **Están cerca de él.** Si el negocio contesta, tiene que poder ir. Diez ligas mandadas a otro estado son diez ligas muertas.

Y el desempate, que es el que más sirve:

> **Si en tu lista hay alguno donde ya te conocen — donde te saludan por tu nombre — ése va primero.** Ese no es un desconocido: es un negocio que ya te vio la cara. La probabilidad de que abra tu liga no se parece en nada a la de los otros nueve.

### La lista de no contactar

Antes de escoger, crea esto y explícale para qué es:

```bash
mkdir -p entrega
touch entrega/no-contactar.txt
```

> *"Aquí va cualquiera que te diga que no le escribas. Un renglón por negocio. Antes de mandar cualquier cosa, revisamos este archivo. Un 'no' se respeta a la primera — así trabaja la gente seria, y además te ahorra problemas."*

### Arma el archivo de trabajo

Crea `entrega/negocios-10.csv` con **exactamente estas diez columnas, en este orden**:

```
nombre,giro,telefono,tipo_numero,direccion,ciudad,slug,servicio1,servicio2,servicio3
```

Reglas para llenarlo:

- **`nombre`, `telefono`, `direccion`, `ciudad`** → salen tal cual de su lista. **Copiados, no reescritos.**
- **`tipo_numero`** → `movil` o `fijo`. En México los celulares son 10 dígitos con lada de celular; muchos negocios del DENUE traen **teléfono fijo**, y a un fijo **no le llega WhatsApp**. Si no estás seguro, ponle `fijo` y que él lo corrija — es mejor equivocarse hacia la llamada que mandar un mensaje al vacío.
- **`slug`** → el nombre en minúsculas, sin acentos, sin espacios ni caracteres raros: `panaderia-lupita`. Es lo que va a salir en la liga, así que tiene que poder **dictarse por teléfono**. Corto.
- **`servicio1/2/3`** → tres cosas que ese **giro** hace, en dos o tres palabras. `Cortes de cabello`, `Tinte`, `Peinado para eventos`. **Verdades del giro, no afirmaciones sobre ese negocio.** Puedes decir que un salón hace cortes. **No** puedes decir que ese salón es el mejor de la colonia, ni que abre los domingos, ni cuánto cobra.

> 🚨 **Escribe este archivo con `csv.writer` de Python, nunca a mano.**
>
> Las direcciones mexicanas traen comas — *"Av. Zaragoza 45, Col. Centro"*. En un archivo separado por comas, esa coma parte el campo en dos y **recorre todas las columnas del renglón**: la ciudad acaba en el lugar del giro, el slug en el lugar de la ciudad, y las páginas salen con los datos cambiados de lugar. `csv.writer` le pone comillas solo y el problema no existe. Es la falla más silenciosa de esta construcción: no truena nada, nada más sale mal.

Cuando lo tengas, **enséñaselo en una tabla en el chat** y pregúntale:

> *"¿Estos diez? ¿Alguno lo quieres fuera, alguno se te ocurre mejor?"*

**Espera su respuesta. No sigas sin ella.** Es su nombre el que va a ir en esas páginas.

### Verificación de la fase

```bash
# Tienen que ser 11 renglones: el de los títulos + 10 negocios
wc -l < entrega/negocios-10.csv

# Columnas completas y sin corrimientos (esto imprime el renglón malo, si hay)
python3 -c "
import csv
malos = 0
for i, r in enumerate(csv.DictReader(open('entrega/negocios-10.csv', encoding='utf-8')), 1):
    nombre = r.get('nombre', '?')
    if None in r:            # sobran comas: una dirección sin comillas partió el renglón
        malos += 1
        print('Renglón %d (%s): SOBRAN COLUMNAS — hay una coma suelta, seguro en la dirección' % (i, nombre))
        continue
    vacios = [k for k, v in r.items() if not (v or '').strip()]
    if vacios:
        malos += 1
        print('Renglón %d (%s) le falta: %s' % (i, nombre, ', '.join(vacios)))
print('OK: los 10 renglones están completos y bien alineados' if not malos else 'HAY %d RENGLONES MAL' % malos)
"
```

Si algo falta, **no lo rellenes tú**. Pregúntale o saca ese negocio y mete otro.

---

## FASE 3 — Las reglas de la casa (léelas antes de escribir una sola línea de HTML)

Esto es lo que separa un regalo que abre puertas de un problema. **No es opcional y no se negocia.** Explícaselas a él también, cortito — le van a servir el resto de su vida.

### 1. Es una página **de cortesía**, y lo dice ella misma

Cada página lleva, abajo y visible, una banda que dice **quién la hizo y que no es oficial**. No en letras chiquitas escondidas: visible.

> **Por qué:** el regalo funciona porque **es un regalo de verdad**. En el momento en que la página finge ser oficial, dejó de ser un detalle y se volvió una suplantación.

### 2. **No se publica a nombre del negocio ajeno**

La página vive **en la dirección de él**, en una subcarpeta:

```
✅  mi-proyecto.vercel.app/para-panaderia-lupita
❌  panaderia-lupita.vercel.app
❌  panaderialupita.com
```

Y lleva esta línea en el encabezado, que le dice a Google que **no la indexe**:

```html
<meta name="robots" content="noindex, nofollow">
```

> **Por qué importa:** sin eso, tu muestra puede acabar apareciendo en Google cuando alguien busque ese negocio, compitiendo con su ficha real. Ahí se acabó el regalo y empezó el pleito. Una línea lo evita.

### 3. **Cero logo, cero fotos suyas**

No bajes su logo, ni sus fotos de Facebook, ni una imagen de su fachada de Google. **Nada.** Ese material es de ellos y muchas veces ni siquiera es de ellos — es del fotógrafo.

Lo que sí puedes usar: tipografía grande, color, espacio en blanco, iconos hechos con texto o emoji. Una página bien acomodada sin fotos se ve **mejor** que una con fotos robadas de baja resolución.

### 4. **Se dice que es una muestra hecha por él**

En el título, en la banda de abajo y en el mensaje. Tres veces. La frase de Spencer, tal cual:

> *"Es una demo en mi liga; si le gusta, se la paso a la suya. No mientan ni tantito. El regalo funciona porque es un regalo de verdad."*

### 5. **Los clientes de ese negocio son de ese negocio**

La página **no lleva formulario**, no guarda nada, no escribe en su base de datos. Lleva **un botón grande de WhatsApp que abre un chat con el número DEL NEGOCIO**, o el botón de llamar si el número es fijo.

> **Por qué:** si le pones tu formulario, le estás quitando sus clientes con su propia página. Eso se nota, y se nota tarde. Además esas páginas no llevan ninguna llave — sin llave no hay nada que filtrar.

### 6. **Si te piden que la bajes, se baja el mismo día**

Sin discutir, sin preguntar por qué. Se borra la carpeta, se publica otra vez, y el negocio se anota en `entrega/no-contactar.txt`. En la Fase 9 le dejas el comando escrito para que sepa que se puede.

---

## FASE 4 — La primera página (15 min)

Una sola. Bien hecha. La primera es la plantilla de las otras nueve.

Explícale la idea antes de escribir nada:

> *"Voy a hacer UNA página y le voy a dejar huecos donde van los datos. Luego un programita chiquito toma tu lista y llena esos huecos diez veces. Así es como se construye infraestructura: no haces diez páginas, haces UNA máquina que hace diez."*

Crea `entrega/plantilla.html`. **Ésta es la base — ajústale colores y secciones al giro, pero no le quites la banda de cortesía, el `noindex` ni el botón.**

```html
<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{{NOMBRE}} — muestra</title>
<meta property="og:title" content="{{NOMBRE}} — muestra">
<meta property="og:description" content="Página de muestra hecha para {{NOMBRE}}, {{CIUDAD}}.">
<style>
  :root{
    --tinta:#14110f;
    --papel:#fbf8f4;
    --acento:#c2410c;      /* cámbialo según el giro */
  }
  *{box-sizing:border-box;margin:0;padding:0}
  body{
    font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
    background:var(--papel); color:var(--tinta);
    line-height:1.6; -webkit-font-smoothing:antialiased;
  }
  .caja{max-width:720px;margin:0 auto;padding:0 24px}
  header{padding:72px 0 56px;text-align:center}
  header .giro{
    text-transform:uppercase;letter-spacing:.18em;font-size:13px;
    color:var(--acento);font-weight:700;margin-bottom:14px;
  }
  header h1{font-size:clamp(34px,7vw,54px);line-height:1.1;letter-spacing:-.02em}
  header .donde{margin-top:14px;font-size:17px;opacity:.7}
  .boton{
    display:inline-block;margin-top:32px;padding:17px 34px;border-radius:999px;
    background:var(--acento);color:#fff;text-decoration:none;
    font-weight:700;font-size:17px;
  }
  .servicios{display:grid;gap:14px;padding:8px 0 56px}
  @media(min-width:640px){.servicios{grid-template-columns:repeat(3,1fr)}}
  .servicio{
    background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:14px;
    padding:26px 22px;text-align:center;font-weight:600;font-size:17px;
  }
  .datos{
    background:#fff;border:1px solid rgba(0,0,0,.07);border-radius:14px;
    padding:30px;margin-bottom:56px;
  }
  .datos h2{font-size:14px;text-transform:uppercase;letter-spacing:.14em;
    color:var(--acento);margin-bottom:18px}
  .datos p{margin-bottom:10px}
  .datos a{color:var(--tinta)}
  .cortesia{
    border-top:1px solid rgba(0,0,0,.1);padding:26px 0 46px;
    font-size:13.5px;line-height:1.65;opacity:.72;
  }
</style>
</head>
<body>

  <header class="caja">
    <p class="giro">{{GIRO}}</p>
    <h1>{{NOMBRE}}</h1>
    <p class="donde">{{CIUDAD}}</p>
    {{BOTON}}
  </header>

  <div class="caja">
    <div class="servicios">
      <div class="servicio">{{SERVICIO1}}</div>
      <div class="servicio">{{SERVICIO2}}</div>
      <div class="servicio">{{SERVICIO3}}</div>
    </div>

    <div class="datos">
      <h2>Dónde y cómo</h2>
      <p><strong>Dirección:</strong> {{DIRECCION}}</p>
      <p><strong>Teléfono:</strong> <a href="tel:{{TEL_LIMPIO}}">{{TELEFONO}}</a></p>
      <p><a href="{{MAPA}}" target="_blank" rel="noopener">Ver cómo llegar en el mapa →</a></p>
    </div>

    <footer class="cortesia">
      <p><strong>Ésta es una muestra de cortesía.</strong> La hice yo, {{AUTOR}}, como ejemplo
      de cómo se vería {{NOMBRE}} en internet. <strong>No es el sitio oficial de {{NOMBRE}}</strong>
      y no fue hecha ni autorizada por ellos. Si al negocio le gusta, se la paso sin costo;
      si no la quiere, la doy de baja. Contacto: {{AUTOR_CONTACTO}}</p>
    </footer>
  </div>

</body>
</html>
```

> **El color sí importa y sí se cambia.** `--acento` viene naranja porque el naranja le queda bien a una panadería y horrible a un despacho contable. Escoge uno que vaya con el giro **antes** de generar las diez: cambiarlo después es volver a correr todo.
>
> Y no le metas librerías ni `npm install`. Esta página es un solo archivo, sin nada que descargar. Así carga rápido en el celular del dueño, que es donde la va a ver.

### Pruébala antes de seguir

Genera la primera y ábrela **en su computadora**, no en tu imaginación:

```bash
python3 -m http.server 8080
```

Dile que abra `http://localhost:8080/para-EL-SLUG/` en su navegador, y que la **abra también en su celular achicando la ventana** — nueve de cada diez negocios la van a ver en el teléfono.

Pregúntale directo:

> *"¿Se ve como algo que ese negocio pagaría? Si no, dime qué le cambio: el color, el tamaño, el orden."*

Ajusta hasta que diga que sí. **Esta página es la que se va a repetir diez veces: cada minuto que le metas aquí se multiplica.**

Para el servidor con `Ctrl + C` cuando termine.

---

## FASE 5 — Las otras nueve (12 min)

Ahora la máquina. Crea `entrega/generar.py`:

```python
#!/usr/bin/env python3
"""Toma negocios-10.csv + plantilla.html y escribe una página por negocio."""
import csv
import html
import re
import shutil
import urllib.parse
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent        # la carpeta del proyecto
CSV = BASE / "entrega" / "negocios-10.csv"
PLANTILLA = BASE / "entrega" / "plantilla.html"

AUTOR = "PON AQUÍ SU NOMBRE"
AUTOR_CONTACTO = "PON AQUÍ SU WHATSAPP O CORREO"
LADA_PAIS = "52"                                     # México

MENSAJE_AL_NEGOCIO = "Hola, vi su página y quiero información."


def solo_digitos(t: str) -> str:
    return re.sub(r"\D", "", t or "")


def boton(fila: dict) -> str:
    tel = solo_digitos(fila["telefono"])
    if fila["tipo_numero"].strip().lower() == "movil":
        texto = urllib.parse.quote(MENSAJE_AL_NEGOCIO)
        url = "https://wa.me/%s%s?text=%s" % (LADA_PAIS, tel, texto)
        return '<a class="boton" href="%s" target="_blank" rel="noopener">Escríbenos por WhatsApp</a>' % url
    return '<a class="boton" href="tel:%s">Llámanos: %s</a>' % (tel, html.escape(fila["telefono"]))


def main() -> None:
    plantilla = PLANTILLA.read_text(encoding="utf-8")
    filas = list(csv.DictReader(CSV.open(encoding="utf-8")))
    escritas = []

    for fila in filas:
        slug = fila["slug"].strip()
        carpeta = BASE / ("para-%s" % slug)
        carpeta.mkdir(parents=True, exist_ok=True)
        destino = carpeta / "index.html"

        # Nada destructivo: si ya había algo, se respalda.
        if destino.exists():
            shutil.copy(destino, destino.with_suffix(".html.respaldo"))

        mapa = "https://www.google.com/maps/search/?api=1&query=" + urllib.parse.quote(
            "%s, %s, %s" % (fila["nombre"], fila["direccion"], fila["ciudad"]))

        pagina = plantilla
        reemplazos = {
            "{{NOMBRE}}": html.escape(fila["nombre"]),
            "{{GIRO}}": html.escape(fila["giro"]),
            "{{CIUDAD}}": html.escape(fila["ciudad"]),
            "{{DIRECCION}}": html.escape(fila["direccion"]),
            "{{TELEFONO}}": html.escape(fila["telefono"]),
            "{{TEL_LIMPIO}}": solo_digitos(fila["telefono"]),
            "{{SERVICIO1}}": html.escape(fila["servicio1"]),
            "{{SERVICIO2}}": html.escape(fila["servicio2"]),
            "{{SERVICIO3}}": html.escape(fila["servicio3"]),
            "{{MAPA}}": mapa,
            "{{BOTON}}": boton(fila),
            "{{AUTOR}}": html.escape(AUTOR),
            "{{AUTOR_CONTACTO}}": html.escape(AUTOR_CONTACTO),
        }
        for hueco, valor in reemplazos.items():
            pagina = pagina.replace(hueco, valor)

        destino.write_text(pagina, encoding="utf-8")
        escritas.append(slug)

    print("Renglones en el CSV: %d" % len(filas))
    print("Páginas escritas:    %d" % len(escritas))
    for s in escritas:
        print("  · para-%s/index.html" % s)


if __name__ == "__main__":
    main()
```

Antes de correrlo, **pregúntale su nombre y con qué contacto quiere que lo busquen**, y ponlos en `AUTOR` y `AUTOR_CONTACTO`. No los inventes.

```bash
python3 entrega/generar.py
```

### Ahora revísalas de verdad — cuenta, no confíes

Ésta es la parte que casi nadie hace y donde se cae la mitad de la gente. Crea `entrega/revisar.py`:

```python
#!/usr/bin/env python3
"""Revisa que las 10 páginas existan, estén completas y no se hayan mezclado."""
import csv
import html
import re
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
filas = list(csv.DictReader((BASE / "entrega" / "negocios-10.csv").open(encoding="utf-8")))
problemas = []

for fila in filas:
    p = BASE / ("para-%s" % fila["slug"].strip()) / "index.html"
    if not p.exists():
        problemas.append("FALTA la página de %s" % fila["nombre"])
        continue
    t = p.read_text(encoding="utf-8")

    # Ojo: en la página los nombres van escapados ("Uñas & Spa" se guarda como
    # "Uñas &amp; Spa"), así que hay que comparar contra la versión escapada.
    mio = html.escape(fila["nombre"])

    if "{{" in t:
        problemas.append("%s: quedaron huecos sin llenar" % fila["nombre"])
    if mio not in t:
        problemas.append("%s: no aparece su propio nombre" % fila["nombre"])
    if re.sub(r"\D", "", fila["telefono"]) not in re.sub(r"\D", "", t):
        problemas.append("%s: no aparece su teléfono" % fila["nombre"])
    if "noindex" not in t:
        problemas.append("%s: le falta la línea de noindex" % fila["nombre"])
    if "muestra de cortesía" not in t.lower():
        problemas.append("%s: le falta la banda de cortesía" % fila["nombre"])

    # El error más común y más caro: datos de OTRO negocio pegados aquí.
    for otra in filas:
        if otra["slug"] == fila["slug"]:
            continue
        if html.escape(otra["nombre"]) in t:
            problemas.append("⚠️ %s trae el nombre de %s" % (fila["nombre"], otra["nombre"]))

carpetas = len(list(BASE.glob("para-*/index.html")))
print("Negocios en la lista: %d" % len(filas))
print("Páginas en el disco:  %d" % carpetas)
print("")
if problemas:
    print("PROBLEMAS (%d):" % len(problemas))
    for x in problemas:
        print("  · %s" % x)
else:
    print("✅ Las %d páginas están completas, con sus datos y sin mezclas." % carpetas)
```

```bash
python3 entrega/revisar.py
```

**No sigas a la Fase 6 hasta que este script imprima la palomita y el número diga 10.** Si dice 9, son 9. Si trae el nombre de otro negocio, se arregla ahorita — no después de mandarlo.

---

## FASE 6 — Publicar (12 min)

### 🚨 ANTES DE SUBIR NADA — el candado (30 segundos, no es opcional)

Este repositorio es **público**. Lo que subas se puede leer desde cualquier parte del
mundo. Las páginas sí van; **tus listas de teléfonos no.** Pon el candado primero:

```bash
printf 'entrega/*.csv\nentrega/no-contactar.txt\nentrega/entregas.md\n*.vcf\ncontactos.csv\nred-cercana.csv\ndonde-gasto.csv\ncruce.csv\nclientes.csv\nbitacora.csv\nbajas.csv\n.DS_Store\n' >> .gitignore
git status --short          # ← LÉELO. Si aparece algún .csv, NO subas: falta candado.
```

> Díselo así: *"Las diez páginas se publican; tu lista, no. Si tu carpeta de trabajo
> tiene tu agenda o tu bitácora, un `git add .` las manda a internet para siempre —
> y en GitHub 'para siempre' es literal: quedan en el historial aunque las borres."*

Si `git status --short` muestra un `.csv` que ya estaba subido de antes, **para** y
avísale. No lo resuelvas tú con prisa delante de la clase.

### Camino A — ya tiene proyecto publicado (lo normal)

Las páginas ya están dentro de su proyecto. Solo hay que subirlas:

```bash
git status                      # que vea las carpetas nuevas antes de subir
git add .
git commit -m "10 páginas de cortesía"
git branch --show-current       # DEBE decir main
git push
```

> ⚠️ **Si `git branch --show-current` no dice `main`, para.** Súbelo a main o no va a existir liga pública. Nada de ramas, nada de Pull Requests.

Vercel se da cuenta solo y vuelve a publicar en uno o dos minutos. Dile que espere — **no vuelvas a correr nada**, la impaciencia aquí no acelera nada.

### Camino B — todavía no tiene proyecto

Estos clics **los da él, en el navegador**. Tú lo acompañas, uno a uno:

> 1. Ve a **https://github.com/new**. Ponle un nombre corto sin espacios. Déjalo **público**. Dale *Create repository*.
> 2. GitHub te enseña unos comandos. **No los corras todos** — nada más pásame la línea que empieza con `git remote add origin`.
> 3. Ve a **https://vercel.com/new**, busca ese repositorio y dale *Import*.
> 4. En *Framework Preset* deja **Other**. No cambies nada más. Dale **Deploy**.
> 5. Cuando termine, cópiame la dirección que te da, la que acaba en `.vercel.app`.

Del lado de él, tú corres:

```bash
git init -q 2>/dev/null
git add .
git commit -m "10 páginas de cortesía"
git branch -M main
# aquí va la línea de git remote add origin que te pasó
git push -u origin main
```

> ⚠️ Si al abrir su liga sale **una pantalla de login de Vercel**, no es tu código: es la *Deployment Protection*. Se apaga en Vercel → el proyecto → **Settings → Deployment Protection → Vercel Authentication → Disabled → Save**. Sin eso, nadie más que él puede ver las páginas — y el punto entero es que las vea alguien más.

### Comprueba que las diez estén vivas — otra vez, contando

Crea `entrega/probar-ligas.py`:

```python
#!/usr/bin/env python3
"""Abre las 10 ligas publicadas y cuenta cuántas responden de verdad."""
import csv
import sys
import urllib.request
from pathlib import Path

if len(sys.argv) < 2:
    print('Uso: python3 entrega/probar-ligas.py https://tu-proyecto.vercel.app')
    sys.exit(0)

base = sys.argv[1].rstrip("/")
BASE = Path(__file__).resolve().parent.parent
filas = list(csv.DictReader((BASE / "entrega" / "negocios-10.csv").open(encoding="utf-8")))

vivas, ligas = 0, []
for fila in filas:
    url = "%s/para-%s/" % (base, fila["slug"].strip())
    try:
        with urllib.request.urlopen(url, timeout=15) as r:
            codigo = r.status
    except Exception as e:
        codigo = getattr(e, "code", str(e))
    ok = (codigo == 200)
    vivas += ok
    ligas.append((fila["nombre"], url, codigo))
    print("%s  %s  →  %s" % ("✅" if ok else "❌", fila["nombre"], codigo))

print("")
print("Vivas: %d de %d" % (vivas, len(filas)))
if vivas < len(filas):
    print("401 = protección prendida en Vercel · 404 = todavía no publica o el slug no coincide")
```

```bash
python3 entrega/probar-ligas.py https://SU-PROYECTO.vercel.app
```

**Diez de diez, o no terminaste.** Si sale 404 en todas, casi siempre Vercel todavía está publicando: espera un minuto y córrelo otra vez. Si sale 404 en una sola, el `slug` del CSV no coincide con el nombre de la carpeta.

### ⭐ El asterisco honesto de Vercel

Díselo tú, claro y sin drama, antes de que se entere por su cuenta:

> *"Todo esto está en el plan gratis de Vercel. Y el plan gratis de Vercel dice, con todas sus letras, que es **para uso personal, no comercial**. Hoy estás aprendiendo y estás regalando muestras: eso es uso personal, estás bien.*
>
> *El día que un negocio te diga que sí y le cobres, ese proyecto se vuelve comercial y te toca **Vercel Pro: 20 dólares al mes**. No es una trampa ni letras chiquitas — es el precio de tener el negocio prendido.*
>
> *Y velo en proporción: veinte dólares al mes lo paga **un solo cliente**, el primero. Hoy no compras nada. El día que compres, ya te lo estará pagando alguien más."*

---

## FASE 7 — El paquete de entrega (10 min)

Diez ligas sin un mensaje al lado no son nada. Arma el paquete completo.

### El mensaje

Tres versiones, según el número. Y **escríbelas con las palabras de él** — busca en su cerebro si habla de tú o de usted y respétalo. Un mensaje que no suena a él se nota en el primer renglón.

**Si el número es móvil (WhatsApp):**

```
Buenas tardes. Le escribo de parte mía, no de ninguna empresa.

Le hice una página a [NEGOCIO] para enseñarle cómo se vería en internet.
Aquí está: [LIGA]

Véala con calma. Si le gusta, con gusto se la paso a su nombre y hablamos.
Si no le gusta, se la regalo y no le vuelvo a molestar.
```

**Si el número es fijo (llamada) — el guion, corto:**

```
"Buenas tardes, ¿me pasa con el encargado, por favor?"

"Le hablo porque le hice una página a [NEGOCIO] para enseñarle
cómo se vería en internet. No le estoy vendiendo nada por teléfono.
¿A qué WhatsApp se la mando para que la vea?"

Y ya que la tenga: "Ábrala con calma. Si le gusta hablamos,
y si no, se la regalo."
```

**Si es un negocio donde lo conocen (en persona) — el mejor de los tres:**

```
"Oiga, le hice una cosa. Mire —"
(y le enseña la página en su propio celular, ahí parado)
```

> **Lo que le tienes que hacer notar:** *"Fíjate que en ninguna de las tres estás pidiendo algo. Estás dando. Por eso funciona — y por eso tienes que estar dispuesto de verdad a regalarla."*

### La tabla de entrega

Crea `entrega/hacer-entregas.py`, que escribe la tabla `entrega/entregas.md`: una fila por negocio, con **negocio · liga · cómo le llega · fecha · qué contestó**. Para los móviles arma la liga de WhatsApp con el mensaje **ya cargado**, para que él solo le dé enviar:

```python
#!/usr/bin/env python3
"""Arma entregas.md: liga de la página + liga de WhatsApp con el mensaje precargado."""
import csv
import re
import urllib.parse
from pathlib import Path

BASE = Path(__file__).resolve().parent.parent
SITIO = "https://SU-PROYECTO.vercel.app"          # cámbialo por el suyo
LADA_PAIS = "52"

PLANTILLA_MSJ = (
    "Buenas tardes. Le escribo de parte mía, no de ninguna empresa.\n\n"
    "Le hice una página a {nombre} para enseñarle cómo se vería en internet.\n"
    "Aquí está: {liga}\n\n"
    "Véala con calma. Si le gusta, con gusto se la paso a su nombre y hablamos.\n"
    "Si no le gusta, se la regalo y no le vuelvo a molestar."
)

filas = list(csv.DictReader((BASE / "entrega" / "negocios-10.csv").open(encoding="utf-8")))
lineas = ["# Mis 10 entregas", "",
          "| Negocio | Liga | Cómo le llego | Fecha | Qué contestó |",
          "|---|---|---|---|---|"]

for fila in filas:
    liga = "%s/para-%s/" % (SITIO, fila["slug"].strip())
    tel = re.sub(r"\D", "", fila["telefono"])
    if fila["tipo_numero"].strip().lower() == "movil":
        msj = PLANTILLA_MSJ.format(nombre=fila["nombre"], liga=liga)
        como = "[Mandar por WhatsApp](https://wa.me/%s%s?text=%s)" % (
            LADA_PAIS, tel, urllib.parse.quote(msj))
    else:
        como = "Llamar al %s (fijo — pedir su WhatsApp)" % fila["telefono"]
    lineas.append("| %s | [abrir](%s) | %s |  |  |" % (fila["nombre"], liga, como))

(BASE / "entrega" / "entregas.md").write_text("\n".join(lineas) + "\n", encoding="utf-8")
print("✅ entrega/entregas.md listo con %d negocios" % len(filas))
```

```bash
python3 entrega/hacer-entregas.py
```

### La prueba del celular

Antes de que mande nada, **una sola**:

> *"Ábrete `entrega/entregas.md`, dale clic a la primera liga de WhatsApp y **mándatela a ti mismo**. Quiero que veas exactamente lo que va a ver el dueño: el mensaje, la vista previa y la página en tu teléfono."*

Si WhatsApp dice **"el número de teléfono no es válido"**, casi siempre es la lada: en México a veces el número de celular necesita ir como `521` + los 10 dígitos en lugar de `52`. Cámbialo en `LADA_PAIS`, vuelve a correr el script y prueba otra vez. **Pruébalo, no lo supongas.**

> ⚠️ Y antes de mandar la primera: **revisa `entrega/no-contactar.txt`.** Siempre. Es un archivo de cinco segundos que te ahorra la única clase de problema que sí es caro.

---

## FASE 8 — El precio (8 min)

Casi nadie tropieza construyendo. Todos tropiezan cuando les preguntan **"¿y cuánto me cobra?"** y se quedan callados.

Aquí ya tiene la respuesta, y no salió de una suposición: **salió de la vacante que él mismo encontró.**

### El ancla

Explícaselo así:

> *"Cuando un negocio publica una vacante, publica tres cosas gratis: qué le duele, que tiene presupuesto, y **cuánto**.*
>
> *Si encontraste una vacante de recepcionista en doce mil pesos al mes, ese negocio **ya declaró en público** que resolver ese problema le vale doce mil al mes. Ciento cuarenta y cuatro mil al año, más prestaciones. Eso no lo estás suponiendo tú: lo escribió él.*
>
> *Tú no le vas a cobrar eso. Pero ya sabes **en qué rango piensa el que firma**. Y esa es la diferencia entre poner un precio y adivinar uno."*

### Los tres números que escribe hoy

Pregúntaselos y **anótalos**. No se los pongas tú:

1. **La página, una vez.** Lo que cuesta pasarla a su nombre, con sus fotos y sus textos.
2. **El mes.** Cambios, mantenerla viva, lo que siga. Un número chiquito y constante vale más que uno grande y de una sola vez.
3. **El precio del "no".** Debajo de qué número no lo hace, ni de malas. Éste es el que lo protege de trabajar gratis por accidente.

### Cómo se dice el precio

- **Número y silencio.** No lo justifiques antes de que pregunten. El que explica un precio sin que se lo pidan ya está negociando contra sí mismo.
- **La de cortesía es gratis de verdad.** No es carnada con letras chiquitas. Se cobra **lo que sigue**: pasarla a su dominio, sus fotos, sus textos, más páginas, lo demás del sistema.
- **Si preguntan por qué tanto**, la comparación — no la promesa:
  > *"Usted publicó una vacante de doce mil al mes para atender eso mismo. Esto es una fracción de un mes, y no pide vacaciones."*
- **Nunca prometas resultados.** Ni ventas, ni clientes, ni posiciones en Google. Vendes el trabajo y el sistema, no un número que no controlas. Prometer resultados es la forma más rápida de conseguir un cliente que te odie en sesenta días.

### Guárdalo en su cerebro

```bash
mkdir -p ~/cerebro/memoria
```

Crea `~/cerebro/memoria/mis-precios.md` con **los números que él te dio** (no con ejemplos), enlazado:

```markdown
# Mis precios

Vuelve a [[INICIO]] · Ver también [[mi-negocio]] · [[mis-reglas]]

- **Página, una vez:** $____
- **Mensual:** $____
- **Mi piso — debajo de esto no lo hago:** $____

**De dónde salió el ancla:** la vacante de ____ que encontré en ____, publicada en
$____ al mes. Ese negocio declaró en público lo que le vale ese problema.

**Cómo lo digo:** número y silencio. La página de cortesía es gratis de verdad;
se cobra lo que sigue. Nunca prometo resultados.
```

Y commitea:

```bash
cd ~/cerebro && git add -A && git commit -q -m "mis precios y de dónde salió el ancla"
```

> *"La próxima vez que alguien te pregunte cuánto cobras, tu IA ya lo va a saber. No lo vas a volver a improvisar."*

---

## FASE 9 — Verificación final

Córrela tú, delante de él, y **léele los números en voz alta**:

```bash
echo "── Negocios en la lista ──"
python3 -c "import csv;print(len(list(csv.DictReader(open('entrega/negocios-10.csv',encoding='utf-8')))))"

echo "── Páginas construidas ──"
ls -d para-*/ 2>/dev/null | wc -l

echo "── Revisión de contenido ──"
python3 entrega/revisar.py | tail -3

echo "── Ligas vivas en internet ──"
python3 entrega/probar-ligas.py https://SU-PROYECTO.vercel.app | tail -2

echo "── Paquete de entrega ──"
test -f entrega/entregas.md && echo "entregas.md listo" || echo "FALTA entregas.md"
test -f entrega/no-contactar.txt && echo "lista de no contactar lista" || echo "FALTA no-contactar.txt"
```

**Los tres números tienen que ser 10, 10 y 10.** Si uno dice 9, dile cuál falta y arréglalo. No redondees hacia arriba y no digas "ya quedó" si no quedó.

### Y déjale escrito cómo se baja una

Enséñaselo antes de cerrar, para que sepa que la puerta abre para los dos lados:

```bash
# Si un negocio te pide que la bajes:
rm -rf para-EL-SLUG
echo "Nombre del negocio — pidió que no le escribiera" >> entrega/no-contactar.txt
git add -A && git commit -m "baja de la muestra de EL-SLUG" && git push
```

---

## Antes de cerrar: escribe en su cerebro

Esto no se guarda solo. **Lo escribes tú, ahorita.**

En `~/cerebro/proyectos/<su-proyecto>/hilos-abiertos.md`, agrega o actualiza un bloque con:

- Las 10 ligas publicadas y su dirección base.
- A quién le entregó, en qué fecha y qué contestó (aunque hoy esté vacío).
- Dónde vive la plantilla (`entrega/plantilla.html`) y el generador (`entrega/generar.py`).
- Las reglas de la casa: cortesía, `noindex`, cero logos, botón al número del negocio.

Y en `~/cerebro/memoria/`, una nota nueva con **lo que aprendió del giro** mientras escribía las páginas — qué servicios se repiten, qué palabras usan, qué negocios de su ciudad no tienen página. Enlázala con `[[dobles corchetes]]` a `[[INICIO]]` y a `[[mi-negocio]]`.

```bash
cd ~/cerebro && git add -A && git commit -q -m "10 entregas publicadas + lo que aprendí del giro"
```

---

## Cierre — cuéntale exactamente qué logró

```
🎁 Ya tienes diez entregas listas.

✅ 10 negocios reales, escogidos por ti, todos sin página
✅ 10 páginas publicadas, con su nombre, su teléfono y su dirección de verdad
✅ 1 plantilla y 1 generador — la máquina, no el trabajo a mano
✅ El mensaje escrito para cada uno, en tus palabras
✅ Tu precio, con el ancla de dónde salió
✅ Tu lista de no contactar

Mañana, hacer otras diez no te toma setenta minutos.
Te toma diez: cambias el CSV y corres el generador.
```

Y las tres cosas que sí vale la pena decirle, sin apurarlas:

> *"La primera: no vendiste nada y ya trabajaste. Cuando marques, no vas a estar pidiendo una oportunidad — vas a estar entregando algo que ya existe. Eso cambia quién tiene la ventaja en la llamada."*

> *"La segunda: lo que construiste hoy no fueron diez páginas. Fue **una máquina que hace páginas**. Las diez son la salida; la máquina es el activo. La máquina sigue siendo tuya el año que entra, y el que sigue."*

> *"Y la tercera, la que quiero que se te quede: esas páginas salieron sonando a tu gremio, con tus palabras, sin que nadie te dictara qué escribir. **Eso no lo hizo la inteligencia artificial — eso lo hizo tu memoria.** Hoy tu cerebro tiene un día de vida y ya te ahorró que yo te preguntara veinte cosas. Dentro de seis meses va a tener tus precios, tus clientes, lo que funcionó y lo que no, y va a poder hacer esto solo mientras tú desayunas.*
>
> *Un cerebro de un día vale poco. Uno de meses vale mucho. La única diferencia entre los dos es el tiempo que lleva escribiendo — y ése ya empezó a correr."*

---

## Si te atoras

Si después de **dos** intentos algo no sale, **para**. No sigas probando.

Dile:
1. Qué paso falló, en lenguaje simple.
2. Que copie el mensaje de error **completo**.
3. Que lo pegue en el chat del curso.

Las tres fallas más comunes, y qué son de verdad:

| Lo que ve | Qué es | Qué se hace |
|---|---|---|
| Pantalla de login de Vercel al abrir su liga | Deployment Protection prendida, o publicó en una rama | Settings → Deployment Protection → Disabled. Y confirmar que está en `main`. |
| 404 en todas las ligas | Vercel todavía está publicando | Esperar un minuto y volver a correr `probar-ligas.py`. Si sigue, revisar que las carpetas estén en la raíz del proyecto. |
| 404 en una sola liga | El `slug` del CSV no coincide con el nombre de la carpeta | Comparar los dos. Acentos y mayúsculas cuentan. |
| WhatsApp dice "número no válido" | La lada del país | Probar `521` en lugar de `52` en México, volver a generar y **probar otra vez**. |

---

_AI Business Builder · Día 2 · Construcción 4 de 4 — La entrega_
