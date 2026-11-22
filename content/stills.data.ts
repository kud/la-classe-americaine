import type { CharacterId } from "./characters";

/**
 * Still declarations (§7). Plain data with type-only imports so that
 * scripts/stills.mjs can load it with Node's type stripping.
 */
export type Grade = "actualites" | "temoignage";
export type Aspect = "4:5" | "16:9" | "1:1";

export interface StillSpec {
  id: string;
  /** Timecode in the film, for `npm run stills -- <film-file>`. Null until the film file is chosen (decision 1). */
  timecode: string | null;
  crop: { aspect: Aspect; focus: [number, number] };
  grade: Grade;
  /** French, a deadpan witness statement of who and what, never « image de… ». */
  alt: string;
  character: CharacterId;
  scene: string;
  /** Source film when known; printed on /generique only once attested. */
  sourceFilm?: { title: string; status: "attested" | "uncertain" };
  /**
   * Interim source while there is no film file, relative to assets/: either an
   * old V1 still (placeholder-stills/, low resolution, composites) or a sourced
   * frame (stills-source/, see its SOURCES.md), with an optional pre-crop
   * rectangle [x, y, w, h] in source pixels.
   */
  placeholder: { file: string; rect?: [number, number, number, number] };
  /** What to replace once the film file arrives. */
  todo: string;
}

export const STILLS: StillSpec[] = [
  {
    id: "george-hero",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.3] },
    grade: "actualites",
    alt: "George Abitbol, chapeau de cow-boy et étoile de shérif, regarde l'objectif sans sourire.",
    character: "george",
    scene: "Le journal filmé",
    placeholder: { file: "placeholder-stills/george_big.jpg" },
    todo: "Plan rapproché de George pour le journal filmé, source ≥ 1600 px de large.",
  },
  {
    id: "george-wide",
    timecode: null,
    crop: { aspect: "16:9", focus: [0.5, 0.3] },
    grade: "actualites",
    alt: "George Abitbol, chapeau de cow-boy et étoile de shérif, regarde l'objectif sans sourire.",
    character: "george",
    scene: "Le journal filmé",
    placeholder: { file: "placeholder-stills/george_big.jpg" },
    todo: "Recadrage 16:9 du même plan pour le téléphone (visage au premier écran).",
  },
  {
    id: "george-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.41, 0.4] },
    grade: "temoignage",
    alt: "George Abitbol, casquette de capitaine, fixe quelqu'un hors champ sans ciller.",
    character: "george",
    scene: "Le bateau, au début du flim",
    sourceFilm: { title: "Blood Alley", status: "uncertain" },
    placeholder: { file: "stills-source/george-capitaine.jpg" },
    todo: "Source fan (1000 px, compressée) ; vers 00:00:35 (« V12 au capitaine George Abitbol »), à reprendre du flim.",
  },
  {
    id: "dave-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.4] },
    grade: "temoignage",
    alt: "Dave, au téléphone, l'air de quelqu'un qui tient une piste.",
    character: "dave",
    scene: "La rédaction",
    placeholder: { file: "placeholder-stills/deco_1.jpg", rect: [20, 215, 260, 313] },
    todo: "Plan de Dave ; le placeholder est découpé dans un montage V1 de 374 px.",
  },
  {
    id: "peter-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.4] },
    grade: "temoignage",
    alt: "Peter, prononcé Pétaire, la bouche ouverte sur une question qu'il ne posera pas.",
    character: "peter",
    scene: "La rédaction",
    sourceFilm: { title: "All the President's Men", status: "uncertain" },
    placeholder: { file: "placeholder-stills/deco_2.jpg", rect: [150, 0, 224, 285] },
    todo: "Plan de Peter ; le placeholder est découpé dans un montage V1 retouché à la peinture.",
  },
  {
    id: "steven-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.62, 0.3] },
    grade: "temoignage",
    alt: "Steven, prononcé Stévaine, cravate rayée, les mains sur les hanches au milieu d'une rédaction.",
    character: "steven",
    scene: "La rédaction",
    sourceFilm: { title: "All the President's Men", status: "uncertain" },
    placeholder: { file: "stills-source/steven-card.jpg", rect: [100, 10, 700, 587] },
    todo: "Source fan (1281 px, SD agrandie) ; vers 00:32:25, à reprendre du flim.",
  },
  {
    id: "jose-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.6, 0.4] },
    grade: "temoignage",
    alt: "José, chemise à carreaux, regarde l'enquêteur comme on regarde un plat qui tarde.",
    character: "jose",
    scene: "L'interview de José",
    placeholder: { file: "stills-source/jose-card.jpg", rect: [20, 10, 1240, 587] },
    todo: "Source fan (1281 px, SD agrandie) ; vers 00:35:01, à reprendre du flim.",
  },
  {
    id: "jose-pirate",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.66, 0.4] },
    grade: "temoignage",
    alt: "José, en pirate sur le pont d'un navire, désigne quelque chose d'un doigt impérieux.",
    character: "jose",
    scene: "Sur le bateau, José accueille George",
    sourceFilm: { title: "The Crimson Pirate", status: "uncertain" },
    placeholder: { file: "stills-source/jose-pirate.jpg", rect: [20, 10, 1240, 587] },
    todo: "Source fan (1281 px, SD agrandie) ; vers 00:01:19, à reprendre du flim.",
  },
];

/** Witnesses with no still at all yet: they get a typographic frame. */
export const MISSING_STILLS: { character: CharacterId; todo: string }[] = [
  { character: "dino", todo: "Dino (Dean Martin), 4:5, grade témoignage." },
  { character: "frankie", todo: "Frankie (Frank Sinatra), 4:5, grade témoignage." },
  { character: "patron", todo: "Le patron du journal (Jason Robards), 4:5, grade témoignage." },
  { character: "welles", todo: "Orson Welles, 4:5, grade témoignage." },
];

