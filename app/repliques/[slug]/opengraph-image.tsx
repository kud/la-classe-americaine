import { ImageResponse } from "next/og";
import { QUOTES, quoteBySlug, attributedSpeaker } from "@/content/quotes";
import { CHARACTERS } from "@/content/characters";
import { still } from "@/content/stills";
import { OG_SIZE, OgCard, ogFonts, stillDataUrl } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Une réplique de La Classe Américaine, en grand.";

export function generateStaticParams() {
  return QUOTES.map((q) => ({ slug: q.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const q = quoteBySlug(slug)!;
  const speaker = attributedSpeaker(q);
  // the character's still in the « actualités » grade; only George has one so far
  const image = speaker === "george" ? await stillDataUrl(still("george-hero").src, 380) : null;
  return new ImageResponse(<OgCard quote={q.text} who={speaker ? CHARACTERS[speaker].name : null} image={image} />, {
    ...size,
    fonts: await ogFonts(),
  });
}
