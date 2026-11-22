import Link from "next/link";
import { still } from "@/content/stills";
import { Still } from "../Still";
import { ClasseeStamp } from "./ClasseeStamp";
import styles from "./home.module.css";

/** 7 · Affaire classée: the inquiry board, the red thread, the stamp. No spoiler. */
export function Classee() {
  const journalists = [still("dave-card"), still("peter-card"), still("steven-card")];
  return (
    <ClasseeStamp
      tail={
        <div className={["wrap", styles.board].join(" ")}>
          <p className={styles.closing}>L&apos;enquête est close. Pour la réponse, il faut voir le flim.</p>
          <div className={styles.ctas}>
            <Link href="/repliques">Toutes les répliques</Link>
            <Link href="/generique">Le générique</Link>
          </div>
        </div>
      }
    >
      <div className={["wrap", styles.board].join(" ")}>
        <p className="kicker">Chapitre 7 · Fin de l&apos;enquête</p>
        <div className={styles.boardPhotos} aria-hidden="true">
          <svg className={styles.thread} viewBox="0 0 300 60" preserveAspectRatio="none">
            <path d="M40 30 Q 95 58 150 26 T 260 30" fill="none" stroke="var(--stamp)" strokeWidth="1.5" />
          </svg>
          {journalists.map((s) => (
            <Still key={s.id} still={s} sizes="120px" variant="pinned" decorative className={styles.boardPhoto} />
          ))}
        </div>
        <h2 id="classee-titre" className={styles.boardQuestion}>
          « Monde de merde » : qu&apos;a-t-il voulu dire ?
        </h2>
      </div>
    </ClasseeStamp>
  );
}
