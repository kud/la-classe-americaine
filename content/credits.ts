import type { Status } from "./status";

export interface Credit {
  role: string;
  names: string[];
  status: Status;
  filmChecked: boolean;
}

/** Fiche technique (§10). Only attested credits are published; the guard enforces it. */
export const CREDITS: Credit[] = [
  { role: "Un flim de", names: ["Michel Hazanavicius", "Dominique Mézerette"], status: "attested", filmChecked: false },
  { role: "Scénario", names: ["Michel Hazanavicius", "Dominique Mézerette"], status: "attested", filmChecked: false },
  { role: "Montage", names: ["Jean-Michel Kuess", "Guy Rondi"], status: "attested", filmChecked: false },
  { role: "Musique", names: ["Laurent Petitgirard"], status: "attested", filmChecked: false },
  { role: "Production", names: ["Ève Vercel", "Robert Nador", "Michel Lecourt"], status: "attested", filmChecked: false },
  { role: "Sociétés de production", names: ["Dune", "Canal+"], status: "attested", filmChecked: false },
  { role: "Première diffusion", names: ["Canal+, 31 décembre 1993, 20 h 35"], status: "attested", filmChecked: false },
  { role: "Rediffusion", names: ["Festival, 2004"], status: "attested", filmChecked: false },
  { role: "Projection", names: ["Centre Pompidou, 11 avril 2009"], status: "attested", filmChecked: false },
  { role: "Durée", names: ["70 min"], status: "attested", filmChecked: false },
];

export interface VoiceCredit {
  name: string;
  roles: string[];
  status: Status;
  filmChecked: boolean;
}

/** Les voix, from the fans' script (cyclim.se) and French Wikipedia; only attested ones are printed. */
export const VOICES: VoiceCredit[] = [
  { name: "Raymond Loyer", roles: ["George Abitbol", "l'avertissement"], status: "attested", filmChecked: false },
  { name: "Jean-Claude Montalban", roles: ["Peter"], status: "attested", filmChecked: false },
  { name: "Patrick Guillemin", roles: ["Steven", "Dave"], status: "attested", filmChecked: false },
  { name: "Marc Cassot", roles: ["José", "le patron du journal", "Orson Welles", "Jacques", "Yves", "Ernest"], status: "attested", filmChecked: false },
  { name: "Joël Martineau", roles: ["Dino"], status: "attested", filmChecked: false },
  { name: "Roger Rudel", roles: ["Frankie", "Hugues"], status: "attested", filmChecked: false },
  { name: "Christine Delaroche", roles: ["Isabelle"], status: "attested", filmChecked: false },
  { name: "Évelyne Grandjean", roles: ["Jacqueline"], status: "attested", filmChecked: false },
  { name: "Alain Chabat", roles: ["Gorge profonde"], status: "attested", filmChecked: false },
  { name: "Jean-Éric Bielle", roles: ["Julien Lepers"], status: "attested", filmChecked: false },
  { name: "Gérard Rouzier", roles: ["l'ami de Dino"], status: "attested", filmChecked: false },
  { name: "Jean-Yves Lafesse", roles: [], status: "uncertain", filmChecked: false },
  { name: "Marc François", roles: [], status: "uncertain", filmChecked: false },
  { name: "Lionel Abelanski", roles: [], status: "uncertain", filmChecked: false },
  { name: "Dominique Farrugia", roles: [], status: "uncertain", filmChecked: false },
  { name: "Michel Hazanavicius", roles: [], status: "uncertain", filmChecked: false },
  { name: "Serge Hazanavicius", roles: [], status: "uncertain", filmChecked: false },
];

export const ON_SCREEN: { names: string[]; status: Status } = {
  names: [
    "John Wayne",
    "Paul Newman",
    "Dustin Hoffman",
    "Robert Redford",
    "Burt Lancaster",
    "Dean Martin",
    "Frank Sinatra",
    "Jason Robards",
    "Orson Welles",
  ],
  status: "attested",
};

export const publishedCredits = () => CREDITS.filter((c) => c.status === "attested");
export const publishedVoices = () => VOICES.filter((v) => v.status === "attested");
