import { Hero } from "@/components/home/Hero";
import { Redaction } from "@/components/home/Redaction";
import { Temoins } from "@/components/home/Temoins";
import { Pieces } from "@/components/home/Pieces";
import { Critique } from "@/components/home/Critique";
import { Detournement } from "@/components/home/Detournement";
import { Classee } from "@/components/home/Classee";

/** L'Enquête: one long page in eight chapters (§3). The site. */
export default function Home() {
  return (
    <main id="contenu">
      <Hero />
      <Redaction />
      <Temoins />
      <Pieces />
      <Critique />
      <Detournement />
      <Classee />
    </main>
  );
}
