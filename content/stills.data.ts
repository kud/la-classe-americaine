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
  /** Source film when known (◌ until checked). */
  sourceFilm?: string;
  /**
   * Placeholder source while there is no film file: one of the repo's old V1
   * stills in assets/placeholder-stills/, with an optional pre-crop rectangle
   * [x, y, w, h] in source pixels (the V1 images are composites).
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
    placeholder: { file: "george_big.jpg" },
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
    placeholder: { file: "george_big.jpg" },
    todo: "Recadrage 16:9 du même plan pour le téléphone (visage au premier écran).",
  },
  {
    id: "george-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.3] },
    grade: "temoignage",
    alt: "George Abitbol, gilet de daim et foulard noué, attend qu'on lui pose la question.",
    character: "george",
    scene: "Les témoins",
    placeholder: { file: "george_big.jpg" },
    todo: "Un autre plan de George que celui du journal filmé.",
  },
  {
    id: "dave-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.4] },
    grade: "temoignage",
    alt: "Dave, au téléphone, l'air de quelqu'un qui tient une piste.",
    character: "dave",
    scene: "La rédaction",
    placeholder: { file: "deco_1.jpg", rect: [20, 215, 260, 313] },
    todo: "Plan de Dave ; le placeholder est découpé dans un montage V1 de 374 px.",
  },
  {
    id: "peter-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.4] },
    grade: "temoignage",
    alt: "Peter, prononcé Pétaire, la bouche ouverte sur une question qu'il ne posera pas.",
    character: "peter",
    scene: "La rédaction",
    sourceFilm: "All the President's Men",
    placeholder: { file: "deco_2.jpg", rect: [150, 0, 224, 285] },
    todo: "Plan de Peter ; le placeholder est découpé dans un montage V1 retouché à la peinture.",
  },
  {
    id: "steven-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.4] },
    grade: "temoignage",
    alt: "Steven, prononcé Stévaine, concentré dans la pénombre d'une rédaction.",
    character: "steven",
    scene: "La rédaction",
    sourceFilm: "All the President's Men",
    placeholder: { file: "deco_2.jpg", rect: [10, 245, 240, 283] },
    todo: "Plan de Steven ; le placeholder est découpé dans un montage V1 retouché à la peinture.",
  },
];

/** Witnesses with no still at all yet: they get a typographic frame. */
export const MISSING_STILLS: { character: CharacterId; todo: string }[] = [
  { character: "jose", todo: "José (Burt Lancaster), 4:5, grade témoignage." },
  { character: "dino", todo: "Dino (Dean Martin), 4:5, grade témoignage." },
  { character: "frankie", todo: "Frankie (Frank Sinatra), 4:5, grade témoignage." },
  { character: "patron", todo: "Le patron du journal (Jason Robards), 4:5, grade témoignage." },
  { character: "welles", todo: "Orson Welles, 4:5, grade témoignage." },
];

