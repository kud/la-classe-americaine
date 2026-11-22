import type { CharacterId } from "./characters";
import type { Status } from "./status";

export interface Quote {
  /** URL slug for /repliques/[slug]. */
  slug: string;
  /** Number in the spec's quote bank (§3.4); printed as « PIÈCE N° n ». */
  n: number;
  text: string;
  speaker: CharacterId | null;
  /** Who it is said to, when attested. */
  to?: string;
  /** Scene or circumstance, in the dossier's typewriter voice. */
  scene: string;
  textStatus: Status;
  speakerStatus: Status;
  /** Checked against the film itself. False everywhere until someone watches it with this file open. */
  filmChecked: boolean;
  /** Where the wording comes from. */
  source: string;
  /** A still for /repliques/[slug], when there is one of the moment itself. */
  still?: string;
}

/**
 * Published quotes: ✓ wording only. A quote whose speaker is ◌ is published
 * without attribution (the speaker is kept here for the copy-editing pass,
 * never displayed). The quote guard (lib/quote-guard.test.ts) runs before
 * every build and fails on anything ◌ or banned in this list.
 */
export const QUOTES: Quote[] = [
  {
    slug: "monde-de-merde",
    n: 1,
    text: "Monde de merde.",
    speaker: "george",
    scene: "Ses derniers mots, au large de Pom Pom Galli.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "V1 (2011), synopsis",
  },
  {
    slug: "attention-cyclimse",
    n: 2,
    text: "Attention ! ce flim n'est pas un flim sur le cyclimse. Merci de votre compréhension.",
    speaker: "carton",
    scene: "Le carton d'ouverture, avant la première image.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "V1 (2011), synopsis",
  },
  {
    slug: "l-homme-le-plus-classe-du-monde",
    n: 3,
    text: "L'homme le plus classe du monde.",
    speaker: "recitant",
    scene: "Le journal filmé annonce sa mort.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "V1 (2011), synopsis",
  },
  {
    slug: "le-train-de-tes-injures",
    n: 4,
    text: "Le train de tes injures roule sur le rail de mon indifférence.",
    speaker: "george",
    scene: "Une altercation.",
    textStatus: "attested",
    speakerStatus: "uncertain",
    filmChecked: false,
    source: "V1 (2011), bulles de George",
  },
  {
    slug: "plutot-que-d-etre-sourd",
    n: 5,
    text: "Je préfère partir plutôt que d'entendre ça plutôt que d'être sourd.",
    speaker: "george",
    scene: "Une sortie.",
    textStatus: "attested",
    speakerStatus: "uncertain",
    filmChecked: false,
    source: "V1 (2011), bulles de George",
  },
  {
    slug: "le-roi-de-la-classe",
    n: 7,
    text: "Ah, voilà enfin le roi de la classe !",
    speaker: "jose",
    to: "George",
    scene: "Il accueille George.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Recherches (fiches de citations)",
    still: "jose-pirate",
  },
  {
    slug: "les-menageres",
    n: 8,
    text: "Tu baises les ménagères ? c'est bien, tu dois avoir le cul qui brille !",
    speaker: "george",
    to: "José",
    scene: "À José.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "V1 (2011), bulles de George",
  },
  {
    slug: "les-bonbons",
    n: 9,
    text: "J'ai les bonbons qui collent au papier.",
    speaker: null,
    scene: "Une confidence.",
    textStatus: "attested",
    speakerStatus: "uncertain",
    filmChecked: false,
    source: "V1 (2011), en-tête du site",
  },
  {
    slug: "les-ravioles",
    n: 10,
    text: "Vous savez ce que vous mangez, là ? Madame Felipe, la patronne, se coupe les morceaux de nichon pour en faire des ravioles.",
    speaker: "george",
    scene: "Au restaurant.",
    textStatus: "attested",
    speakerStatus: "uncertain",
    filmChecked: false,
    source: "V1 (2011), bulles de George",
  },
  {
    slug: "les-voleurs",
    n: 19,
    text: "Les voleurs et les fils de pute.",
    speaker: "welles",
    scene: "Sur ce qu'il n'aime pas.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "V1 (2011), synopsis",
  },
];

/** The six slips on the home page (chapter 4), in display order. */
export const HOME_EVIDENCE = [
  "monde-de-merde",
  "le-train-de-tes-injures",
  "le-roi-de-la-classe",
  "plutot-que-d-etre-sourd",
  "les-menageres",
  "les-voleurs",
] as const;

export function quoteBySlug(slug: string): Quote | undefined {
  return QUOTES.find((q) => q.slug === slug);
}

/** A speaker is only shown when attested. */
export function attributedSpeaker(q: Quote): CharacterId | null {
  return q.speaker && q.speakerStatus === "attested" ? q.speaker : null;
}
