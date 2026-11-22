import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { QUOTES, quoteBySlug, attributedSpeaker } from "@/content/quotes";
import { CHARACTERS } from "@/content/characters";
import { cardStill, still } from "@/content/stills";
import { toSlip } from "@/lib/present";
import { PageHeader } from "@/components/PageHeader";
import { EvidenceSlip } from "@/components/EvidenceSlip";
import { Still } from "@/components/Still";
import styles from "../repliques.module.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return QUOTES.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({ params }: PageProps<"/repliques/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const q = quoteBySlug(slug);
  if (!q) return {};
  const speaker = attributedSpeaker(q);
  const who = speaker ? CHARACTERS[speaker].name : null;
  return {
    title: `« ${q.text} »`,
    description: `${who ? `${who}, ` : ""}La Classe Américaine — Le Grand Détournement (1993). Pièce n° ${q.n}.`,
    openGraph: { title: `« ${q.text} »`, type: "article" },
  };
}

export default async function Replique({ params }: PageProps<"/repliques/[slug]">) {
  const { slug } = await params;
  const q = quoteBySlug(slug);
  if (!q) notFound();
  const speaker = attributedSpeaker(q);
  const who = speaker ? CHARACTERS[speaker] : null;
  const image = q.still ? still(q.still) : speaker === "george" ? still("george-hero") : speaker ? cardStill(speaker) : null;
  return (
    <main id="contenu">
      <PageHeader kicker={`Pièce à conviction n° ${q.n}`} title={<span className="sr-only">Pièce n° {q.n}</span>} id="piece-titre">
        <div className={styles.single}>
          <div>
            <blockquote className={styles.bigQuote}>{q.text}</blockquote>
            <p className={styles.meta}>
              {who ? who.name : "Témoin : non identifié"}
              {who?.actor && who.actor !== "lui-même" ? ` (${who.actor})` : ""} · {q.scene}
            </p>
          </div>
          {image && <Still still={image} sizes="(min-width: 760px) 360px, 80vw" className={styles.still} />}
        </div>
      </PageHeader>
      <section className="paper" aria-label="Copier ou partager" style={{ paddingBlock: "48px 96px" }}>
        <div className="wrap" style={{ maxWidth: 640, marginInline: "auto" }}>
          <EvidenceSlip quote={toSlip(q)} link={false} headingLevel={2} />
          <Link href="/repliques" className={styles.back}>
            ← Toutes les pièces
          </Link>
        </div>
      </section>
    </main>
  );
}
