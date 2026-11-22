"use client";

import { useState } from "react";
import { EvidenceSlip, type SlipQuote } from "@/components/EvidenceSlip";
import styles from "./repliques.module.css";

/** Every quote, filterable by character. */
export function QuoteBank({ slips, filters }: { slips: (SlipQuote & { who: string })[]; filters: { id: string; label: string }[] }) {
  const [who, setWho] = useState<string | null>(null);
  const shown = who ? slips.filter((s) => s.who === who) : slips;
  return (
    <>
      <div className={styles.filters} role="group" aria-label="Filtrer par personnage">
        <button type="button" aria-pressed={who === null} onClick={() => setWho(null)}>
          Toutes
        </button>
        {filters.map((f) => (
          <button key={f.id} type="button" aria-pressed={who === f.id} onClick={() => setWho(f.id)}>
            {f.label}
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">
        {shown.length} pièce{shown.length > 1 ? "s" : ""}
      </p>
      <ol className={styles.list}>
        {shown.map((q) => (
          <li key={q.slug}>
            <EvidenceSlip quote={q} headingLevel={2} />
          </li>
        ))}
      </ol>
    </>
  );
}
