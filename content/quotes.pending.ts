/**
 * ◌ PENDING — NEVER PUBLISHED.
 *
 * Lines from the spec's quote bank whose wording is uncertain or comes only from
 * V1 without a second source. They wait here for a check against the film.
 * Nothing under app/ or components/ may import this file; the quote guard fails
 * the build if one does, or if any of these lines appears in published content.
 *
 * To publish one: check it against the film, move it to quotes.ts with
 * textStatus "attested" (and filmChecked: true), and delete it here.
 */
export const PENDING_QUOTES: { n: number; text: string; why: string }[] = [
  { n: 17, text: "envoie son gorille", why: "gag ✓, exact wording not transcribed" },
  // superseded wordings, kept so the guard catches them if they creep back
  { n: 6, text: "Tu fais un amalgame entre la coquetterie et la classe.", why: "corrected by the transcription" },
  { n: 7, text: "Ah, voilà enfin le roi de la classe !", why: "corrected by the transcription" },
  { n: 10, text: "se coupe les morceaux de nichon", why: "corrected by the transcription" },
  { n: 11, text: "Tes excuses tu peux te les coller au cul", why: "corrected by the transcription" },
  { n: 13, text: "Moi ce que je vois, c'est que dans deux secondes", why: "corrected by the transcription" },
  { n: 15, text: "On va être obligé de passer par derrière", why: "corrected by the transcription" },
  { n: 0, text: "Tu veux te mettre sur le coup mais tu travailleras avec Peter et Steven", why: "corrected: « Je vais te mettre sur le dossier Abitbol avec Peter et Steven. »" },
];

/**
 * BANNED: invented by V2 or borrowed from other films (OSS 117).
 * The guard fails the build if any of these appears anywhere in content or source.
 */
export const BANNED_LINES: string[] = [
  "Stun, stun, stun",
  "Nous étions des dieux",
  "Vengeance !",
  "Tu veux ma photo",
  "J'aurais dû être écrivain",
  "C'est moi le plus classe",
  "Comment qu'on dit déjà",
  // OSS 117, the same director's later films
  "J'aime me beurrer la biscotte",
  "Une dictature c'est quand les gens sont communistes",
];
