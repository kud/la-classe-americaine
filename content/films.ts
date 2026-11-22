import type { Status } from "./status";

export interface SourceFilm {
  title: string;
  /** French release title, only where attested. */
  frenchTitle?: string;
  year: number;
  status: Status;
}

/**
 * Source films confirmed in the research sources (§3.6). Years are the films'
 * release years. The complete list (about fifty films, 1952–1980) waits for the
 * French Wikipedia reference list, unreachable during research.
 */
export const SOURCE_FILMS: SourceFilm[] = [
  { title: "The Crimson Pirate", year: 1952, status: "attested" },
  { title: "Blood Alley", year: 1955, status: "attested" },
  { title: "Band of Angels", year: 1957, status: "attested" },
  { title: "Rio Bravo", year: 1959, status: "attested" },
  { title: "Bullitt", year: 1968, status: "attested" },
  { title: "Chisum", year: 1970, status: "attested" },
  { title: "The Cheyenne Social Club", year: 1970, status: "attested" },
  { title: "The Candidate", year: 1972, status: "attested" },
  { title: "The Cowboys", year: 1972, status: "attested" },
  { title: "All the President's Men", frenchTitle: "Les Hommes du président", year: 1976, status: "attested" },
  { title: "When Time Ran Out", year: 1980, status: "attested" },
];

/**
 * V1's two bonus videos (Dailymotion). The spec ships them only if alive at build
 * time. Not reachable from the build session on 2026-11-22, so they stay out;
 * `npm run check:links` re-checks them and prints what to flip.
 */
export const BONUS_LINKS: { label: string; url: string; alive: boolean }[] = [
  {
    label: "Le documentaire : les réalisateurs racontent le Grand Détournement",
    url: "https://www.dailymotion.com/video/x8zvay",
    alive: false,
  },
  {
    label: "Derrick contre Superman, le détournement précédent des auteurs",
    url: "https://www.dailymotion.com/video/x14u5j",
    alive: false,
  },
];
