"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SoundEngine } from "@/lib/sound";

interface SoundApi {
  on: boolean;
  toggle: () => void;
  tick: () => void;
  thud: () => void;
  setWhirr: (on: boolean) => void;
}

const Ctx = createContext<SoundApi>({ on: false, toggle: () => {}, tick: () => {}, thud: () => {}, setWhirr: () => {} });

export function SoundProvider({ children }: { children: React.ReactNode }) {
  const [on, setOn] = useState(false);
  const engine = useRef<SoundEngine | null>(null);
  const whirrWanted = useRef(false);

  const onRef = useRef(false);

  const toggle = useCallback(() => {
    const next = !onRef.current;
    onRef.current = next;
    if (next) {
      // created inside the click: never before a user gesture
      engine.current ??= new SoundEngine();
      void engine.current.resume();
      engine.current.setWhirr(whirrWanted.current);
    } else {
      engine.current?.setWhirr(false);
    }
    setOn(next);
  }, []);

  useEffect(() => () => engine.current?.close(), []);

  const api = useMemo<SoundApi>(
    () => ({
      on,
      toggle,
      tick: () => on && engine.current?.tick(),
      thud: () => on && engine.current?.thud(),
      setWhirr: (w) => {
        whirrWanted.current = w;
        if (on) engine.current?.setWhirr(w);
      },
    }),
    [on, toggle],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export const useSound = () => useContext(Ctx);
