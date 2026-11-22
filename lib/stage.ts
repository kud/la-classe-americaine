/**
 * The stage (§4): one talking thing at a time.
 *
 * A pure scheduler for I-2 (Le Doublage), I-3 (Témoin parle) and I-4 (Le
 * projectionniste). It holds no timers and touches no DOM: the React provider
 * feeds it the clock, the environment and the triggers, and renders whatever
 * it lets on stage. Anything that arrives while something is on stage is
 * dropped, never queued.
 */

export type ChapterId = string;

export type Trigger<C extends string = string> =
  /** (a) a chapter first scrolls 40 % into view, once per chapter */
  | { kind: "chapter"; chapter: ChapterId }
  /** (b) idle 25 s, at most 3 per visit, 60 s apart */
  | { kind: "idle" }
  /** (c) / I-3: hover 600 ms, focus, tap or Enter on a witness card */
  | { kind: "witness"; character: C }
  /** I-4: idle 90 s, once per visit, only if nobody talked in 60 s */
  | { kind: "entracte" }
  /** A page asks for a specific line (the 404). */
  | { kind: "cue"; character: C; text?: string };

export interface StageLine {
  kind: "quote" | "silence";
  text: string;
  slug?: string;
}

export interface Timeline {
  /** Entry: the still dissolves in (400 ms); under reduced motion, a 150 ms fade. */
  enter: number;
  /** The dub's beat of silence before the subtitle. */
  beat: number;
  /** Words per subtitle group (real subtitles arrive in groups, not letters). */
  groupSize: number;
  /** Number of groups in the line. */
  groups: number;
  /** Step between groups (0 under reduced motion: the line is shown whole). */
  perGroup: number;
  /** Time to reveal every group. */
  reveal: number;
  /** Hold once fully revealed: 1.2 s + 60 ms per word, capped at 6 s. */
  hold: number;
  /** Exit: a slow 700 ms fade-out, or 150 ms under reduced motion. */
  exit: number;
  /** enter + beat + reveal + hold + exit */
  total: number;
}

export type Appearance<C extends string = string> =
  | {
      id: number;
      type: "doublage";
      trigger: Trigger<C>;
      character: C;
      line: StageLine;
      timeline: Timeline;
      startedAt: number;
    }
  | { id: number; type: "entracte"; trigger: Trigger<C>; timeline: Timeline; startedAt: number };

export interface StageEnv {
  /** prefers-reduced-motion: reduce */
  reducedMotion: boolean;
  /** viewport under 760 px */
  phone: boolean;
  /** « Les témoins se taisent » is off (automatic triggers allowed) */
  auto: boolean;
}

export interface StageConfig {
  idleAfter: number;
  idleMax: number;
  idleGap: number;
  entracteAfter: number;
  entracteQuiet: number;
  phoneAutoGap: number;
}

export const STAGE_CONFIG: StageConfig = {
  idleAfter: 25_000,
  idleMax: 3,
  idleGap: 60_000,
  entracteAfter: 90_000,
  entracteQuiet: 60_000,
  phoneAutoGap: 45_000,
};

/**
 * Round 1 (Erwann, 2026-11-22): « un truc qui parle en fondu ». The Doublage
 * dissolves in and out instead of sliding, and the subtitle arrives in word
 * groups. The beat of silence and the hold are the spec's.
 */
export const TIMING = {
  enter: 400,
  beat: 450,
  groupSize: 3,
  perGroup: 240,
  holdBase: 1_200,
  holdPerWord: 60,
  holdMax: 6_000,
  exit: 700,
  reducedFade: 150,
  entracteHold: 6_000,
} as const;

export function wordCount(text: string): number {
  // split on ordinary spaces only: a narrow no-break space keeps « ! » with its word
  return text.trim().split(/[ \t\n]+/).filter(Boolean).length;
}

export function timeline(text: string, reducedMotion: boolean): Timeline {
  const words = wordCount(text);
  const groups = Math.ceil(words / TIMING.groupSize);
  const hold = Math.min(TIMING.holdMax, TIMING.holdBase + TIMING.holdPerWord * words);
  const groupSize = TIMING.groupSize;
  if (reducedMotion) {
    const t = { enter: TIMING.reducedFade, beat: 0, groupSize, groups, perGroup: 0, reveal: 0, hold, exit: TIMING.reducedFade };
    return { ...t, total: t.enter + t.hold + t.exit };
  }
  const reveal = TIMING.perGroup * groups;
  const t = { enter: TIMING.enter, beat: TIMING.beat, groupSize, groups, perGroup: TIMING.perGroup, reveal, hold, exit: TIMING.exit };
  return { ...t, total: t.enter + t.beat + t.reveal + t.hold + t.exit };
}

export function entracteTimeline(reducedMotion: boolean): Timeline {
  const enter = reducedMotion ? TIMING.reducedFade : TIMING.enter;
  const exit = reducedMotion ? TIMING.reducedFade : TIMING.exit;
  const hold = TIMING.entracteHold;
  return { enter, beat: 0, groupSize: 0, groups: 0, perGroup: 0, reveal: 0, hold, exit, total: enter + hold + exit };
}

export interface StageOptions<C extends string> {
  now: () => number;
  random?: () => number;
  pools: Record<C, StageLine[]>;
  /** Natural speaker per chapter (chapter 2 → le patron, 4 → George, 6 → Orson Welles). */
  chapterSpeakers: Record<ChapterId, C>;
  /** Who speaks on an idle trigger. */
  idleSpeaker: C;
  env?: Partial<StageEnv>;
  config?: Partial<StageConfig>;
}

export type Drop =
  | "busy"
  | "auto-off"
  | "chapter-seen"
  | "chapter-unknown"
  | "idle-cap"
  | "idle-gap"
  | "idle-reduced-motion"
  | "phone-gap"
  | "entracte-seen"
  | "entracte-recent-talk"
  | "empty-pool";

export function createStage<C extends string>(opts: StageOptions<C>) {
  const random = opts.random ?? Math.random;
  const config: StageConfig = { ...STAGE_CONFIG, ...opts.config };
  let env: StageEnv = { reducedMotion: false, phone: false, auto: true, ...opts.env };

  let current: Appearance<C> | null = null;
  let nextId = 1;
  const seenChapters = new Set<ChapterId>();
  let idleCount = 0;
  let lastIdleAt = -Infinity;
  let lastTalkAt = -Infinity;
  let lastAutoAt = -Infinity;
  let lastActivityAt = opts.now();
  let idleFiredThisStretch = false;
  let entracteShown = false;
  const used = new Map<C, Set<string>>();
  let lastDrop: Drop | null = null;

  function pick(character: C): StageLine | null {
    const pool = opts.pools[character] ?? [];
    if (pool.length === 0) return null;
    let seen = used.get(character);
    if (!seen || seen.size >= pool.length) {
      seen = new Set();
      used.set(character, seen);
    }
    const left = pool.filter((l) => !seen!.has(l.text));
    const line = left[Math.min(left.length - 1, Math.floor(random() * left.length))];
    seen.add(line.text);
    return line;
  }

  function drop(reason: Drop): null {
    lastDrop = reason;
    return null;
  }

  function isAutomatic(t: Trigger<C>) {
    return t.kind === "chapter" || t.kind === "idle" || t.kind === "entracte";
  }

  function request(trigger: Trigger<C>): Appearance<C> | null {
    const now = opts.now();
    if (current) return drop("busy");

    if (isAutomatic(trigger)) {
      if (!env.auto) return drop("auto-off");
      if (env.phone && trigger.kind !== "entracte" && now - lastAutoAt < config.phoneAutoGap) return drop("phone-gap");
    }

    let character: C;
    let line: StageLine | null = null;

    switch (trigger.kind) {
      case "chapter": {
        if (seenChapters.has(trigger.chapter)) return drop("chapter-seen");
        const speaker = opts.chapterSpeakers[trigger.chapter];
        if (!speaker) return drop("chapter-unknown");
        seenChapters.add(trigger.chapter);
        character = speaker;
        break;
      }
      case "idle": {
        if (env.reducedMotion) return drop("idle-reduced-motion");
        if (idleCount >= config.idleMax) return drop("idle-cap");
        if (now - lastIdleAt < config.idleGap) return drop("idle-gap");
        character = opts.idleSpeaker;
        break;
      }
      case "entracte": {
        if (entracteShown) return drop("entracte-seen");
        if (now - lastTalkAt < config.entracteQuiet) return drop("entracte-recent-talk");
        entracteShown = true;
        lastAutoAt = now;
        current = {
          id: nextId++,
          type: "entracte",
          trigger,
          timeline: entracteTimeline(env.reducedMotion),
          startedAt: now,
        };
        lastDrop = null;
        return current;
      }
      case "witness":
        character = trigger.character;
        break;
      case "cue":
        character = trigger.character;
        if (trigger.text) line = { kind: "quote", text: trigger.text };
        break;
    }

    line = line ?? pick(character);
    if (!line) return drop("empty-pool");

    if (trigger.kind === "idle") {
      idleCount++;
      lastIdleAt = now;
      idleFiredThisStretch = true;
    }
    if (isAutomatic(trigger)) lastAutoAt = now;
    lastTalkAt = now;
    lastDrop = null;
    current = {
      id: nextId++,
      type: "doublage",
      trigger,
      character,
      line,
      timeline: timeline(line.text, env.reducedMotion),
      startedAt: now,
    };
    return current;
  }

  return {
    request,
    /** Something left the stage (timer ran out, ✕, Escape, tap outside). */
    end(id: number) {
      if (current && current.id === id) current = null;
    },
    /** Scroll, pointer or key: the reader is here. */
    activity() {
      lastActivityAt = opts.now();
      idleFiredThisStretch = false;
    },
    /**
     * Called on a slow tick; returns the idle trigger that is due, if any.
     * One idle Doublage per idle stretch; the entracte after 90 s.
     */
    due(): Trigger<C> | null {
      if (current) return null;
      const idleFor = opts.now() - lastActivityAt;
      if (idleFor >= config.entracteAfter && !entracteShown) return { kind: "entracte" };
      if (idleFor >= config.idleAfter && !idleFiredThisStretch && idleCount < config.idleMax) return { kind: "idle" };
      return null;
    },
    setEnv(next: Partial<StageEnv>) {
      env = { ...env, ...next };
    },
    get env() {
      return env;
    },
    get current() {
      return current;
    },
    get lastDrop() {
      return lastDrop;
    },
    get idleCount() {
      return idleCount;
    },
  };
}

export type Stage<C extends string = string> = ReturnType<typeof createStage<C>>;
