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
  { n: 6, text: "Tu fais un amalgame entre la coquetterie et la classe.", why: "wording ◌" },
  { n: 11, text: "Tes excuses tu peux te les coller au cul, tout comme ton bifteck", why: "V1 only ◌" },
  { n: 12, text: "C'est ça, la puissance intellectuelle", why: "V1 only ◌" },
  { n: 13, text: "Moi ce que je vois, c'est que dans deux secondes je vais te botter le cul.", why: "V1 only ◌" },
  { n: 14, text: "Eh, tu sais à qui tu parles, là ?", why: "V1 only ◌" },
  { n: 15, text: "Tiens regarde ! Les Anglais ont débarqué.", why: "V1 only ◌" },
  { n: 16, text: "dring", why: "gag ✓, wording ◌" },
  { n: 17, text: "envoie son gorille", why: "gag ✓, wording ◌" },
  { n: 18, text: "Pas mal, non ? C'est français.", why: "memed, source ◌" },
  { n: 0, text: "Tu veux te mettre sur le coup mais tu travailleras avec Peter et Steven", why: "memo paraphrase, exact wording ◌" },
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
