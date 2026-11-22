/**
 * Commissioned brand assets (§8), landing under public/brand/ from the
 * illustrator. The paths are wired now; `delivered` flips to true as each file
 * lands, and the components swap their typographic placeholder for the file.
 * The favicon, maskable icon and home OG image already exist as generated
 * placeholders (npm run brand:placeholders) and are simply overwritten.
 */
export const BRAND = {
  wordmark: { src: "/brand/wordmark.svg", delivered: false },
  mark: { src: "/brand/mark.svg", delivered: false },
  mark512: { src: "/brand/mark-512.png", delivered: false },
  markMaskable: { src: "/brand/mark-maskable.png", delivered: false },
  ogHome: { src: "/brand/og-home.png", delivered: false },
  ident: { src: "/brand/ident-actualites.svg", delivered: false },
  spotCyclimse: { src: "/brand/spot-cyclimse.svg", delivered: false },
  spotGlobe: { src: "/brand/spot-globe.svg", delivered: false },
  stampClassee: { src: "/brand/stamp-classee.svg", delivered: false },
  stampCopie: { src: "/brand/stamp-copie.svg", delivered: false },
} as const;
