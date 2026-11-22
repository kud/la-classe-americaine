import { SOURCE_FILMS, BONUS_LINKS } from "@/content/films";
import { Chapter } from "../Chapter";
import styles from "./home.module.css";

/** 6 · Le Grand Détournement: how it was made, for newcomers. */
export function Detournement() {
  const links = BONUS_LINKS.filter((l) => l.alive);
  return (
    <Chapter id="detournement" room="paper" labelledBy="detournement-titre" cue className={styles.chapter}>
      <div className="wrap">
        <p className="kicker">Chapitre 6 · Le Grand Détournement</p>
        <h2 id="detournement-titre" className={styles.h2}>
          Un flim neuf, taillé dans une cinquantaine d&apos;autres.
        </h2>
        <div className={styles.prose}>
          <p>
            En 1993, pour un anniversaire de la Warner, le studio ouvre son catalogue à Canal+. Michel Hazanavicius et
            Dominique Mézerette y piochent des extraits d&apos;une cinquantaine de films tournés entre 1952 et 1980, un
            fragment de <cite>Maigret</cite> avec Bruno Cremer, et font tout redoubler par les voix françaises habituelles
            des stars, dont Raymond Loyer, la voix de John Wayne. Ils en tirent un flim neuf : un hommage à{" "}
            <cite>Citizen Kane</cite>.
          </p>
          <p>
            Diffusé une seule fois sur Canal+, le 31 décembre 1993. Le flim survit en VHS copiées entre amis, puis sur
            internet. Rediffusé sur Festival en 2004. Projeté au Centre Pompidou le 11 avril 2009, au festival Hors
            Pistes, en présence des deux auteurs.
          </p>
        </div>
        <h3 className={styles.h3}>Les films détournés</h3>
        <ul className={styles.cans} aria-label="Quelques films détournés, par année">
          {SOURCE_FILMS.map((f) => (
            <li key={f.title} className={styles.can}>
              <span className={styles.canYear}>{f.year}</span>
              <cite className={styles.canTitle} lang="en">
                {f.title}
              </cite>
              {f.frenchTitle && <span className={styles.canFr}>{f.frenchTitle}</span>}
            </li>
          ))}
          <li className={[styles.can, styles.canMore].join(" ")}>
            <span className={styles.canYear}>1952–1980</span>
            <span className={styles.canTitle}>et bien d&apos;autres</span>
          </li>
        </ul>
        {links.length > 0 && (
          <ul className={styles.bonus}>
            {links.map((l) => (
              <li key={l.url}>
                <a href={l.url} rel="noopener" target="_blank">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Chapter>
  );
}
