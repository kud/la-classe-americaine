#!/usr/bin/env node
/**
 * The stills pipeline (§7). One command:
 *
 *   npm run stills                     # placeholders from assets/placeholder-stills/
 *   npm run stills -- <film-file>      # frames grabbed from the film at each timecode
 *
 * 1. Grab: ffmpeg -ss <timecode> -i <film> -frames:v 1 → lossless PNG master
 *    (assets/masters/, never committed). Without a film file, the V1 placeholder
 *    is read instead, pre-cropped to its rectangle.
 * 2. Crop to the aspect around the focus point; upscale at most 2×, Lanczos only.
 * 3. Grade: "actualites" (greyscale, contrast 1.15, blacks lifted to #141210)
 *    or "temoignage" (saturation 0.55, warm 6 % tint, slight fade). Grain is CSS.
 * 4. Export a graded WebP master (≤ 1600 w) to public/stills/; next/image serves
 *    AVIF/WebP at each slot's size from it. Plus a 16 px blurred placeholder.
 * 5. Write content/stills.generated.json. Never hand-edited.
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";
import sharp from "sharp";
import { STILLS } from "../content/stills.data.ts";

const ROOT = resolve(import.meta.dirname, "..");
const OUT = join(ROOT, "public/stills");
const MASTERS = join(ROOT, "assets/masters");
const PLACEHOLDERS = join(ROOT, "assets/placeholder-stills");
const film = process.argv[2];
const MAX_W = 1600;

const ASPECTS = { "4:5": 4 / 5, "16:9": 16 / 9, "1:1": 1 };

mkdirSync(OUT, { recursive: true });

async function source(still) {
  if (film) {
    if (!still.timecode) throw new Error(`${still.id}: no timecode in content/stills.data.ts`);
    mkdirSync(MASTERS, { recursive: true });
    const png = join(MASTERS, `${still.id}.png`);
    execFileSync("ffmpeg", ["-y", "-loglevel", "error", "-ss", still.timecode, "-i", film, "-frames:v", "1", png]);
    return sharp(png);
  }
  const file = join(PLACEHOLDERS, still.placeholder.file);
  if (!existsSync(file)) throw new Error(`${still.id}: missing placeholder ${file}`);
  let img = sharp(file);
  if (still.placeholder.rect) {
    const [left, top, width, height] = still.placeholder.rect;
    img = sharp(await img.extract({ left, top, width, height }).toBuffer());
  }
  return img;
}

function cropBox(w, h, aspect, [fx, fy]) {
  const r = ASPECTS[aspect];
  let cw = w;
  let ch = Math.round(w / r);
  if (ch > h) {
    ch = h;
    cw = Math.round(h * r);
  }
  const left = Math.min(Math.max(Math.round(fx * w - cw / 2), 0), w - cw);
  const top = Math.min(Math.max(Math.round(fy * h - ch / 2), 0), h - ch);
  return { left, top, width: cw, height: ch };
}

function grade(img, look) {
  if (look === "actualites") {
    // contrast 1.15 around mid-grey, then lift blacks to #141210 (20, 18, 16)
    const a = 1.15;
    const b = 128 * (1 - a);
    const lift = [20, 18, 16];
    const scale = lift.map((l) => (255 - l) / 255);
    const luma = [0.299, 0.587, 0.114];
    return img
      .removeAlpha()
      .recomb([luma, luma, luma])
      .linear(a, b)
      .pipelineColourspace("srgb")
      .linear(scale, lift);
  }
  // temoignage: saturation 0.55, warm 6 % tint, slight fade
  return img
    .modulate({ saturation: 0.55 })
    .linear([0.94 * 1.06, 0.94 * 1.02, 0.94 * 0.96], [12, 11, 9]);
}

const out = {};
for (const still of STILLS) {
  const src = await source(still);
  const { width: sw, height: sh } = await src.metadata();
  const box = cropBox(sw, sh, still.crop.aspect, still.crop.focus);
  const targetW = Math.min(MAX_W, box.width * 2);
  const targetH = Math.round(targetW / ASPECTS[still.crop.aspect]);
  const cropped = await src.extract(box).toBuffer();
  const graded = await grade(sharp(cropped), still.grade)
    .resize(targetW, targetH, { kernel: "lanczos3" })
    .toBuffer();
  const file = `${still.id}.webp`;
  await sharp(graded).webp({ quality: 90 }).toFile(join(OUT, file));
  const blur = await sharp(graded).resize(16).blur(1).webp({ quality: 40 }).toBuffer();
  out[still.id] = {
    src: `/stills/${file}`,
    width: targetW,
    height: targetH,
    blurDataURL: `data:image/webp;base64,${blur.toString("base64")}`,
  };
  console.log(`${still.id}: ${box.width}×${box.height} → ${targetW}×${targetH} (${still.grade}${film ? "" : ", placeholder"})`);
}

writeFileSync(join(ROOT, "content/stills.generated.json"), JSON.stringify(out, null, 2) + "\n");
console.log(`Wrote ${Object.keys(out).length} stills.`);
