"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { KEYS, write } from "@/lib/storage";
import { useReducedMotion } from "./hooks";
import { Cyclimse } from "./brand/Spots";
import styles from "./Carton.module.css";

export const CARTON_EVENT = "lca:carton";

/** Replays the opening card (I-8: typing « cyclimse », or the footer line). */
export function replayCarton() {
  window.dispatchEvent(new Event(CARTON_EVENT));
}

/**
 * Le carton (I-1): full-screen black card, exactly as the film opens. First
 * visit only, rendered client-side over the SSR page. Holds 3.2 s, then a hard
 * cut; any key, click or tap skips. Reduced motion: static, with « Entrer ».
 */
export function Carton() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const returnFocus = useRef<Element | null>(null);

  const close = useCallback(() => {
    setOpen(false);
    delete document.documentElement.dataset.carton;
    if (returnFocus.current instanceof HTMLElement) returnFocus.current.focus({ preventScroll: true });
  }, []);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement;
    setOpen(true);
    write(KEYS.carton, "1");
  }, []);

  useEffect(() => {
    // after hydration: the blackout is already up, the card replaces it on the next frame
    const raf = document.documentElement.dataset.carton === "1" ? requestAnimationFrame(show) : 0;
    window.addEventListener(CARTON_EVENT, show);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener(CARTON_EVENT, show);
    };
  }, [show]);

  useEffect(() => {
    if (!open) return;
    button.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault(); // one control in the dialog: keep focus on it
        return;
      }
      e.preventDefault();
      close();
    };
    // a frame later, so the keystroke that opened it (« e » of cyclimse) does not close it
    const raf = requestAnimationFrame(() => window.addEventListener("keydown", onKey));
    const timer = reduced ? 0 : window.setTimeout(close, 3200);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(timer);
    };
  }, [open, reduced, close]);

  if (!open) return null;
  return (
    <div
      className={[styles.carton, reduced ? "" : styles.flicker].join(" ")}
      role="dialog"
      aria-modal="true"
      aria-labelledby="carton-title"
      onClick={close}
      data-testid="carton"
    >
      <div className={styles.inner}>
        <Cyclimse className={styles.bike} />
        <p id="carton-title" className={styles.title}>
          Attention !
        </p>
        <p className={styles.text}>
          ce flim n&apos;est pas un flim sur le cyclimse.
          <br />
          Merci de votre compréhension.
        </p>
        <button ref={button} type="button" className={styles.skip} onClick={close}>
          {reduced ? "Entrer" : "Toucher pour entrer"}
        </button>
      </div>
    </div>
  );
}

/** I-8: typing « cyclimse » anywhere outside a field replays the card. */
export function CyclimseListener() {
  useEffect(() => {
    let typed = "";
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      if (e.key.length !== 1 || e.metaKey || e.ctrlKey || e.altKey) return;
      typed = (typed + e.key.toLowerCase()).slice(-8);
      if (typed === "cyclimse") {
        typed = "";
        replayCarton();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return null;
}

/** I-10: for whoever opens the console. */
export function ConsoleMessage() {
  useEffect(() => {
    console.log(
      "%cAttention !%c\nce flim n'est pas un flim sur le cyclimse.\nMerci de votre compréhension.",
      "font: 600 22px 'Bodoni Moda', Didot, serif",
      "font: 14px 'Bodoni Moda', Didot, serif",
    );
    console.log("L'homme le plus classe du monde vous regarde lire la console.");
  }, []);
  return null;
}
