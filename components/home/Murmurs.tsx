"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { useMediaQuery, useReducedMotion } from "../hooks";
import { useStage } from "../stage/StageProvider";
import styles from "./Murmurs.module.css";

interface Murmur {
  id: number;
  text: string;
  side: "left" | "right";
}

/**
 * Round 1: background characters murmur. Now and then a faint, faded line
 * drifts along the edge of the screen, like the edge printing on film stock.
 * Verified lines only (the unattributed ones: background voices), one at a
 * time, never while someone is on stage, never on phones, off when « Les
 * témoins se taisent ». Decorative: hidden from screen readers.
 */
export function Murmurs({ lines }: { lines: string[] }) {
  const { busy, silenced } = useStage();
  const wide = useMediaQuery("(min-width: 900px)");
  const reduced = useReducedMotion();
  const [murmur, setMurmur] = useState<Murmur | null>(null);
  const next = useRef(0);
  const allowed = useRef(false);
  useEffect(() => {
    allowed.current = wide && !busy && !silenced;
  }, [wide, busy, silenced]);

  useEffect(() => {
    if (!wide || silenced || lines.length === 0) return;
    let timer = 0;
    const schedule = (ms: number) => {
      timer = window.setTimeout(() => {
        if (allowed.current && document.visibilityState === "visible") {
          const text = lines[next.current++ % lines.length];
          setMurmur({ id: next.current, text, side: next.current % 2 ? "left" : "right" });
          window.setTimeout(() => setMurmur(null), 7000);
        }
        schedule(26_000 + Math.random() * 20_000);
      }, ms);
    };
    schedule(14_000 + Math.random() * 10_000);
    return () => window.clearTimeout(timer);
  }, [wide, silenced, lines]);

  return (
    <div className={styles.layer} aria-hidden="true">
      <AnimatePresence>
        {/* someone takes the stage: the murmur gives way */}
        {murmur && !busy && (
          <m.p
            key={murmur.id}
            className={[styles.murmur, styles[murmur.side]].join(" ")}
            data-testid="murmur"
            initial={{ opacity: 0, y: reduced ? 0 : 24 }}
            animate={{ opacity: 0.34, y: 0, transition: { duration: reduced ? 0.15 : 1.6, ease: "easeOut" } }}
            exit={{ opacity: 0, y: reduced ? 0 : -24, transition: { duration: reduced ? 0.15 : 2, ease: "easeIn" } }}
          >
            {murmur.text}
          </m.p>
        )}
      </AnimatePresence>
    </div>
  );
}
