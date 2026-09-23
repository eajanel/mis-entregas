const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun, HeadingLevel, AlignmentType,
  Table, TableRow, TableCell, WidthType, BorderStyle, ShadingType,
  LevelFormat, PageBreak, TableOfContents, convertInchesToTwip
} = require("docx");

const desayunos = require("./recetas-desayunos.js");
const comidas = require("./recetas-comidas.js");
const cenas = require("./recetas-cenas.js");
const snacks = require("./recetas-snacks.js");
const bebidas = require("./recetas-bebidas.js");

const CATS = [
  { key: "desayunos", label: "Desayunos", data: desayunos },
  { key: "comidas", label: "Comidas", data: comidas },
  { key: "cenas", label: "Cenas", data: cenas },
  { key: "snacks", label: "Snacks", data: snacks },
  { key: "bebidas", label: "Bebidas", data: bebidas },
];

const FOREST = "1F4D3D";
const GOLD = "A9761F";
const INK = "1B241F";
const INK_DIM = "4C564F";
const LINE = "D8D8CE";

const numbering = {
  config: [
    {
      reference: "ingredientes-bullets",
      levels: [
        { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: convertInchesToTwip(0.35), hanging: convertInchesToTwip(0.2) } } } },
      ],
    },
  ],
};

function total() { return CATS.reduce((n, c) => n + c.data.length, 0); }

function coverPage() {
  return [
    new Paragraph({ text: "", spacing: { before: 2000 } }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "SISTEMA O.M.N.I.™ · PROYECTO RENACER OMNISALUD™", size: 18, color: GOLD, bold: true, font: "Arial" })],
      spacing: { after: 300 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Recetario Premium Renacer™", bold: true, size: 56, color: FOREST, font: "Georgia" })],
      spacing: { after: 200 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: `${total()} recetas para las 3 fases del programa`, size: 28, color: INK, font: "Georgia", italics: true })],
      spacing: { after: 800 },
    }),
    new Paragraph({
      alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: "Elemento 3 de la oferta · borrador de trabajo, pendiente de revisión final por Edgar", size: 20, color: INK_DIM, font: "Arial" })],
      spacing: { after: 3200 },
    }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function avisoPage() {
  const p = (text, opts = {}) => new Paragraph({
    children: [new TextRun({ text, size: 22, color: INK, font: "Arial", ...opts })],
    spacing: { after: 200 },
  });
  return [
    new Paragraph({ text: "Antes de usar este recetario", heading: HeadingLevel.HEADING_1, spacing: { after: 300 } }),
    new Table({
      width: { size: 9000, type: WidthType.DXA },
      columnWidths: [9000],
      borders: {
        top: { style: BorderStyle.SINGLE, size: 4, color: GOLD }, bottom: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
        left: { style: BorderStyle.SINGLE, size: 4, color: GOLD }, right: { style: BorderStyle.SINGLE, size: 4, color: GOLD },
        insideHorizontal: { style: BorderStyle.NONE }, insideVertical: { style: BorderStyle.NONE },
      },
      rows: [
        new TableRow({ children: [
          new TableCell({
            width: { size: 9000, type: WidthType.DXA },
            shading: { type: ShadingType.CLEAR, fill: "FBEEE0" },
            margins: { top: 200, bottom: 200, left: 200, right: 200 },
            children: [
              new Paragraph({ children: [new TextRun({ text: "Aviso de salud", bold: true, size: 22, color: "C98A2E", font: "Arial" })], spacing: { after: 120 } }),
              new Paragraph({ children: [new TextRun({ text: "Ninguna receta de este documento sustituye indicación médica o nutricional individual. Si el alumno vive con diabetes, hipertensión o toma medicamento, debe validar con su médico o nutriólogo cualquier cambio de alimentación — algunas frutas y el sodio de ciertos ingredientes pueden requerir ajuste según cada caso.", size: 21, color: INK, font: "Arial" })] }),
            ],
          }),
        ]}),
      ],
    }),
    new Paragraph({ text: "", spacing: { after: 300 } }),
    p("Este recetario se construyó sobre el método de “plato base” y el protocolo de 3 fases ya definidos en el programa:", { bold: true }),
    p("Proteína magra + Verdura libre + Grasa saludable + Fermentado (opcional) + Carbohidrato complejo (según fase)."),
    p("Cada receta indica en qué fase(s) es apta:", { bold: true }),
    p("•  Fases 1-3: apta desde el primer día, incluye poca o ninguna fruta y carbohidrato mínimo."),
    p("•  Fases 2-3: incluye fruta (siempre acompañada de proteína o grasa) o un carbohidrato complejo en mayor cantidad — introducir a partir de la Fase 2."),
    new Paragraph({ text: "", spacing: { after: 200 } }),
    p("Pendiente antes de tratar este documento como contenido oficial pagado:", { bold: true, color: "C98A2E" }),
    p("Edgar debe revisar cantidades (sobre todo de fruta y sodio) con un nutriólogo, ajustar o sustituir recetas por las que él mismo probó en su propio proceso, y confirmar que ninguna receta entra en conflicto con medicamentos comunes para diabetes o hipertensión (ej. interacción de potasio con ciertos medicamentos)."),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function tocPage() {
  return [
    new Paragraph({ text: "Índice", heading: HeadingLevel.HEADING_1, spacing: { after: 200 } }),
    new Paragraph({
      children: [new TextRun({ text: "Haz clic derecho sobre el índice en Word y selecciona “Actualizar campo” para ver los números de página.", italics: true, size: 20, color: INK_DIM, font: "Arial" })],
      spacing: { after: 300 },
    }),
    new TableOfContents("Índice", { hyperlink: true, headingStyleRange: "1-2" }),
    new Paragraph({ children: [new PageBreak()] }),
  ];
}

function categoryIntro(cat) {
  return [
    new Paragraph({ text: `${cat.label} (${cat.data.length} recetas)`, heading: HeadingLevel.HEADING_1, spacing: { after: 300 } }),
  ];
}

function recipeBlock(r) {
  const out = [];
  out.push(new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 300, after: 60 },
    children: [new TextRun({ text: r.t, color: FOREST })],
  }));
  out.push(new Paragraph({
    spacing: { after: 160 },
    children: [new TextRun({ text: r.f, italics: true, size: 19, color: GOLD, font: "Arial" })],
  }));
  out.push(new Paragraph({
    spacing: { after: 60 },
    children: [new TextRun({ text: "Ingredientes", bold: true, size: 21, color: INK, font: "Arial" })],
  }));
  r.i.forEach((ing) => {
    out.push(new Paragraph({
      numbering: { reference: "ingredientes-bullets", level: 0 },
      spacing: { after: 40 },
      children: [new TextRun({ text: ing, size: 21, color: INK, font: "Arial" })],
    }));
  });
  out.push(new Paragraph({
    spacing: { before: 140, after: 60 },
    children: [new TextRun({ text: "Preparación", bold: true, size: 21, color: INK, font: "Arial" })],
  }));
  r.p.forEach((step, idx) => {
    out.push(new Paragraph({
      spacing: { after: 40 },
      indent: { left: convertInchesToTwip(0.25), hanging: convertInchesToTwip(0.25) },
      children: [new TextRun({ text: `${idx + 1}.  ${step}`, size: 21, color: INK, font: "Arial" })],
    }));
  });
  out.push(new Paragraph({
    spacing: { before: 140, after: 200 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: LINE, space: 12 } },
    children: [new TextRun({ text: `Tip: ${r.c}`, italics: true, size: 20, color: INK_DIM, font: "Arial" })],
  }));
  return out;
}

const children = [
  ...coverPage(),
  ...avisoPage(),
  ...tocPage(),
];

CATS.forEach((cat, ci) => {
  children.push(...categoryIntro(cat));
  cat.data.forEach((r) => children.push(...recipeBlock(r)));
  if (ci < CATS.length - 1) children.push(new Paragraph({ children: [new PageBreak()] }));
});

const doc = new Document({
  numbering,
  styles: {
    default: {
      document: { run: { font: "Arial", size: 21, color: INK } },
    },
    heading1: { run: { font: "Georgia", size: 32, bold: true, color: FOREST } },
    heading2: { run: { font: "Georgia", size: 24, bold: true, color: FOREST } },
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 1080, bottom: 1080, left: 1260, right: 1260 },
        },
      },
      children,
    },
  ],
});

Packer.toBuffer(doc).then((buffer) => {
  fs.writeFileSync("Recetario-Premium-Renacer-180-recetas.docx", buffer);
  console.log("OK:", total(), "recetas escritas.");
});
