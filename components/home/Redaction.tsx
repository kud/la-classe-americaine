import { still } from "@/content/stills";
import { Chapter } from "../Chapter";
import { Pron } from "../Pron";
import { Still } from "../Still";
import { TypewriterTicks } from "./TypewriterTicks";
import styles from "./home.module.css";

/** 2 · La Rédaction: the editor gives the assignment. */
export function Redaction() {
  const ids = [
    { still: still("dave-card"), name: <>Dave</>, actor: "Paul Newman", note: null },
    { still: still("peter-card"), name: <Pron who="peter" />, actor: "Dustin Hoffman", note: "prononcé « Pétaire », et non pas « Piteur »" },
    { still: still("steven-card"), name: <Pron who="steven" />, actor: "Robert Redford", note: "prononcé « Stévaine », et non pas « Stiveun »" },
  ];
  return (
    <Chapter id="redaction" room="paper" labelledBy="redaction-titre" cue className={styles.chapter}>
      <div className="wrap">
        <p className="kicker">Chapitre 2 · La rédaction</p>
        <h2 id="redaction-titre" className={styles.h2} tabIndex={-1}>
          Une enquête sur deux mots.
        </h2>
        <div className={styles.desk}>
          <TypewriterTicks>
            <article className={styles.memo} aria-label="Note de service">
              <p className={styles.memoHead}>NOTE DE SERVICE</p>
              <p className={styles.memoMeta}>
                À : Dave, <Pron who="peter" />, <Pron who="steven" />
                <br />
                Objet : Abitbol, George
              </p>
              <p>« Monde de merde. » Je veux savoir ce que ça veut dire.</p>
              <p>
                Dave, vous êtes sur le coup. Vous travaillerez avec <Pron who="peter" /> et <Pron who="steven" />.
              </p>
              <p className={styles.memoSign}>— Le patron</p>
            </article>
          </TypewriterTicks>
          <ul className={styles.ids} aria-label="Les trois journalistes">
            {ids.map((p) => (
              <li key={p.actor} className={styles.idCard}>
                <Still still={p.still} sizes="(min-width: 760px) 200px, 30vw" variant="pinned" caption />
                <p className={styles.idName}>{p.name}</p>
                <p className={styles.idMeta}>
                  {p.actor}
                  {p.note && <span className={styles.idNote}> · {p.note}</span>}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <p className={styles.you}>Et vous, vous êtes le quatrième. Prenez un carnet.</p>
      </div>
    </Chapter>
  );
}
