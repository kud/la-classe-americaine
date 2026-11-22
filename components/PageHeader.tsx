import Link from "next/link";
import { Wordmark } from "./brand/Spots";
import styles from "./PageHeader.module.css";

/** The masthead of the inner pages: the wordmark back to the inquiry, a kicker, a title. */
export function PageHeader({ kicker, title, id, children }: { kicker: string; title: React.ReactNode; id: string; children?: React.ReactNode }) {
  return (
    <header className={["screen", styles.header].join(" ")}>
      <div className="wrap">
        <Link href="/" className={styles.home} aria-label="Le Flim — retour à l'enquête">
          <Wordmark />
        </Link>
        <p className="kicker">{kicker}</p>
        <h1 id={id} className={styles.title}>
          {title}
        </h1>
        {children}
      </div>
    </header>
  );
}
