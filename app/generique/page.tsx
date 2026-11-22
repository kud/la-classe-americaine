import type { Metadata } from "next";
import { publishedCredits, publishedVoices, ON_SCREEN } from "@/content/credits";
import { SOURCE_FILMS } from "@/content/films";
import { STILLS, MISSING_STILLS, STILL_CREDIT } from "@/content/stills";
import { CHARACTERS } from "@/content/characters";
import { PageHeader } from "@/components/PageHeader";
import styles from "./generique.module.css";

export const metadata: Metadata = {
  title: "Le générique",
  description: "Le générique de La Classe Américaine, les voix, les films détournés, les droits et l'histoire de ce site depuis 2011.",
};

export default function Generique() {
  const credits = publishedCredits();
  const voices = publishedVoices();
  return (
    <main id="contenu">
      <PageHeader kicker="Le dossier · Générique" title="Le générique." id="generique-titre">
        <p className={styles.lead}>
          <cite>La Classe Américaine — Le Grand Détournement</cite> (1993)
          <br />
          Un flim de Michel Hazanavicius et Dominique Mézerette
        </p>
      </PageHeader>

      <div className={["paper", styles.body].join(" ")}>
        <div className={["wrap", styles.columns].join(" ")}>
          <section aria-labelledby="fiche">
            <h2 id="fiche">Fiche technique</h2>
            <dl className={styles.dl}>
              {credits.map((c) => (
                <div key={c.role}>
                  <dt>{c.role}</dt>
                  <dd>{c.names.join(", ")}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="voix">
            <h2 id="voix">Les voix</h2>
            <dl className={styles.dl}>
              {voices.map((v) => (
                <div key={v.name}>
                  <dt>{v.name}</dt>
                  <dd>{v.roles.join(", ")}</dd>
                </div>
              ))}
            </dl>
            <p className={styles.note}>
              Le flim est redoublé par les voix françaises habituelles des stars ; les attributions se contredisent
              d&apos;une source à l&apos;autre. Ne figurent ici que celles qui sont attestées, en attendant une vérification sur le générique
              de fin.
            </p>
          </section>

          <section aria-labelledby="ecran">
            <h2 id="ecran">À l&apos;écran</h2>
            <p>
              Archives Warner Bros. : {ON_SCREEN.names.join(", ")}, et bien d&apos;autres.
            </p>
          </section>

          <section aria-labelledby="films">
            <h2 id="films">Les films détournés</h2>
            <ul className={styles.films}>
              {SOURCE_FILMS.map((f) => (
                <li key={f.title}>
                  <cite lang="en">{f.title}</cite> ({f.year}){f.frenchTitle ? <>, <cite>{f.frenchTitle}</cite></> : null}
                </li>
              ))}
            </ul>
            <p className={styles.note}>Une cinquantaine de films en tout, tournés entre 1952 et 1980. La liste complète viendra.</p>
          </section>

          <section aria-labelledby="images">
            <h2 id="images">Les images</h2>
            <p>{STILL_CREDIT}. Photogrammes extraits du flim, utilisés à titre d&apos;hommage.</p>
            <ul className={styles.films}>
              {STILLS.map((s) => (
                <li key={s.id}>
                  {CHARACTERS[s.character].name}, {s.scene.toLowerCase()}
                  {s.sourceFilm?.status === "attested" ? (
                    <>
                      {" "}
                      (<cite lang="en">{s.sourceFilm.title}</cite>)
                    </>
                  ) : null}
                </li>
              ))}
            </ul>
            <p className={styles.note}>
              Images provisoires, en basse définition, en attendant de meilleurs photogrammes. Sans image pour l&apos;instant :{" "}
              {MISSING_STILLS.map((m) => CHARACTERS[m.character].name).join(", ")}.
            </p>
          </section>

          <section aria-labelledby="droits" className={styles.rights}>
            <h2 id="droits">Droits</h2>
            <p>
              <cite>La Classe Américaine — Le Grand Détournement</cite> © Warner Bros., Canal+. Images et répliques
              extraites du flim, utilisées à titre d&apos;hommage. Ce site est un hommage non officiel, sans but commercial,
              fait par des fans ; il n&apos;est affilié ni à Warner Bros., ni à Canal+, ni aux auteurs.
            </p>
            <p>
              Ayants droit : une demande de retrait est traitée sans discussion,{" "}
              <a href="https://github.com/kud/la-classe-americaine/issues">par une demande sur le dépôt du site</a>.
            </p>
          </section>

          <section aria-labelledby="colophon">
            <h2 id="colophon">Colophon</h2>
            <p>
              Ce site existe depuis 2011. Première version : @_kud, design @usine_creative. Refait en 2026.
            </p>
            <p>
              Caractères : Bodoni Moda et Courier Prime (SIL Open Font License). Les sons, quand vous les allumez, sont
              synthétisés dans le navigateur : aucun extrait sonore du flim.
            </p>
            <p>Sources :</p>
            <ul className={styles.films}>
              <li>
                <a href="https://fr.wikipedia.org/wiki/La_Classe_am%C3%A9ricaine" hrefLang="fr">
                  Wikipédia
                </a>
              </li>
              <li>
                <a href="https://fr.wikiquote.org/wiki/La_Classe_am%C3%A9ricaine" hrefLang="fr">
                  Wikiquote
                </a>
              </li>
              <li>
                <a href="https://www.themoviedb.org/search?query=La%20Classe%20Am%C3%A9ricaine">TMDB</a>
              </li>
              <li>
                <a href="http://www.cyclim.se" hrefLang="fr">
                  cyclim.se
                </a>
                , le site des fans
              </li>
            </ul>
          </section>
        </div>
      </div>
    </main>
  );
}
