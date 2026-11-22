#!/usr/bin/env node
/**
 * Placeholder brand files (§8), until the illustrator's land under public/brand/.
 * Writes mark.svg, mark-512.png, mark-maskable.png and og-home.png. Each one is
 * simply overwritten by the delivered file; flip `delivered` in content/brand.ts.
 */
import { readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";
import { createElement as h } from "react";
import { ImageResponse } from "next/og.js";
import sharp from "sharp";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public/brand");

// A bow tie in a circle: « la classe », legible at 16 px.
const bowTie = (fg, bg, pad = 0) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${-pad} ${-pad} ${64 + 2 * pad} ${64 + 2 * pad}">
  <!-- PLACEHOLDER: replaced by the commissioned mark -->
  <rect x="${-pad}" y="${-pad}" width="${64 + 2 * pad}" height="${64 + 2 * pad}" fill="${bg}"/>
  <circle cx="32" cy="32" r="29" fill="none" stroke="${fg}" stroke-width="3"/>
  <path d="M12 22 L29 30 L29 34 L12 42 Z M52 22 L35 30 L35 34 L52 42 Z" fill="${fg}"/>
  <rect x="28" y="27.5" width="8" height="9" rx="1.5" fill="${fg}"/>
</svg>`;

await writeFile(join(OUT, "mark.svg"), bowTie("#E4DED2", "#0E0D0C"));
await sharp(Buffer.from(bowTie("#E4DED2", "#0E0D0C"))).resize(512, 512).png().toFile(join(OUT, "mark-512.png"));
await sharp(Buffer.from(bowTie("#E4DED2", "#0E0D0C", 14))).resize(512, 512).png().toFile(join(OUT, "mark-maskable.png"));

const font = (p) => readFile(join(ROOT, "node_modules/@fontsource", p));
const [bodoni, italic, courier] = await Promise.all([
  font("bodoni-moda/files/bodoni-moda-latin-500-normal.woff"),
  font("bodoni-moda/files/bodoni-moda-latin-400-italic.woff"),
  font("courier-prime/files/courier-prime-latin-400-normal.woff"),
]);
const stills = JSON.parse(await readFile(join(ROOT, "content/stills.generated.json"), "utf8"));
const george = await sharp(join(ROOT, "public", stills["george-hero"].src)).resize(400).png().toBuffer();

const og = new ImageResponse(
  h(
    "div",
    { style: { width: "100%", height: "100%", display: "flex", background: "#0E0D0C", color: "#E4DED2" } },
    h(
      "div",
      { style: { flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 56px 52px 72px" } },
      h("div", { style: { display: "flex", fontFamily: "Courier Prime", fontSize: 20, letterSpacing: 4, color: "#9E978A" } }, "LES ACTUALITÉS — ÉDITION SPÉCIALE"),
      h(
        "div",
        { style: { display: "flex", flexDirection: "column" } },
        h("div", { style: { fontFamily: "Bodoni Moda", fontWeight: 500, fontStyle: "normal", fontSize: 76, lineHeight: 1 } }, "L'homme le plus classe du monde est mort."),
        h("div", { style: { marginTop: 24, fontFamily: "Bodoni Moda", fontWeight: 400, fontStyle: "italic", fontSize: 44 } }, "« Monde de merde. »"),
      ),
      h(
        "div",
        { style: { display: "flex", alignItems: "baseline", gap: 18 } },
        h("div", { style: { fontFamily: "Bodoni Moda", fontWeight: 400, fontStyle: "italic", fontSize: 40 } }, "Le Flim"),
        h("div", { style: { fontFamily: "Courier Prime", fontSize: 16, letterSpacing: 3, color: "#9E978A" } }, "LA CLASSE AMÉRICAINE · HOMMAGE"),
      ),
    ),
    h(
      "div",
      { style: { display: "flex", width: 420, height: "100%", padding: "40px 40px 40px 0" } },
      h("img", { src: `data:image/png;base64,${george.toString("base64")}`, width: 380, height: 550, style: { objectFit: "cover", border: "1px solid #ffffff2e" } }),
    ),
  ),
  {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Bodoni Moda", data: bodoni, weight: 500, style: "normal" },
      { name: "Bodoni Moda", data: italic, weight: 400, style: "italic" },
      { name: "Courier Prime", data: courier, weight: 400, style: "normal" },
    ],
  },
);
await writeFile(join(OUT, "og-home.png"), Buffer.from(await og.arrayBuffer()));
console.log("Wrote public/brand/{mark.svg,mark-512.png,mark-maskable.png,og-home.png} (placeholders).");
