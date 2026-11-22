import Image from "next/image";
import type { Still as StillData } from "@/content/stills";
import { STILL_CREDIT } from "@/content/stills";
import styles from "./Still.module.css";

interface Props {
  still: StillData;
  sizes: string;
  /** "frame": a film frame with sprocket holes (projection room). "pinned": an ID photo on the file. */
  variant?: "frame" | "pinned" | "bare";
  preload?: boolean;
  /** Decorative frames get alt="" (the name is already next to them). */
  decorative?: boolean;
  /** Visible credit caption on hover/focus (the dossier). */
  caption?: boolean;
  className?: string;
}

export function Still({ still, sizes, variant = "frame", preload, decorative, caption, className }: Props) {
  const img = (
    <Image
      src={still.src}
      width={still.width}
      height={still.height}
      alt={decorative ? "" : still.alt}
      sizes={sizes}
      quality={72}
      placeholder="blur"
      blurDataURL={still.blurDataURL}
      preload={preload}
      className={styles.img}
      data-credit={STILL_CREDIT}
      data-still={still.id}
    />
  );
  if (variant === "bare") return img;
  return (
    <figure
      className={[styles.figure, styles[variant], caption ? styles.withCaption : "", className].join(" ")}
      tabIndex={caption ? 0 : undefined}
    >
      <div className={styles.window}>{img}</div>
      {caption && <figcaption className={styles.caption}>{STILL_CREDIT}</figcaption>}
    </figure>
  );
}

/** A witness whose still has not arrived yet: a typographic frame, honest about it. */
export function MissingStill({
  name,
  initial,
  variant = "frame",
  className,
}: {
  name: string;
  initial?: string;
  variant?: "frame" | "pinned";
  className?: string;
}) {
  return (
    <figure className={[styles.figure, styles[variant], className].join(" ")} data-todo="still">
      <div className={[styles.window, styles.missing].join(" ")} aria-hidden="true">
        <span className={styles.initial}>{initial ?? name.replace(/^(Le|La) /, "").charAt(0).toUpperCase()}</span>
        <span className={styles.missingLabel}>image à venir</span>
      </div>
    </figure>
  );
}
