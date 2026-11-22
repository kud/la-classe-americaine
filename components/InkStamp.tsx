"use client";

import { m } from "motion/react";
import { useReducedMotion } from "./hooks";
import styles from "./InkStamp.module.css";

/**
 * A rubber stamp (round 1): it presses past its mark (1.6 → 0.94 → 1), and the
 * ink spreads a little into the paper behind it. Reduced motion: it is simply there.
 */
export function InkStamp({
  children,
  className,
  rotate,
  from = 1.6,
  duration = 0.22,
  testId,
}: {
  children: React.ReactNode;
  className?: string;
  rotate: number;
  from?: number;
  duration?: number;
  testId?: string;
}) {
  const reduced = useReducedMotion();
  const t = { duration: reduced ? 0 : duration, ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number], times: [0, 0.7, 1] };
  return (
    <m.span
      className={[styles.stamp, className].join(" ")}
      data-testid={testId}
      initial={reduced ? false : { opacity: 0, scale: from, rotate }}
      animate={{ opacity: [0, 1, 0.92], scale: [from, 0.94, 1], rotate }}
      transition={t}
      style={{ rotate }}
    >
      <m.span
        className={styles.ink}
        aria-hidden="true"
        initial={reduced ? false : { opacity: 0, scale: 0.6 }}
        animate={{ opacity: [0, 0.28, 0.14], scale: [0.6, 1.12, 1.18] }}
        transition={{ duration: reduced ? 0 : duration * 3.5, ease: "easeOut", times: [0, 0.25, 1] }}
      />
      <span className={styles.label}>{children}</span>
    </m.span>
  );
}
