"use client";

import { replayCarton } from "./Carton";
import { useStage } from "./stage/StageProvider";

/** « Les témoins se taisent »: one switch for the automatic Doublage, remembered per browser. */
export function TaisentToggle() {
  const { silenced, setSilenced } = useStage();
  return (
    <label style={{ display: "inline-flex", gap: 10, alignItems: "center", minHeight: 44, cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={silenced}
        onChange={(e) => setSilenced(e.target.checked)}
        style={{ width: 20, height: 20, accentColor: "var(--stamp)" }}
        data-testid="taisent"
      />
      Les témoins se taisent
    </label>
  );
}

/** I-8, the footer half: the tiny line replays the opening card. */
export function CyclimseLine({ className }: { className?: string }) {
  return (
    <button type="button" className={className} onClick={replayCarton} data-testid="cyclimse-line">
      Ce site n&apos;est pas un site sur le cyclimse.
    </button>
  );
}
