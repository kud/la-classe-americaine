"use client";

import { useId, useLayoutEffect, useRef, useState } from "react";
import { CHARACTERS } from "@/content/characters";
import styles from "./Pron.module.css";

/**
 * I-11: « Peter » and « Steven » wherever they appear. Hover 300 ms or focus
 * 0 ms: « prononcé Pétaire, et non pas Piteur ».
 */
export function Pron({ who }: { who: "peter" | "steven" }) {
  const c = CHARACTERS[who];
  const id = useId();
  const [open, setOpen] = useState(false);
  const timer = useRef<number | null>(null);
  const tip = useRef<HTMLSpanElement>(null);
  const [shift, setShift] = useState(0);

  // keep the tooltip inside the viewport (phones)
  useLayoutEffect(() => {
    if (!open || !tip.current) return;
    const r = tip.current.getBoundingClientRect();
    const vw = document.documentElement.clientWidth;
    const over = r.right - shift - (vw - 8);
    const under = 8 - (r.left - shift);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- measured layout, one adjustment
    setShift(over > 0 ? -over : under > 0 ? under : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const clear = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };
  return (
    <span className={styles.wrap}>
      <span
        className={styles.name}
        tabIndex={0}
        aria-describedby={id}
        onPointerEnter={() => {
          clear();
          timer.current = window.setTimeout(() => setOpen(true), 300);
        }}
        onPointerLeave={() => {
          clear();
          setOpen(false);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => e.key === "Escape" && setOpen(false)}
        data-testid={`pron-${who}`}
      >
        {c.name}
      </span>
      <span
        id={id}
        ref={tip}
        role="tooltip"
        className={[styles.tip, open ? styles.open : ""].join(" ")}
        style={{ marginLeft: shift }}
      >
        prononcé « {c.pronunciation!.said} », et non pas « {c.pronunciation!.not} »
      </span>
    </span>
  );
}
