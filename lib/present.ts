import { CHARACTERS } from "@/content/characters";
import { attributedSpeaker, type Quote } from "@/content/quotes";

/** A quote as an evidence slip shows it: the speaker only when attested. */
export function toSlip(q: Quote) {
  const speaker = attributedSpeaker(q);
  return {
    slug: q.slug,
    n: q.n,
    text: q.text,
    speaker: speaker ? CHARACTERS[speaker].name : null,
    scene: q.scene,
  };
}
