"use client";

import { useEffect } from "react";
import { useStage } from "./stage/StageProvider";

/** A beat (600 ms), then George's still fades in: « Ah, monde de merde ! » */
export function NotFoundCue() {
  const { request } = useStage();
  useEffect(() => {
    const t = window.setTimeout(() => request({ kind: "cue", character: "george", text: "Ah, monde de merde !" }), 600);
    return () => window.clearTimeout(t);
  }, [request]);
  return null;
}
