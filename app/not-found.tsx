import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Ident } from "@/components/brand/Spots";
import { NotFoundCue } from "@/components/NotFoundCue";
import styles from "./not-found.module.css";

export const metadata: Metadata = {
  title: "Monde de merde",
};

/** I-9: the 404. A newsreel card, a beat, and George says it. Status stays a real 404. */
export default function NotFound() {
  return (
    <main id="contenu" className={["screen", styles.room].join(" ")}>
      <div className={styles.inner}>
        <p className={styles.card}>
          <Ident />
          Erreur 404 — Page introuvable
        </p>
        <h1 className={styles.title}>Cette page n&apos;existe pas.</h1>
        <p className={styles.text}>Nos journalistes ont cherché partout. Même au Tegzass.</p>
        <Globe className={styles.globe} />
        <Link href="/" className={styles.back}>
          Retourner à l&apos;enquête
        </Link>
      </div>
      <NotFoundCue />
    </main>
  );
}
