"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import { still } from "@/content/stills";
import { Still } from "../Still";
import styles from "./Entracte.module.css";

/**
 * Le projectionniste (I-4): after 90 s idle, a single title card slides up.
 * George sleeps on it. It waits for the reader to come back; « Reprendre »,
 * Escape or scrolling closes it.
 */
export function Entracte({ id, reducedMotion, onDone }: { id: number; reducedMotion: boolean; onDone: (id: number) => void }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const close = () => setVisible(false);
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, { passive: true });
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close);
    };
  }, []);

  const off = reducedMotion ? { opacity: 0 } : { y: "110%" };
  return (
    <AnimatePresence onExitComplete={() => onDone(id)}>
      {visible && (
        <m.div
          className={styles.card}
          data-testid="entracte"
          initial={off}
          animate={{ y: 0, opacity: 1, transition: { duration: reducedMotion ? 0.15 : 0.26, ease: [0.2, 0.8, 0.2, 1] } }}
          exit={{ ...off, transition: { duration: reducedMotion ? 0.15 : 0.2, ease: "easeIn" } }}
        >
          <Still still={still("george-sleeping")} sizes="380px" variant="bare" decorative />
          <p className={styles.title}>Entracte.</p>
          <button type="button" className={styles.resume} onClick={() => setVisible(false)}>
            Reprendre
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
