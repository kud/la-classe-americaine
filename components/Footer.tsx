import Link from "next/link";
import { Wordmark } from "./brand/Spots";
import { CyclimseLine, TaisentToggle } from "./FooterControls";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={["paper", styles.footer].join(" ")}>
      <div className="wrap">
        <div className={styles.top}>
          <Link href="/" className={styles.home} aria-label="Le Flim — retour à l'enquête">
            <Wordmark />
          </Link>
          <nav aria-label="Pied de page" className={styles.nav}>
            <Link href="/">L&apos;enquête</Link>
            <Link href="/repliques">Les répliques</Link>
            <Link href="/generique">Le générique</Link>
          </nav>
        </div>
        <p className={styles.legal}>
          La Classe Américaine — Le Grand Détournement (1993). © Warner Bros., Canal+. Site hommage non officiel, fait par
          des fans. <Link href="/generique#droits">Droits et générique</Link>.
        </p>
        <div className={styles.bottom}>
          <TaisentToggle />
          <CyclimseLine className={styles.cyc} />
        </div>
      </div>
    </footer>
  );
}
