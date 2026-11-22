"use client";

import { useSound } from "./SoundProvider";
import styles from "./SoundSwitch.module.css";

export function SoundSwitch() {
  const { on, toggle } = useSound();
  return (
    <button type="button" className={styles.switch} aria-pressed={on} onClick={toggle} data-testid="sound-switch">
      <span className={styles.dot} aria-hidden="true" />
      {on ? "Son : projecteur" : "Son : coupé"}
    </button>
  );
}
