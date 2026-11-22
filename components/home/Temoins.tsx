import { WITNESSES, publishedVoice } from "@/content/characters";
import { cardStill } from "@/content/stills";
import { Chapter } from "../Chapter";
import { WitnessRow, type WitnessCard } from "./WitnessRow";
import styles from "./home.module.css";

/** 3 · Les Témoins: everyone who knew George. Each card makes its witness speak (I-3). */
export function Temoins() {
  const cards: WitnessCard[] = WITNESSES.map((c) => ({
    id: c.id,
    name: c.name,
    actor: c.actor ?? null,
    voice: publishedVoice(c),
    note: c.note ?? "",
    still: cardStill(c.id),
  }));
  return (
    <Chapter id="temoins" room="screen" labelledBy="temoins-titre" enter="dissolve" className={styles.chapter}>
      <div className="wrap">
        <p className="kicker">Chapitre 3 · Les témoins</p>
        <h2 id="temoins-titre" className={styles.h2}>
          Ils l&apos;ont connu au Texas.
        </h2>
        <p className={styles.lede}>Touchez un témoin pour l&apos;entendre. En version française, évidemment.</p>
        <WitnessRow cards={cards} />
      </div>
    </Chapter>
  );
}
