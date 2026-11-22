"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, m } from "motion/react";
import type { Appearance } from "@/lib/stage";
import { CHARACTERS, type CharacterId } from "@/content/characters";
import { cardStill } from "@/content/stills";
import { Still, MissingStill } from "../Still";
import styles from "./Doublage.module.css";

type DoublageAppearance = Extract<Appearance<CharacterId>, { type: "doublage" }>;

interface Props {
  appearance: DoublageAppearance;
  reducedMotion: boolean;
  phone: boolean;
  onDone: (id: number) => void;
}

const EASE_IN_OUT: [number, number, number, number] = [0.2, 0.8, 0.2, 1];

/** On a phone, dock at the top when the visible chapter heading sits in the bottom third. */
function dockTop(): boolean {
  const h = window.innerHeight;
  return Array.from(document.querySelectorAll("main h1, main h2")).some((el) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < h && r.top > (h * 2) / 3;
  });
}

/**
 * Le Doublage (§4.1): a framed still slides in, a beat of silence (the « VF »
 * tag blinks), then the line arrives as a film subtitle, word by word, a beat
 * after the mouth. Hold, then exit the way it came.
 */
export function Doublage({ appearance, reducedMotion, phone, onDone }: Props) {
  const { character, line, timeline } = appearance;
  const who = CHARACTERS[character];
  const still = cardStill(character);
  const words = line.text.split(/[ \t\n]+/).filter(Boolean);

  const [visible, setVisible] = useState(true);
  const [revealed, setRevealed] = useState(reducedMotion ? words.length : 0);
  const [vf, setVf] = useState(false);
  const [top] = useState(() => phone && typeof window !== "undefined" && dockTop());

  const boxRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const hold = useRef<{ timer: number | null; startedAt: number; remaining: number }>({
    timer: null,
    startedAt: 0,
    remaining: timeline.hold,
  });
  const paused = useRef(false);

  const leave = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    if (hold.current.timer) window.clearTimeout(hold.current.timer);
    setVisible(false);
  }, []);

  const startHold = useCallback(
    (ms: number) => {
      hold.current.startedAt = performance.now();
      hold.current.remaining = ms;
      if (paused.current) return;
      hold.current.timer = window.setTimeout(leave, ms);
    },
    [leave],
  );

  useEffect(() => {
    const at = (ms: number, fn: () => void) => timers.current.push(window.setTimeout(fn, ms));
    if (reducedMotion) {
      at(timeline.enter, () => startHold(timeline.hold));
    } else {
      at(timeline.enter, () => setVf(true));
      const start = timeline.enter + timeline.beat;
      words.forEach((_, i) => at(start + timeline.perWord * (i + 1), () => setRevealed(i + 1)));
      at(start + timeline.reveal, () => startHold(timeline.hold));
    }
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
    // one appearance per mount (keyed by id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Dismiss: Escape, or a tap anywhere outside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") leave();
    };
    const onDown = (e: PointerEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) leave();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [leave]);

  // Hover or focus on the bubble pauses the hold
  const pause = () => {
    if (paused.current) return;
    paused.current = true;
    setRevealed(words.length);
    const h = hold.current;
    if (h.timer) {
      window.clearTimeout(h.timer);
      h.timer = null;
      h.remaining = Math.max(400, h.remaining - (performance.now() - h.startedAt));
    }
  };
  const resume = () => {
    if (!paused.current) return;
    paused.current = false;
    startHold(hold.current.remaining);
  };

  const off = reducedMotion
    ? { opacity: 0 }
    : phone
      ? { y: top ? "-130%" : "130%", opacity: 1 }
      : { x: "-120%", opacity: 1 };

  return (
    <AnimatePresence onExitComplete={() => onDone(appearance.id)}>
      {visible && (
        <m.div
          ref={boxRef}
          className={[styles.dub, top ? styles.top : ""].join(" ")}
          data-testid="doublage"
          data-character={character}
          initial={off}
          animate={{ x: 0, y: 0, opacity: 1, transition: { duration: timeline.enter / 1000, ease: EASE_IN_OUT } }}
          exit={{ ...off, transition: { duration: timeline.exit / 1000, ease: "easeIn" } }}
          onPointerEnter={pause}
          onPointerLeave={resume}
          onFocus={pause}
          onBlur={resume}
        >
          <div className={styles.frame} aria-hidden="true">
            {still ? (
              <Still still={still} sizes="112px" variant="bare" decorative />
            ) : (
              <MissingStill name={who.name} initial={character === "recitant" ? "A" : undefined} variant="frame" className={styles.missing} />
            )}
            <span className={[styles.vf, vf ? styles.blink : ""].join(" ")}>VF</span>
          </div>
          <p className={styles.sub} aria-hidden="true">
            <span className={styles.who}>{who.name}</span>
            {words.map((w, i) => (
              <span key={i} className={[styles.w, i < revealed ? styles.on : ""].join(" ")}>
                {w}{" "}
              </span>
            ))}
          </p>
          <button type="button" className={styles.close} onClick={leave} aria-label="Fermer le sous-titre">
            ✕
          </button>
        </m.div>
      )}
    </AnimatePresence>
  );
}
