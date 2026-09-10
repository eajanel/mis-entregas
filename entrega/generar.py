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

AUTOR = "Edgar Ajanel"
AUTOR_CONTACTO = "WhatsApp 502 5639-6942"
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
