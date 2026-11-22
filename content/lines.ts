import { CHARACTERS, type CharacterId } from "./characters";
import { QUOTES } from "./quotes";

/** What the Doublage subtitle can say. */
export type Line =
  | { kind: "quote"; slug: string; text: string }
  /** A bracketed caption for a witness with no verified line. Not a quote. */
  | { kind: "silence"; text: string };

/**
 * Each character's pool: verified quotes whose wording AND speaker are attested.
 * Built from quotes.ts, so a line cannot be spoken by a character the file
 * does not attest. Characters with an empty pool fall back to their silence.
 */
export function poolFor(character: CharacterId): Line[] {
  const quotes = QUOTES.filter(
    (q) => q.speaker === character && q.textStatus === "attested" && q.speakerStatus === "attested",
  ).map((q): Line => ({ kind: "quote", slug: q.slug, text: q.text }));
  return quotes.length > 0 ? quotes : [{ kind: "silence", text: CHARACTERS[character].silence }];
}

export const LINES: Record<CharacterId, Line[]> = Object.fromEntries(
  (Object.keys(CHARACTERS) as CharacterId[]).map((id) => [id, poolFor(id)]),
) as Record<CharacterId, Line[]>;
