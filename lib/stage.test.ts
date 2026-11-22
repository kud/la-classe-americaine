import { describe, expect, it } from "vitest";
import { createStage, timeline, entracteTimeline, TIMING, type StageLine } from "./stage";

type C = "george" | "patron" | "welles" | "dave";

const pools: Record<C, StageLine[]> = {
  george: [
    { kind: "quote", text: "Monde de merde." },
    { kind: "quote", text: "Tu baises les ménagères ? c'est bien, tu dois avoir le cul qui brille !" },
    { kind: "quote", text: "Une troisième réplique de test." },
  ],
  patron: [{ kind: "silence", text: "[Le patron veut savoir.]" }],
  welles: [{ kind: "quote", text: "Les voleurs et les fils de pute." }],
  dave: [],
};

function setup(env = {}) {
  let t = 0;
  const clock = {
    now: () => t,
    advance: (ms: number) => {
      t += ms;
    },
  };
  const stage = createStage<C>({
    now: clock.now,
    random: () => 0,
    pools,
    chapterSpeakers: { redaction: "patron", pieces: "george", detournement: "welles" },
    idleSpeaker: "george",
    env,
  });
  return { stage, clock };
}

/** Let an appearance play out and leave the stage. */
function finish(s: ReturnType<typeof setup>) {
  const a = s.stage.current!;
  s.clock.advance(a.timeline.total);
  s.stage.end(a.id);
}

describe("one talking thing at a time", () => {
  it("drops anything that arrives while something is on stage, never queues it", () => {
    const s = setup();
    const first = s.stage.request({ kind: "witness", character: "george" });
    expect(first).not.toBeNull();
    expect(s.stage.request({ kind: "witness", character: "welles" })).toBeNull();
    expect(s.stage.lastDrop).toBe("busy");
    expect(s.stage.request({ kind: "chapter", chapter: "pieces" })).toBeNull();
    expect(s.stage.request({ kind: "idle" })).toBeNull();
    s.clock.advance(first!.timeline.total);
    s.stage.end(first!.id);
    // the dropped chapter trigger was not queued: nothing is on stage now
    expect(s.stage.current).toBeNull();
    // and it can still fire later, since it never ran
    expect(s.stage.request({ kind: "chapter", chapter: "pieces" })).not.toBeNull();
  });

  it("ignores a stale end() for an appearance that already left", () => {
    const s = setup();
    const a = s.stage.request({ kind: "witness", character: "george" })!;
    s.stage.end(a.id);
    const b = s.stage.request({ kind: "witness", character: "welles" })!;
    s.stage.end(a.id);
    expect(s.stage.current?.id).toBe(b.id);
  });

  it("never holds two appearances across a long random sequence of triggers", () => {
    const s = setup();
    const triggers = [
      { kind: "idle" as const },
      { kind: "entracte" as const },
      { kind: "witness" as const, character: "george" as const },
      { kind: "chapter" as const, chapter: "pieces" },
      { kind: "cue" as const, character: "george" as const, text: "Monde de merde." },
    ];
    let onStage = 0;
    for (let i = 0; i < 500; i++) {
      const a = s.stage.request(triggers[i % triggers.length]);
      if (a) onStage++;
      expect(onStage).toBeLessThanOrEqual(1);
      s.clock.advance(700);
      if (i % 7 === 0 && s.stage.current) {
        s.stage.end(s.stage.current.id);
        onStage = 0;
      }
    }
  });
});

describe("chapter triggers (a)", () => {
  it("fire once per chapter, with the chapter's natural speaker", () => {
    const s = setup();
    const a = s.stage.request({ kind: "chapter", chapter: "detournement" });
    expect(a?.type === "doublage" && a.character).toBe("welles");
    finish(s);
    expect(s.stage.request({ kind: "chapter", chapter: "detournement" })).toBeNull();
    expect(s.stage.lastDrop).toBe("chapter-seen");
  });

  it("use the silence caption when the speaker has no verified line", () => {
    const s = setup();
    const a = s.stage.request({ kind: "chapter", chapter: "redaction" });
    expect(a?.type === "doublage" && a.line).toEqual({ kind: "silence", text: "[Le patron veut savoir.]" });
  });

  it("ignore chapters without a speaker", () => {
    const s = setup();
    expect(s.stage.request({ kind: "chapter", chapter: "temoins" })).toBeNull();
    expect(s.stage.lastDrop).toBe("chapter-unknown");
  });

  it("are silenced by « Les témoins se taisent »", () => {
    const s = setup({ auto: false });
    expect(s.stage.request({ kind: "chapter", chapter: "pieces" })).toBeNull();
    expect(s.stage.lastDrop).toBe("auto-off");
    // the reader can still make a witness speak
    expect(s.stage.request({ kind: "witness", character: "george" })).not.toBeNull();
  });
});

describe("idle triggers (b)", () => {
  it("become due after 25 s without activity, not before", () => {
    const s = setup();
    s.clock.advance(24_999);
    expect(s.stage.due()).toBeNull();
    s.clock.advance(1);
    expect(s.stage.due()).toEqual({ kind: "idle" });
  });

  it("reset with activity", () => {
    const s = setup();
    s.clock.advance(20_000);
    s.stage.activity();
    s.clock.advance(20_000);
    expect(s.stage.due()).toBeNull();
  });

  it("fire at most once per idle stretch", () => {
    const s = setup();
    s.clock.advance(25_000);
    expect(s.stage.request(s.stage.due()!)).not.toBeNull();
    finish(s);
    s.clock.advance(30_000);
    expect(s.stage.due()).toBeNull();
    s.clock.advance(35_000);
    // still idle, but this stretch already had its line; next due is the entracte at 90 s
    expect(s.stage.due()).toEqual({ kind: "entracte" });
  });

  it("are capped at 3 per visit and kept 60 s apart", () => {
    const s = setup();
    const fire = () => {
      s.stage.activity();
      s.clock.advance(25_000);
      return s.stage.request({ kind: "idle" });
    };
    expect(fire()).not.toBeNull();
    finish(s);
    // only ~28 s later: too soon
    expect(fire()).toBeNull();
    expect(s.stage.lastDrop).toBe("idle-gap");
    s.clock.advance(40_000);
    expect(s.stage.request({ kind: "idle" })).not.toBeNull();
    finish(s);
    s.clock.advance(60_000);
    expect(fire()).not.toBeNull();
    finish(s);
    s.clock.advance(60_000);
    expect(fire()).toBeNull();
    expect(s.stage.lastDrop).toBe("idle-cap");
    expect(s.stage.idleCount).toBe(3);
    expect(s.stage.due()).toBeNull();
  });

  it("are off under reduced motion", () => {
    const s = setup({ reducedMotion: true });
    s.clock.advance(25_000);
    expect(s.stage.request({ kind: "idle" })).toBeNull();
    expect(s.stage.lastDrop).toBe("idle-reduced-motion");
  });
});

describe("phones", () => {
  it("allow at most one automatic appearance per 45 s", () => {
    const s = setup({ phone: true });
    expect(s.stage.request({ kind: "chapter", chapter: "redaction" })).not.toBeNull();
    finish(s);
    s.clock.advance(10_000);
    expect(s.stage.request({ kind: "chapter", chapter: "pieces" })).toBeNull();
    expect(s.stage.lastDrop).toBe("phone-gap");
    // a dropped chapter is not marked seen
    s.clock.advance(45_000);
    expect(s.stage.request({ kind: "chapter", chapter: "pieces" })).not.toBeNull();
  });

  it("never limit the reader's own taps", () => {
    const s = setup({ phone: true });
    s.stage.request({ kind: "chapter", chapter: "redaction" });
    finish(s);
    expect(s.stage.request({ kind: "witness", character: "welles" })).not.toBeNull();
  });
});

describe("le projectionniste (I-4)", () => {
  it("is due after 90 s idle, once per visit", () => {
    const s = setup({ reducedMotion: true }); // no idle Doublage in the way
    s.clock.advance(90_000);
    expect(s.stage.due()).toEqual({ kind: "entracte" });
    const a = s.stage.request({ kind: "entracte" });
    expect(a?.type).toBe("entracte");
    finish(s);
    s.clock.advance(200_000);
    expect(s.stage.request({ kind: "entracte" })).toBeNull();
    expect(s.stage.lastDrop).toBe("entracte-seen");
  });

  it("waits until nobody has talked for 60 s", () => {
    const s = setup();
    s.stage.request({ kind: "witness", character: "george" });
    finish(s);
    s.clock.advance(30_000);
    expect(s.stage.request({ kind: "entracte" })).toBeNull();
    expect(s.stage.lastDrop).toBe("entracte-recent-talk");
    s.clock.advance(40_000);
    expect(s.stage.request({ kind: "entracte" })).not.toBeNull();
  });
});

describe("lines", () => {
  it("never repeat until the pool is exhausted", () => {
    const s = setup();
    const said: string[] = [];
    for (let i = 0; i < 6; i++) {
      const a = s.stage.request({ kind: "witness", character: "george" });
      if (a?.type === "doublage") said.push(a.line.text);
      finish(s);
    }
    expect(new Set(said.slice(0, 3)).size).toBe(3);
    expect(new Set(said.slice(3, 6)).size).toBe(3);
  });

  it("drop a trigger whose pool is empty", () => {
    const s = setup();
    expect(s.stage.request({ kind: "witness", character: "dave" })).toBeNull();
    expect(s.stage.lastDrop).toBe("empty-pool");
  });

  it("let a page cue an exact line (the 404)", () => {
    const s = setup();
    const a = s.stage.request({ kind: "cue", character: "george", text: "Monde de merde." });
    expect(a?.type === "doublage" && a.line.text).toBe("Monde de merde.");
  });
});

describe("timings (§4.1)", () => {
  it("slide 260 ms, beat 450 ms, 55 ms per word, hold 1.2 s + 60 ms per word, exit 200 ms", () => {
    const t = timeline("Monde de merde.", false);
    expect(t).toMatchObject({ enter: 260, beat: 450, perWord: 55, reveal: 165, hold: 1_380, exit: 200 });
    expect(t.total).toBe(260 + 450 + 165 + 1_380 + 200);
  });

  it("cap the hold at 6 s", () => {
    const long = Array.from({ length: 200 }, () => "mot").join(" ");
    expect(timeline(long, false).hold).toBe(TIMING.holdMax);
  });

  it("under reduced motion: a 150 ms fade, no beat, the line shown whole", () => {
    const t = timeline("Monde de merde.", true);
    expect(t).toMatchObject({ enter: 150, beat: 0, perWord: 0, reveal: 0, exit: 150 });
    expect(entracteTimeline(true).enter).toBe(150);
  });
});

describe("French typography", () => {
  it("keeps a narrow no-break space with its word", () => {
    expect(timeline("Attention ! ce flim", false).reveal).toBe(3 * TIMING.perWord);
  });
});
