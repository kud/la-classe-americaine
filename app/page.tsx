import { Hero } from "@/components/home/Hero";
import { Redaction } from "@/components/home/Redaction";
import { Temoins } from "@/components/home/Temoins";
import { Pieces } from "@/components/home/Pieces";
import { Critique } from "@/components/home/Critique";
import { Detournement } from "@/components/home/Detournement";
import { Classee } from "@/components/home/Classee";
import { Murmurs } from "@/components/home/Murmurs";
import { QUOTES } from "@/content/quotes";

/** L'Enquête: one long page in eight chapters (§3). The site. */
export default function Home() {
  // background voices: verified lines whose speaker is not attested
  const murmurs = QUOTES.filter((q) => q.speakerStatus !== "attested").map((q) => q.text);
  return (
    <main id="contenu" data-snap>
      <Hero />
      <Redaction />
      <Temoins />
      <Pieces />
      <Critique />
      <Detournement />
      <Classee />
      <Murmurs lines={murmurs} />
    </main>
  );
}
