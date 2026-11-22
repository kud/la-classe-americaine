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
 * Published quotes: ✓ wording only. Wording and speakers were checked on
 * 2026-11-22 against the fans' speaker-labelled script (cyclim.se), a fan
 * transcription of the French subtitles and French Wikipedia; where they
 * differ, the script wins. None of it is the film itself, so `filmChecked`
 * stays false.
 * A quote whose speaker is ◌ is published
 * without attribution (the speaker is kept here for the copy-editing pass,
 * never displayed). The quote guard (lib/quote-guard.test.ts) runs before
 * every build and fails on anything ◌ or banned in this list.
 */
export const QUOTES: Quote[] = [
  {
    slug: "monde-de-merde",
    n: 1,
    text: "Ah, monde de merde !",
    speaker: "george",
    scene: "Ses derniers mots, au large de Pom Pom Galli.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; V1 (2011) ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "attention-cyclimse",
    n: 2,
    text: "Attention ! ce flim n'est pas un flim sur le cyclimse. Merci de votre compréhension.",
    speaker: "carton",
    scene: "L'avertissement d'ouverture, lu en voix off.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "V1 (2011), synopsis ; carton, absent des sous-titres ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "l-homme-le-plus-classe-du-monde",
    n: 3,
    text: "…l'homme le plus classe du monde depuis plus de 15 ans.",
    speaker: "recitant",
    scene: "Le bulletin radio que Dave écoute en voiture.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "le-train-de-tes-injures",
    n: 4,
    text: "Le train de tes injures roule sur le rail de mon indifférence.",
    speaker: "george",
    scene: "Une altercation.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; V1 (2011) ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "plutot-que-d-etre-sourd",
    n: 5,
    text: "Je préfère partir plutôt que d'entendre ça plutôt que d'être sourd.",
    speaker: "george",
    scene: "Une sortie.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; V1 (2011) ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "la-coquetterie-et-la-classe",
    n: 6,
    text: "Tu fais un amalgame entre la coquetterie et la classe.",
    speaker: "george",
    to: "José",
    scene: "À José.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "trop-bien-sape",
    n: 7,
    text: "…L'homme trop bien sapé, Abitbol !",
    speaker: "jose",
    to: "George",
    scene: "Il accueille George.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
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
    source: "V1 (2011), bulles de George ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "les-bonbons",
    n: 9,
    text: "J'ai les bonbons qui collent au papier.",
    speaker: "george",
    scene: "Une confidence.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; V1 (2011) ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "les-ravioles",
    n: 10,
    text: "Mêle-toi de tes affaires. La patronne, Mme Felipe, se coupe les nichons pour en faire des ravioles.",
    speaker: "george",
    scene: "Au restaurant.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "ton-bifteck",
    n: 11,
    text: "…tes excuses tu peux te les coller au cul, tout comme ton bifteck…",
    speaker: "george",
    scene: "Des excuses refusées.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "la-puissance-intellectuelle",
    n: 12,
    text: "C'est ça, la puissance intellectuelle. Bac + 2, les enfants.",
    speaker: "george",
    scene: "Un constat.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "dans-deux-secondes",
    n: 13,
    text: "Ce que je vois, c'est que je vais te botter le cul dans deux secondes.",
    speaker: "george",
    scene: "Une mise en garde.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "a-qui-tu-parles",
    n: 14,
    text: "Eh, tu sais à qui tu parles, là ?",
    speaker: "george",
    scene: "Une question d'usage.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; V1 (2011) ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "les-anglais-ont-debarque",
    n: 15,
    text: "Les Anglais ont débarqué. On va être obligés de passer par derrière…",
    speaker: "george",
    scene: "Un plan d'évasion.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "l-effet-special-de-la-sonnette",
    n: 16,
    text: "L'effet spéciau de la sonnette : dring dring !",
    speaker: "peter",
    scene: "À la porte.",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
  {
    slug: "c-est-francais",
    n: 18,
    text: "Pas mal, non ? C'est français.",
    speaker: "welles",
    scene: "Juste après « C'est moi, Orson Welles. »",
    textStatus: "attested",
    speakerStatus: "attested",
    filmChecked: false,
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; Script annoté des fans (cyclim.se) ; Wikipédia",
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
    source: "Transcription des sous-titres français (fans), 2026-11-22 ; V1 (2011), synopsis ; Script annoté des fans (cyclim.se) ; Wikipédia",
  },
];

/** The six slips on the home page (chapter 4), in display order. */
export const HOME_EVIDENCE = [
  "monde-de-merde",
  "le-train-de-tes-injures",
  "trop-bien-sape",
  "la-coquetterie-et-la-classe",
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
