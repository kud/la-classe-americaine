/**
 * The build gate (§9). Runs before every `npm run build` (prebuild) and in CI.
 * It fails when a published quote or credit is not attested, when a banned or
 * pending (◌) line appears in published content or source, or when the pending
 * list leaks into a page. With QUOTE_GATE=film it also requires every published
 * quote and credit to be checked against the film itself.
 */
import { describe, expect, it } from "vitest";
import { resolve } from "node:path";
import { QUOTES, HOME_EVIDENCE, attributedSpeaker } from "@/content/quotes";
import { PENDING_QUOTES, BANNED_LINES } from "@/content/quotes.pending";
import { LINES } from "@/content/lines";
import { CHARACTERS, publishedVoice } from "@/content/characters";
import { publishedCredits, publishedVoices } from "@/content/credits";
import { REVIEWS } from "@/content/reviews";
import { STILLS } from "@/content/stills";
import { contains, publishedSources } from "./quote-guard";

const ROOT = resolve(import.meta.dirname, "..");
const STRICT = process.env.QUOTE_GATE === "film";

const GUARD_FILES = ["content/quotes.pending.ts", "lib/quote-guard.ts", "lib/quote-guard.test.ts"];
const sources = publishedSources(ROOT, ["app", "components", "content", "lib", "public"], [...GUARD_FILES, "public/stills"]);

const publishedTexts = [
  ...QUOTES.map((q) => q.text),
  ...Object.values(LINES).flatMap((pool) => pool.map((l) => l.text)),
  ...REVIEWS.map((r) => r.text),
  ...Object.values(CHARACTERS).flatMap((c) => [c.note ?? "", c.silence]),
  ...STILLS.map((s) => s.alt),
];

describe("published quotes", () => {
  it("are all attested (✓), wording included", () => {
    const bad = QUOTES.filter((q) => q.textStatus !== "attested").map((q) => q.slug);
    expect(bad, "quotes with uncertain wording must stay in quotes.pending.ts").toEqual([]);
  });

  it("only show a speaker when the attribution is attested", () => {
    for (const q of QUOTES) {
      expect(attributedSpeaker(q)).toBe(q.speakerStatus === "attested" ? q.speaker : null);
    }
  });

  it("have unique slugs and evidence numbers", () => {
    expect(new Set(QUOTES.map((q) => q.slug)).size).toBe(QUOTES.length);
    expect(new Set(QUOTES.map((q) => q.n)).size).toBe(QUOTES.length);
    for (const slug of HOME_EVIDENCE) expect(QUOTES.some((q) => q.slug === slug)).toBe(true);
  });

  it.runIf(STRICT)("are checked against the film (QUOTE_GATE=film)", () => {
    expect(QUOTES.filter((q) => !q.filmChecked).map((q) => q.slug)).toEqual([]);
  });
});

describe("the Doublage pools", () => {
  it("only speak attested lines from attested speakers, or a bracketed silence", () => {
    for (const [character, pool] of Object.entries(LINES)) {
      for (const line of pool) {
        if (line.kind === "silence") {
          expect(line.text).toMatch(/^\[.*\]$/);
          continue;
        }
        const q = QUOTES.find((x) => x.slug === line.slug);
        expect(q, `${character}: unknown quote ${line.slug}`).toBeDefined();
        expect(q!.speaker).toBe(character);
        expect(q!.speakerStatus).toBe("attested");
        expect(q!.textStatus).toBe("attested");
      }
    }
  });
});

describe("banned and pending lines", () => {
  it("never appear in published content", () => {
    for (const text of publishedTexts) {
      for (const banned of BANNED_LINES) expect(contains(text, banned), `banned « ${banned} » in « ${text} »`).toBe(false);
      for (const p of PENDING_QUOTES) expect(contains(text, p.text), `pending « ${p.text} » in « ${text} »`).toBe(false);
    }
  });

  it("never appear anywhere in app/, components/, content/, lib/ or public/", () => {
    expect(sources.length).toBeGreaterThan(10);
    const hits: string[] = [];
    for (const { path, text } of sources) {
      for (const banned of BANNED_LINES) if (contains(text, banned)) hits.push(`${path}: banned « ${banned} »`);
      for (const p of PENDING_QUOTES) if (p.text.length > 12 && contains(text, p.text)) hits.push(`${path}: pending « ${p.text} »`);
    }
    expect(hits).toEqual([]);
  });

  it("stay out of pages: nothing under app/ or components/ imports the pending list", () => {
    const leaks = sources
      .filter(({ path }) => path.startsWith("app/") || path.startsWith("components/"))
      .filter(({ text }) => /quotes\.pending/.test(text))
      .map(({ path }) => path);
    expect(leaks).toEqual([]);
  });

  it("use one spelling of the name: George Abitbol", () => {
    const hits = sources.filter(({ text }) => /Georges Abitbol/.test(text)).map(({ path }) => path);
    expect(hits).toEqual([]);
  });
});

describe("published credits", () => {
  it("are all attested", () => {
    expect(publishedCredits().every((c) => c.status === "attested")).toBe(true);
    expect(publishedVoices().every((v) => v.status === "attested")).toBe(true);
    for (const c of Object.values(CHARACTERS)) {
      const v = publishedVoice(c);
      if (v) expect(c.voice?.status).toBe("attested");
    }
  });

  it("reach pages only through the attested filters", () => {
    const raw = sources
      .filter(({ path }) => path.startsWith("app/") || path.startsWith("components/"))
      .filter(({ text }) => /\b(CREDITS|VOICES)\b/.test(text))
      .map(({ path }) => path);
    expect(raw).toEqual([]);
  });

  it.runIf(STRICT)("are checked against the end credits (QUOTE_GATE=film)", () => {
    expect([...publishedCredits(), ...publishedVoices()].filter((c) => !c.filmChecked)).toEqual([]);
  });
});
