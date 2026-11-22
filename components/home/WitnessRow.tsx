"use client";

import { useRef } from "react";
import type { CharacterId } from "@/content/characters";
import type { Still as StillData } from "@/content/stills";
import { Still, MissingStill } from "../Still";
import { useStage } from "../stage/StageProvider";
import styles from "./home.module.css";

export interface WitnessCard {
  id: CharacterId;
  name: string;
  actor: string | null;
  voice: string | null;
  note: string;
  still: StillData | null;
}

/**
 * The witness row: horizontal with scroll-snap and visible buttons on desktop,
 * a vertical stack on phones. Hover 600 ms, keyboard focus, tap or Enter makes
 * the witness speak.
 */
export function WitnessRow({ cards }: { cards: WitnessCard[] }) {
  const { request } = useStage();
  const scroller = useRef<HTMLUListElement>(null);
  const hover = useRef<number | null>(null);

  const speak = (id: CharacterId) => request({ kind: "witness", character: id });
  const scrollBy = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    const card = el.querySelector("li");
    el.scrollBy({ left: dir * ((card?.clientWidth ?? 240) + 20) * 2, behavior: "smooth" });
  };

  return (
    <div className={styles.witnesses}>
      <div className={styles.rowNav}>
        <button type="button" onClick={() => scrollBy(-1)} aria-label="Témoins précédents">
          ←
        </button>
        <button type="button" onClick={() => scrollBy(1)} aria-label="Témoins suivants">
          →
        </button>
      </div>
      <ul ref={scroller} className={styles.row} aria-label="Les témoins">
        {cards.map((c) => (
          <li key={c.id}>
            <button
              type="button"
              className={styles.witness}
              data-testid={`witness-${c.id}`}
              onClick={() => speak(c.id)}
              onFocus={(e) => e.currentTarget.matches(":focus-visible") && speak(c.id)}
              onPointerEnter={(e) => {
                if (e.pointerType !== "mouse") return;
                hover.current = window.setTimeout(() => speak(c.id), 600);
              }}
              onPointerLeave={() => hover.current && window.clearTimeout(hover.current)}
            >
              {c.still ? (
                <Still still={c.still} sizes="(min-width: 760px) 240px, 96px" variant="frame" decorative className={styles.witnessStill} />
              ) : (
                <MissingStill name={c.name} className={styles.witnessStill} />
              )}
              <span className={styles.witnessText}>
                <span className={styles.witnessName}>{c.name}</span>
                <span className={styles.witnessMeta}>
                  {c.actor && <>joué par {c.actor}</>}
                  {c.voice && (
                    <>
                      <br />
                      doublé par {c.voice}
                    </>
                  )}
                </span>
                <span className={styles.witnessNote}>{c.note}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
