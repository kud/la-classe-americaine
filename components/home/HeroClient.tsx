"use client";

import { useState } from "react";
import { Chapter } from "../Chapter";
import { useSound } from "../sound/SoundProvider";
import styles from "./home.module.css";

/** The newsreel chapter; the projector whirrs while it is on screen (sound on only). */
export function HeroChapter({ children }: { children: React.ReactNode }) {
  const { setWhirr } = useSound();
  const [playing, setPlaying] = useState(true);
  return (
    <Chapter
      id="actualites"
      room="screen"
      labelledBy="actualites-titre"
      className={styles.heroChapter}
      onView={(v) => {
        setWhirr(v);
        setPlaying(v);
      }}
    >
      {children}
      {/* the projector: moving grain, a flicker, a light leak (round 1); still under reduced motion */}
      <div className={styles.projector} data-playing={playing} aria-hidden="true">
        <span className={styles.grain} />
        <span className={styles.leak} />
        <span className={styles.flicker} />
      </div>
    </Chapter>
  );
}

/** « Ouvrir l'enquête ↓ »: a cut to chapter 2, which opens on its own iris. */
export function OpenInquiry({ className }: { className?: string }) {
  return (
    <a
      href="#redaction"
      className={className}
      onClick={(e) => {
        const target = document.getElementById("redaction");
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({ behavior: "instant", block: "start" });
        history.replaceState(null, "", "#redaction");
        document.getElementById("redaction-titre")?.focus({ preventScroll: true });
      }}
    >
      Ouvrir l&apos;enquête ↓
    </a>
  );
}
