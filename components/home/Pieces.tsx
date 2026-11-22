import Link from "next/link";
import { HOME_EVIDENCE, quoteBySlug } from "@/content/quotes";
import { toSlip } from "@/lib/present";
import { Chapter } from "../Chapter";
import { EvidenceSlip } from "../EvidenceSlip";
import styles from "./home.module.css";

/** 4 · Pièces à conviction: six numbered slips. */
export function Pieces() {
  const slips = HOME_EVIDENCE.map((slug) => toSlip(quoteBySlug(slug)!));
  return (
    <Chapter id="pieces" room="paper" labelledBy="pieces-titre" cue className={styles.chapter}>
      <div className="wrap">
        <p className="kicker">Chapitre 4 · Pièces à conviction</p>
        <h2 id="pieces-titre" className={styles.h2}>
          Ce qu&apos;ils ont dit. Mot pour mot.
        </h2>
        <ol className={styles.slips}>
          {slips.map((q) => (
            <li key={q.slug}>
              <EvidenceSlip quote={q} />
            </li>
          ))}
        </ol>
        <p className={styles.more}>
          <Link href="/repliques">Toutes les pièces →</Link>
        </p>
      </div>
    </Chapter>
  );
}
