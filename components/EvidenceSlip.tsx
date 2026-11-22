"use client";

import { useState } from "react";
import Link from "next/link";
import { m, useAnimationControls } from "motion/react";
import { useReducedMotion } from "./hooks";
import { useSound } from "./sound/SoundProvider";
import { InkStamp } from "./InkStamp";
import styles from "./EvidenceSlip.module.css";

export interface SlipQuote {
  slug: string;
  n: number;
  text: string;
  /** Null when the attribution is not attested. */
  speaker: string | null;
  scene: string;
}

/** The line as it travels: the quote, who said it when attested, the film. */
export function citation(q: SlipQuote): string {
  return `« ${q.text} »${q.speaker ? ` — ${q.speaker}` : ""}, La Classe Américaine (1993)`;
}

/**
 * Pièce à conviction: a numbered evidence slip clipped into the file. « Copier »
 * and « Partager » (Web Share API, falling back to copying the quote's URL).
 * On copy, a red « COPIÉ » stamp lands on the slip (I-6).
 */
export function EvidenceSlip({ quote, link = true, headingLevel = 3 }: { quote: SlipQuote; link?: boolean; headingLevel?: 2 | 3 }) {
  const reduced = useReducedMotion();
  const { thud } = useSound();
  const [stamps, setStamps] = useState(0);
  const [status, setStatus] = useState("");
  const slip = useAnimationControls();
  const url = () => `${window.location.origin}/repliques/${quote.slug}`;
  const H = `h${headingLevel}` as "h2" | "h3";

  const stamp = (message: string) => {
    setStamps((s) => s + 1);
    setStatus(message);
    thud();
    try {
      navigator.vibrate?.(10);
    } catch {
      /* no haptics */
    }
    if (!reduced) void slip.start({ x: [0, -1, 1, 0], transition: { duration: 0.18 } });
  };

  const copy = async (text: string, message: string) => {
    try {
      await navigator.clipboard.writeText(text);
      stamp(message);
    } catch {
      setStatus("La copie a échoué ; sélectionnez le texte à la main.");
    }
  };

  const share = async () => {
    const data = { title: "La Classe Américaine", text: citation(quote), url: url() };
    if (typeof navigator.share === "function") {
      try {
        await navigator.share(data);
        setStatus("Partagé.");
      } catch {
        /* cancelled */
      }
      return;
    }
    await copy(data.url, "Lien copié.");
  };

  return (
    <m.article className={styles.slip} animate={slip} data-testid={`slip-${quote.slug}`} aria-labelledby={`piece-${quote.slug}`}>
      <p className={styles.n} id={`piece-${quote.slug}`}>
        PIÈCE N° {quote.n}
      </p>
      <H className={styles.line}>
        <q>{quote.text}</q>
      </H>
      <p className={styles.who}>
        {quote.speaker ?? "Témoin : non identifié"} · {quote.scene}
      </p>
      <div className={styles.actions}>
        <button type="button" onClick={() => copy(citation(quote), "Réplique copiée.")}>
          Copier
        </button>
        <button type="button" onClick={share}>
          Partager
        </button>
        {link && (
          <Link href={`/repliques/${quote.slug}`} className={styles.open}>
            Voir la pièce<span className="sr-only"> n° {quote.n}</span>
          </Link>
        )}
      </div>
      {stamps > 0 && (
        <span className={styles.stampSlot} aria-hidden="true">
          <InkStamp key={stamps} className={styles.stamp} rotate={-8} duration={0.18} testId="stamp-copie">
            COPIÉ
          </InkStamp>
        </span>
      )}
      <span className="sr-only" role="status">
        {status}
      </span>
    </m.article>
  );
}
