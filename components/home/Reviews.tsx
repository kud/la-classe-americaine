"use client";

import { useEffect, useRef, useState } from "react";
import type { Review } from "@/content/reviews";
import { useInView, useReducedMotion } from "../hooks";
import styles from "./home.module.css";

function Stars({ n }: { n: number }) {
  return (
    <p className={styles.stars} role="img" aria-label={`${n} étoile${n > 1 ? "s" : ""} sur 5`}>
      <span aria-hidden="true">
        {"★".repeat(n)}
        <span className={styles.starsOff}>{"☆".repeat(5 - n)}</span>
      </span>
    </p>
  );
}

/**
 * One review at a time, a crossfade of 400 ms every 7 s; pauses on hover,
 * focus and off-screen; previous / next buttons. No announcements while it
 * rotates. Reduced motion: no rotation, all six listed.
 */
export function Reviews({ reviews }: { reviews: Review[] }) {
  const reduced = useReducedMotion();
  const [i, setI] = useState(0);
  const [fading, setFading] = useState(false);
  const [held, setHeld] = useState(false);
  const [byHand, setByHand] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const swap = useRef<number | null>(null);

  const go = (next: number, manual = false) => {
    if (swap.current) window.clearTimeout(swap.current);
    setByHand(manual);
    setFading(true);
    swap.current = window.setTimeout(() => {
      setI((next + reviews.length) % reviews.length);
      setFading(false);
    }, 200);
  };

  useEffect(() => {
    if (reduced || held || !inView) return;
    const t = window.setInterval(() => go(i + 1), 7000);
    return () => window.clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced, held, inView, i]);

  useEffect(() => () => {
    if (swap.current) window.clearTimeout(swap.current);
  }, []);

  if (reduced) {
    return (
      <ul className={styles.reviewList} data-testid="reviews-all">
        {reviews.map((r) => (
          <li key={r.outlet} className={styles.review}>
            <Stars n={r.stars} />
            <blockquote className={styles.reviewQuote}>
              <p>{r.text}</p>
            </blockquote>
            <p className={styles.outlet}>{r.outlet}</p>
          </li>
        ))}
      </ul>
    );
  }

  const r = reviews[i];
  return (
    <div
      ref={ref}
      className={styles.review}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
      data-testid="reviews"
    >
      <div className={[styles.reviewBody, fading ? styles.faded : ""].join(" ")} aria-live={byHand ? "polite" : "off"} aria-atomic="true">
        <Stars n={r.stars} />
        <blockquote className={styles.reviewQuote}>
          <p>{r.text}</p>
        </blockquote>
        <p className={styles.outlet}>{r.outlet}</p>
      </div>
      <div className={styles.reviewNav}>
        <button type="button" onClick={() => go(i - 1, true)} aria-label="Critique précédente">
          ←
        </button>
        <span className={styles.count} aria-hidden="true">
          {i + 1} / {reviews.length}
        </span>
        <button type="button" onClick={() => go(i + 1, true)} aria-label="Critique suivante">
          →
        </button>
      </div>
    </div>
  );
}
