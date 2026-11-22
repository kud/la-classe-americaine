import { REVIEWS } from "@/content/reviews";
import { Chapter } from "../Chapter";
import { Reviews } from "./Reviews";
import styles from "./home.module.css";

/** 5 · La critique est unanime: V1's invented press reviews, one at a time (I-5). */
export function Critique() {
  return (
    <Chapter id="critique" room="screen" labelledBy="critique-titre" className={[styles.chapter, styles.critique].join(" ")}>
      <div className="wrap">
        <h2 id="critique-titre" className="kicker" style={{ textAlign: "center", margin: 0 }}>
          Chapitre 5 · La critique est unanime
        </h2>
        <Reviews reviews={REVIEWS} />
        <p className={styles.footnote}>Critiques imaginaires, depuis 2011.</p>
      </div>
    </Chapter>
  );
}
