"use client";

import { useRef, useState } from "react";
import { m, useAnimationControls } from "motion/react";
import { Chapter } from "../Chapter";
import { useReducedMotion } from "../hooks";
import { useSound } from "../sound/SoundProvider";
import { BRAND } from "@/content/brand";
import { InkStamp } from "../InkStamp";
import styles from "./home.module.css";

/** I-7: at 50 % in view, the red stamp CLASSÉE drops across the file (220 ms), and the paper settles 2 px. Once. */
export function ClasseeStamp({ children, tail }: { children: React.ReactNode; tail: React.ReactNode }) {
  const reduced = useReducedMotion();
  const { thud } = useSound();
  const [stamped, setStamped] = useState(false);
  const done = useRef(false);
  const paper = useAnimationControls();

  const onView = (inView: boolean) => {
    if (!inView || done.current) return;
    const el = document.getElementById("classee");
    if (!el) return;
    const r = el.getBoundingClientRect();
    const visible = Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0);
    if (visible / Math.min(r.height, window.innerHeight) < 0.5) return;
    done.current = true;
    setStamped(true);
    window.setTimeout(() => {
      thud();
      if (!reduced) void paper.start({ y: [0, 2, 2], transition: { duration: 0.18, ease: "easeOut" } });
    }, reduced ? 0 : 220);
  };

  return (
    <Chapter id="classee" room="paper" labelledBy="classee-titre" enter="black" className={[styles.chapter, styles.classee].join(" ")} onView={onView}>
      <m.div animate={paper}>
        {children}
        <div className={styles.stampSlot}>
          {stamped ? (
            <p className={styles.bigStampSlot}>
              <InkStamp className={styles.bigStamp} rotate={-6} from={2} duration={0.22} testId="stamp-classee">
                {BRAND.stampClassee.delivered ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={BRAND.stampClassee.src} alt="Affaire classée" />
                ) : (
                  <>
                    <span className="sr-only">Tampon : affaire </span>CLASSÉE
                  </>
                )}
              </InkStamp>
            </p>
          ) : (
            <p className="sr-only">Affaire en cours.</p>
          )}
        </div>
        {tail}
      </m.div>
    </Chapter>
  );
}
