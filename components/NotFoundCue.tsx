"use client";

import { useEffect } from "react";
import { useStage } from "./stage/StageProvider";

/** A beat (600 ms), then George's still slides in: « Monde de merde. » */
export function NotFoundCue() {
  const { request } = useStage();
  useEffect(() => {
    const t = window.setTimeout(() => request({ kind: "cue", character: "george", text: "Monde de merde." }), 600);
    return () => window.clearTimeout(t);
  }, [request]);
  return null;
}
