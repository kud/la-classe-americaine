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
    scene: "Portrait",
    placeholder: { file: "placeholder-stills/george_big.jpg" },
    todo: "Plan rapproché de George pour l’ouverture du site (Les Actualités), source ≥ 1600 px de large.",
  },
  {
    id: "george-wide",
    timecode: null,
    crop: { aspect: "16:9", focus: [0.5, 0.3] },
    grade: "actualites",
    alt: "George Abitbol, chapeau de cow-boy et étoile de shérif, regarde l'objectif sans sourire.",
    character: "george",
    scene: "Portrait",
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
    scene: "Sur la passerelle, au début du flim",
    sourceFilm: { title: "The Sea Chase", status: "attested" },
    placeholder: { file: "stills-source/george-capitaine.jpg" },
    todo: "Source fan (1000 px, compressée) ; vers 00:00:35 (« V12 au capitaine George Abitbol »), à reprendre du flim.",
  },
  {
    id: "dave-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.4] },
    grade: "temoignage",
    alt: "Dave, au téléphone mural, l'air de quelqu'un qui tient une piste.",
    character: "dave",
    scene: "La rédaction",
    sourceFilm: { title: "Harper", status: "uncertain" },
    placeholder: { file: "stills-source/dave-card.jpg" },
    todo: "Vignette YouTube (640 px) ; source probable Harper ◌. À reprendre du flim.",
  },
  {
    id: "peter-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.26, 0.45] },
    grade: "temoignage",
    alt: "Peter, moustache et chemise ouverte, regarde ailleurs comme on écoute aux portes.",
    character: "peter",
    scene: "La rédaction",
    placeholder: { file: "stills-source/peter-card.jpg" },
    todo: "Vignette YouTube (480 px), taille vignette seulement. À reprendre du flim.",
  },
  {
    id: "steven-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.3, 0.4] },
    grade: "temoignage",
    alt: "Steven, gros plan, l'air de quelqu'un à qui l'on vient de raccrocher au nez.",
    character: "steven",
    scene: "La rédaction",
    sourceFilm: { title: "All the President's Men", status: "uncertain" },
    placeholder: { file: "stills-source/steven-closeup.jpg" },
    todo: "Vignette YouTube (1276 px) ; source probable All the President's Men ◌. À reprendre du flim.",
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
    sourceFilm: { title: "The Crimson Pirate", status: "attested" },
    placeholder: { file: "stills-source/jose-pirate.jpg", rect: [20, 10, 1240, 587] },
    todo: "Source fan (1281 px, SD agrandie) ; vers 00:01:19, à reprendre du flim.",
  },

  {
    id: "dino-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.66, 0.4] },
    grade: "temoignage",
    alt: "Dino, costume gris et cravate rouge, explique quelque chose à quelqu'un de dos.",
    character: "dino",
    scene: "Les témoins",
    sourceFilm: { title: "4 for Texas", status: "uncertain" },
    placeholder: { file: "stills-source/dino-card.jpg" },
    todo: "Vignette YouTube (640 px) ; source probable 4 for Texas ◌.",
  },
  {
    id: "frankie-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.52, 0.4] },
    grade: "temoignage",
    alt: "Frankie, gilet à fleurs, baisse les yeux sur ce qu'il tient.",
    character: "frankie",
    scene: "Les témoins",
    sourceFilm: { title: "4 for Texas", status: "uncertain" },
    placeholder: { file: "stills-source/frankie-card.jpg" },
    todo: "Vignette YouTube (632 px), vers 0:24:26 ◌ ; source probable 4 for Texas ◌.",
  },
  {
    id: "welles-card",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.67, 0.4] },
    grade: "temoignage",
    alt: "Orson Welles, manteau noir, devant un château et ses jardins à la française.",
    character: "welles",
    scene: "Chez lui : « Pas mal, non ? C'est français. »",
    sourceFilm: { title: "Start the Revolution Without Me", status: "attested" },
    placeholder: { file: "stills-source/welles.jpg" },
    todo: "Vignette YouTube (1280 px), 0:06:11 ; Start the Revolution Without Me (1970), Vaux-le-Vicomte.",
  },
  {
    id: "george-cowboy",
    timecode: null,
    crop: { aspect: "4:5", focus: [0.5, 0.4] },
    grade: "temoignage",
    alt: "George Abitbol, chapeau, gilet et foulard rouge, sourit à peine.",
    character: "george",
    scene: "Au Texas",
    placeholder: { file: "stills-source/george-cowboy.jpg" },
    todo: "Vignette YouTube (640 px), taille vignette seulement.",
  },
  {
    id: "george-sleeping",
    timecode: null,
    crop: { aspect: "16:9", focus: [0.5, 0.5] },
    grade: "temoignage",
    alt: "George Abitbol dort, le chapeau sur le visage.",
    character: "george",
    scene: "Entracte",
    placeholder: { file: "stills-source/george-sleeping.jpg" },
    todo: "Vignette YouTube (1280 px) ◌.",
  },
  {
    id: "redaction-sofa",
    timecode: null,
    crop: { aspect: "16:9", focus: [0.5, 0.5] },
    grade: "temoignage",
    alt: "Peter et Steven, assis sur le canapé de la rédaction, attendent qu'on leur confie l'affaire.",
    character: "peter",
    scene: "La rédaction",
    sourceFilm: { title: "All the President's Men", status: "uncertain" },
    placeholder: { file: "stills-source/peter-steven.jpg" },
    todo: "Vignette YouTube (958 px) ; source probable All the President's Men ◌.",
  },
];

/** Witnesses with no still at all yet: they get a typographic frame. */
export const MISSING_STILLS: { character: CharacterId; todo: string }[] = [
  { character: "patron", todo: "Le patron du journal (Jason Robards), 4:5, grade témoignage." },
];

