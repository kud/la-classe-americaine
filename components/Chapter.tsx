"use client";

import { useEffect, useRef, useState } from "react";
import { useStage } from "./stage/StageProvider";

interface Props {
  id: string;
  room: "screen" | "paper";
  labelledBy: string;
  className?: string;
  /** Fire the chapter's Doublage (I-2a) the first time it is 40 % in view. */
  cue?: boolean;
  /** Called whenever the chapter enters or leaves the viewport. */
  onView?: (inView: boolean) => void;
  /**
   * The film-grammar transition the screen enters with, once (round 1):
   * an iris, a hard cut, a dissolve, a newsreel wipe, or a fade from black.
   * Only when motion is allowed: the inline script in the layout sets
   * html[data-anim]; without it (reduced motion, no JS, crawlers) nothing hides.
   */
  enter?: "iris" | "cut" | "dissolve" | "wipe" | "black";
  children: React.ReactNode;
}

const THRESHOLDS = Array.from({ length: 21 }, (_, i) => i / 20);

/**
 * A chapter of the inquiry. « 40 % in view » is measured against whichever is
 * smaller, the chapter or the viewport, so a chapter taller than the screen
 * still triggers once it fills most of it.
 */
export function Chapter({ id, room, labelledBy, className, cue, onView, enter, children }: Props) {
  const [entered, setEntered] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { request } = useStage();
  const fired = useRef(false);
  const onViewRef = useRef(onView);
  useEffect(() => {
    onViewRef.current = onView;
  });

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([e]) => {
        onViewRef.current?.(e.isIntersecting);
        if (!e.isIntersecting) return;
        const visible = e.intersectionRect.height;
        const basis = Math.min(e.boundingClientRect.height, window.innerHeight);
        if (visible / basis >= 0.2) setEntered(true);
        if (!cue || fired.current) return;
        if (visible / basis >= 0.4) {
          // the stage drops it if someone is talking; it may fire again later
          if (request({ kind: "chapter", chapter: id })) fired.current = true;
        }
      },
      { threshold: THRESHOLDS },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [id, cue, request]);

  return (
    <section ref={ref} id={id} className={[room, "chapter-screen", className].filter(Boolean).join(" ")} aria-labelledby={labelledBy}>
      {enter ? (
        <div className="enter" data-enter={enter} data-state={entered ? "in" : "waiting"}>
          {children}
        </div>
      ) : (
        children
      )}
    </section>
  );
}
