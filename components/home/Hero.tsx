import { getImageProps } from "next/image";
import { still, STILL_CREDIT } from "@/content/stills";
import { Ident } from "../brand/Spots";
import { HeroChapter, OpenInquiry } from "./HeroClient";
import styles from "./home.module.css";

/** 1 · Les Actualités: the newsreel announces the death of the classiest man in the world. */
export function Hero() {
  const tall = still("george-hero");
  const wide = still("george-wide");
  const common = { alt: tall.alt, quality: 72, placeholder: "blur" as const };
  const { props: desktop } = getImageProps({
    ...common,
    src: tall.src,
    width: tall.width,
    height: tall.height,
    blurDataURL: tall.blurDataURL,
    sizes: "(min-width: 1200px) 440px, 40vw",
    loading: "eager",
    fetchPriority: "high",
  });
  const {
    props: { srcSet: phoneSrcSet },
  } = getImageProps({
    ...common,
    src: wide.src,
    width: wide.width,
    height: wide.height,
    blurDataURL: wide.blurDataURL,
    sizes: "calc(100vw - 32px)",
  });

  return (
    <HeroChapter>
      <div className={["wrap", styles.hero].join(" ")}>
        <div className={styles.heroText}>
          <p className={styles.cardTitle}>
            <Ident />
            Les Actualités — Édition spéciale
          </p>
          <h1 id="actualites-titre" className={styles.headline}>
            L&apos;homme le plus classe du monde est mort.
          </h1>
          <p className={styles.dateline}>
            Atoll de Pom Pom Galli, Ocean South Pacific, entre l&apos;Australia et la South America.
          </p>
          <p className={styles.dek}>
            George Abitbol s&apos;est éteint au large de Pom Pom Galli. Ses derniers mots :
            <span className={styles.lastWords}>« Monde de merde. »</span>
          </p>
          <p className={styles.byline}>
            La Classe Américaine — Le Grand Détournement · un flim de Michel Hazanavicius et Dominique Mézerette ·
            Canal+, 1993
          </p>
          <OpenInquiry className={styles.cue} />
        </div>
        <figure className={styles.heroFigure}>
          <div className={styles.heroFrame}>
            <picture>
              <source media="(max-width: 759px)" srcSet={phoneSrcSet} sizes="calc(100vw - 32px)" />
              {/* eslint-disable-next-line jsx-a11y/alt-text -- alt is in the spread props */}
              <img {...desktop} className={styles.heroImg} data-credit={STILL_CREDIT} data-still="george-hero" />
            </picture>
          </div>
          <figcaption className={styles.credit}>{STILL_CREDIT}</figcaption>
        </figure>
      </div>
    </HeroChapter>
  );
}
