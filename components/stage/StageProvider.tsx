"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createStage, type Appearance, type Trigger } from "@/lib/stage";
import { LINES } from "@/content/lines";
import { CHARACTERS, type CharacterId } from "@/content/characters";
import { KEYS, read, write } from "@/lib/storage";
import { usePhone, useReducedMotion } from "../hooks";
import { Doublage } from "./Doublage";
import { Entracte } from "./Entracte";

/** Chapter → its natural speaker (§4.1). */
export const CHAPTER_SPEAKERS: Record<string, CharacterId> = {
  redaction: "patron",
  pieces: "george",
  detournement: "welles",
};

/** « Les témoins se taisent », remembered per browser. Under reduced motion idle lines are off regardless. */
const TAISENT_EVENT = "lca:taisent";
function subscribeTaisent(cb: () => void) {
  window.addEventListener(TAISENT_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(TAISENT_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

interface StageApi {
  request: (t: Trigger<CharacterId>) => boolean;
  /** « Les témoins se taisent »: automatic triggers off. */
  silenced: boolean;
  setSilenced: (v: boolean) => void;
}

const Ctx = createContext<StageApi>({ request: () => false, silenced: false, setSilenced: () => {} });

export function StageProvider({ children }: { children: React.ReactNode }) {
  const reducedMotion = useReducedMotion();
  const phone = usePhone();
  const silenced = useSyncExternalStore(subscribeTaisent, () => read(KEYS.taisent) === "1", () => false);
  const [current, setCurrent] = useState<Appearance<CharacterId> | null>(null);
  const [announce, setAnnounce] = useState("");

  const [stage] = useState(() =>
    createStage<CharacterId>({
      now: () => performance.now(),
      pools: LINES,
      chapterSpeakers: CHAPTER_SPEAKERS,
      idleSpeaker: "george",
    }),
  );

  useEffect(() => {
    stage.setEnv({ reducedMotion, phone, auto: !silenced });
  }, [stage, reducedMotion, phone, silenced]);

  const setSilenced = useCallback((v: boolean) => {
    write(KEYS.taisent, v ? "1" : null);
    window.dispatchEvent(new Event(TAISENT_EVENT));
  }, []);

  const request = useCallback((t: Trigger<CharacterId>) => {
    const a = stage.request(t);
    if (!a) return false;
    setCurrent(a);
    if (a.type === "doublage") setAnnounce(`${CHARACTERS[a.character].name} : ${a.line.text}`);
    else setAnnounce("Entracte.");
    return true;
  }, [stage]);

  const end = useCallback((id: number) => {
    stage.end(id);
    setCurrent((c) => (c && c.id === id ? null : c));
    setAnnounce("");
  }, [stage]);

  // the reader's presence, and the slow tick that lets idle triggers through
  useEffect(() => {
    let lastMove = 0;
    const activity = () => stage.activity();
    const move = () => {
      const t = performance.now();
      if (t - lastMove > 500) {
        lastMove = t;
        stage.activity();
      }
    };
    window.addEventListener("scroll", activity, { passive: true });
    window.addEventListener("pointerdown", activity, { passive: true });
    window.addEventListener("keydown", activity);
    window.addEventListener("pointermove", move, { passive: true });
    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") {
        stage.activity();
        return;
      }
      const due = stage.due();
      if (due) request(due);
    }, 1000);
    return () => {
      window.removeEventListener("scroll", activity);
      window.removeEventListener("pointerdown", activity);
      window.removeEventListener("keydown", activity);
      window.removeEventListener("pointermove", move);
      window.clearInterval(tick);
    };
  }, [stage, request]);

  const api = useMemo(() => ({ request, silenced, setSilenced }), [request, silenced, setSilenced]);

  return (
    <Ctx.Provider value={api}>
      {children}
      {current?.type === "doublage" && (
        <Doublage key={current.id} appearance={current} reducedMotion={reducedMotion} phone={phone} onDone={end} />
      )}
      {current?.type === "entracte" && (
        <Entracte key={current.id} id={current.id} reducedMotion={reducedMotion} onDone={end} />
      )}
      <div className="sr-only" role="status" aria-live="polite" data-testid="stage-announcer">
        {announce}
      </div>
    </Ctx.Provider>
  );
}

export const useStage = () => useContext(Ctx);
