"use client";

import { Chapter } from "../Chapter";
import { useSound } from "../sound/SoundProvider";
import { useReducedMotion } from "../hooks";
import styles from "./home.module.css";

/** The newsreel chapter; the projector whirrs while it is on screen (sound on only). */
export function HeroChapter({ children }: { children: React.ReactNode }) {
  const { setWhirr } = useSound();
  return (
    <Chapter id="actualites" room="screen" labelledBy="actualites-titre" className={styles.heroChapter} onView={setWhirr}>
      {children}
    </Chapter>
  );
}

/** « Ouvrir l'enquête ↓ »: the one iris of the site, opening chapter 2. */
export function OpenInquiry({ className }: { className?: string }) {
  const reduced = useReducedMotion();
  return (
    <a
      href="#redaction"
      className={className}
      onClick={(e) => {
        const target = document.getElementById("redaction");
        if (!target) return;
        e.preventDefault();
        if (!reduced) {
          target.classList.remove(styles.iris);
          void target.offsetWidth;
          target.classList.add(styles.iris);
        }
        target.scrollIntoView({ behavior: "instant", block: "start" });
        history.replaceState(null, "", "#redaction");
        document.getElementById("redaction-titre")?.focus({ preventScroll: true });
      }}
    >
      Ouvrir l&apos;enquête ↓
    </a>
  );
}
