"use client";

import { useRef } from "react";
import { useInView } from "../hooks";
import { useSound } from "../sound/SoundProvider";

/** A typewriter tick on the memo, the first time it comes into view (sound on only). */
export function TypewriterTicks({ children }: { children: React.ReactNode }) {
  const { on, tick } = useSound();
  const done = useRef(false);
  const [ref] = useInView<HTMLDivElement>(0.5, (v) => {
    if (!v || done.current || !on) return;
    done.current = true;
    const gaps = [0, 90, 170, 260, 330, 430, 520, 580, 690, 760, 880];
    gaps.forEach((g) => window.setTimeout(tick, g));
  });
  return <div ref={ref}>{children}</div>;
}
