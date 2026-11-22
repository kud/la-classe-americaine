# Le Flim — laclasseamericaine-leflim.fr

Site hommage, non officiel, à *La Classe Américaine — Le Grand Détournement* (1993). © Warner Bros., Canal+.
Since 2011. This is the 2026 redesign, « Affaire classée »: the spec is [`docs/redesign/spec.md`](docs/redesign/spec.md).

## Run

```sh
npm install
npm run dev          # http://localhost:3000
npm run build        # runs the quote guard first (prebuild), then next build
npm test             # Vitest: the stage scheduler and the quote guard
npm run e2e          # Playwright smoke at 1280 and 390 (needs a build)
npm run lint && npm run typecheck
```

Next.js 16 (App Router, all routes static), React 19, `motion` for the Doublage and the stamps, CSS Modules and one token sheet (`app/globals.css`). No Tailwind, no component kit.

## Where things live

| Path | What |
| --- | --- |
| `content/` | Typed content: quotes (✓ only), pending quotes (◌, never published), characters, lines, reviews, films, credits, stills, brand paths |
| `lib/stage.ts` | The stage: a pure scheduler for the Doublage, witnesses and the entracte (one talking thing at a time) |
| `lib/quote-guard.test.ts` | The build gate: fails on banned, pending or unattested quotes and credits. `QUOTE_GATE=film npm test` also requires `filmChecked` |
| `lib/sound.ts` | Opt-in synthesised sound (Web Audio): projector whirr, typewriter tick, stamp thud |
| `scripts/stills.mjs` | The stills pipeline: grab (ffmpeg), crop, grade, export, blur placeholders |
| `scripts/brand-placeholders.mjs` | Placeholder mark, icons and home OG image under `public/brand/` |
| `scripts/check-links.mjs` | Re-checks V1's two bonus videos before they may ship |

## Stills: what to replace

Every still is declared in `content/stills.data.ts` and regenerated with `npm run stills` (interim sources) or `npm run stills -- <film-file>` once each still has a `timecode`.

| Still | Current source | To do |
| --- | --- | --- |
| `george-hero`, `george-wide` | V1 `george_big.jpg`, 760×840 | Hero-grade George (hat and star) from the film, ≥ 1600 px wide |
| `george-card` | fan frame, 1000 px, compressed (~00:00:35) | Retake from the film |
| `dave-card` | cut from a V1 composite, 374 px | Dave from the film |
| `peter-card` | cut from a painted V1 composite, 374 px | Peter from the film |
| `steven-card` | fan frame, upscaled SD (~00:32:25) | Retake from the film |
| `jose-card` | fan frame, upscaled SD (~00:35:01) | Retake from the film |
| `jose-pirate` | fan frame, upscaled SD (~00:01:19) | Retake from the film |
| Dino, Frankie, le patron, Orson Welles | none (typographic frame) | 4:5 witness stills |

## Brand: what lands under `public/brand/`

`mark.svg`, `mark-512.png`, `mark-maskable.png` and `og-home.png` exist as generated placeholders and are simply overwritten. The wordmark, the newsreel ident and the spots (crossed-out bicycle, bow-tied globe, CLASSÉE and COPIÉ stamps) render typographic or line-drawn placeholders until their file lands at the path in `content/brand.ts` and `delivered` is set to `true`.
