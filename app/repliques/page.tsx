import type { Metadata } from "next";
import { QUOTES, attributedSpeaker } from "@/content/quotes";
import { CHARACTERS } from "@/content/characters";
import { toSlip } from "@/lib/present";
import { PageHeader } from "@/components/PageHeader";
import { QuoteBank } from "./QuoteBank";

export const metadata: Metadata = {
  title: "Les répliques",
  description: "Toutes les pièces à conviction : les répliques de La Classe Américaine, vérifiées, à copier et à partager.",
};

export default function Repliques() {
  const slips = [...QUOTES].sort((a, b) => a.n - b.n).map((q) => ({ ...toSlip(q), who: attributedSpeaker(q) ?? "inconnu" }));
  const speakers = Array.from(new Set(slips.map((s) => s.who)));
  const filters = speakers.map((id) => ({ id, label: id === "inconnu" ? "Non attribuées" : CHARACTERS[id as keyof typeof CHARACTERS].name }));
  return (
    <main id="contenu">
      <PageHeader kicker="Le dossier · Pièces à conviction" title="Les répliques." id="repliques-titre">
        <p style={{ color: "var(--silver-dim)" }}>
          Seules les répliques attestées figurent ici. Quand on ne sait pas encore qui parle, la pièce le dit.
        </p>
      </PageHeader>
      <section className="paper" aria-labelledby="repliques-titre" style={{ paddingBlock: "56px 96px" }}>
        <div className="wrap">
          <QuoteBank slips={slips} filters={filters} />
        </div>
      </section>
    </main>
  );
}
