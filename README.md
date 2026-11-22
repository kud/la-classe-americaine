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
| `george-hero`, `george-wide` | V1 `george_big.jpg`, 760×840 | Hero-grade George (hat and star), ≥ 1600 px wide |
| `george-card` | fan frame, 1000 px (*The Sea Chase*, 0:00:28) | Retake from the film |
| `george-cowboy`, `george-sleeping` | YouTube thumbnails (640 / 1280 px) | Retake from the film |
| `dave-card`, `peter-card`, `dino-card`, `frankie-card` | YouTube thumbnails (480–640 px), card size only | Retake from the film |
| `steven-card`, `welles-card`, `redaction-sofa` | YouTube thumbnails (≈ 1280 px) | Retake from the film |
| `jose-card`, `jose-pirate` | fan frames, upscaled SD | Retake from the film |
| le patron du journal | none (typographic frame) | 4:5 still of Jason Robards |

Sources, timecodes and source films: `assets/stills-source/SOURCES.md`. Output files carry a content hash (`<id>.<hash>.webp`), so a replaced still never reuses a cached optimisation.

## Brand: what lands under `public/brand/`

`mark.svg`, `mark-512.png`, `mark-maskable.png` and `og-home.png` exist as generated placeholders and are simply overwritten. The wordmark, the newsreel ident and the spots (crossed-out bicycle, bow-tied globe, CLASSÉE and COPIÉ stamps) render typographic or line-drawn placeholders until their file lands at the path in `content/brand.ts` and `delivered` is set to `true`.
