"use client";

import { LazyMotion, domAnimation, MotionConfig } from "motion/react";
import { SoundProvider } from "./sound/SoundProvider";
import { SoundSwitch } from "./sound/SoundSwitch";
import { StageProvider } from "./stage/StageProvider";
import { Carton, ConsoleMessage, CyclimseListener } from "./Carton";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <SoundProvider>
          <StageProvider>
            <SoundSwitch />
            {children}
            <Carton />
            <CyclimseListener />
            <ConsoleMessage />
          </StageProvider>
        </SoundProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
