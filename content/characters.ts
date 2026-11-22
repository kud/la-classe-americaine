import type { Status } from "./status";

export type CharacterId =
  | "george"
  | "dave"
  | "peter"
  | "steven"
  | "jose"
  | "dino"
  | "frankie"
  | "patron"
  | "welles"
  | "recitant"
  | "carton";

export interface Voice {
  name: string;
  status: Status;
}

export interface Character {
  id: CharacterId;
  /** Spelling: « George Abitbol », as in V1 and the French Wikipedia (◌ check the end credits). */
  name: string;
  /** The original actor in the Warner footage. */
  actor?: string;
  voice?: Voice;
  /** The witness card's deadpan file note. */
  note?: string;
  /** Pronunciation, from the film's own insistence (I-11). */
  pronunciation?: { said: string; not: string };
  /** Shown on the witness row (chapter 3). Order follows the spec table, ◌ to be re-ordered from the film. */
  witness: boolean;
  /**
   * What the subtitle shows when this character has no verified line yet:
   * a bracketed caption, as subtitles do for silence. Never a quote.
   */
  silence: string;
}

export const CHARACTERS: Record<CharacterId, Character> = {
  george: {
    id: "george",
    name: "George Abitbol",
    actor: "John Wayne",
    voice: { name: "Raymond Loyer", status: "attested" },
    note: "L'homme le plus classe du monde. Décédé.",
    witness: true,
    silence: "[Silence. Il n'a plus rien à ajouter.]",
  },
  dave: {
    id: "dave",
    name: "Dave",
    actor: "Paul Newman",
    voice: { name: "Patrick Guillemin", status: "uncertain" },
    note: "Journaliste. Ne lâche jamais une piste, même mauvaise.",
    witness: true,
    silence: "[Dave prend des notes.]",
  },
  peter: {
    id: "peter",
    name: "Peter",
    actor: "Dustin Hoffman",
    note: "Prononcé Pétaire.",
    pronunciation: { said: "Pétaire", not: "Piteur" },
    witness: true,
    silence: "[Peter, prononcé « Pétaire », ne dit rien.]",
  },
  steven: {
    id: "steven",
    name: "Steven",
    actor: "Robert Redford",
    voice: { name: "Patrick Guillemin", status: "uncertain" },
    note: "Prononcé Stévaine.",
    pronunciation: { said: "Stévaine", not: "Stiveun" },
    witness: true,
    silence: "[Steven, prononcé « Stévaine », ne dit rien.]",
  },
  jose: {
    id: "jose",
    name: "José",
    actor: "Burt Lancaster",
    voice: { name: "Marc Cassot", status: "attested" },
    note: "Ami de George. Coquet. Gastronome.",
    witness: true,
    silence: "[José ajuste sa cravate.]",
  },
  dino: {
    id: "dino",
    name: "Dino",
    actor: "Dean Martin",
    voice: { name: "Joël Martineau", status: "attested" },
    note: "Cow-boy. Ami intime de George.",
    witness: true,
    silence: "[Dino ne témoigne pas sans son avocat.]",
  },
  frankie: {
    id: "frankie",
    name: "Frankie",
    actor: "Frank Sinatra",
    note: "A connu George. Préfère ne pas en parler.",
    witness: true,
    silence: "[Le témoin préfère ne pas en parler.]",
  },
  patron: {
    id: "patron",
    name: "Le patron du journal",
    actor: "Jason Robards",
    voice: { name: "Marc Cassot", status: "attested" },
    note: "Veut savoir.",
    witness: true,
    silence: "[Le patron veut savoir.]",
  },
  welles: {
    id: "welles",
    name: "Orson Welles",
    actor: "lui-même",
    voice: { name: "Marc Cassot", status: "attested" },
    note: "N'aime pas les voleurs et les fils de pute.",
    witness: true,
    silence: "[Orson Welles toise l'objectif.]",
  },
  recitant: {
    id: "recitant",
    name: "Le journal filmé",
    witness: false,
    silence: "[Musique d'actualités.]",
  },
  carton: {
    id: "carton",
    name: "Le carton d'ouverture",
    witness: false,
    silence: "[Carton noir.]",
  },
};

export const WITNESSES: Character[] = Object.values(CHARACTERS).filter((c) => c.witness);

/** The voice is only printed when it is attested. */
export function publishedVoice(c: Character): string | null {
  return c.voice && c.voice.status === "attested" ? c.voice.name : null;
}
