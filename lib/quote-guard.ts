import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

/** Lower-case, unify apostrophes and spaces, strip punctuation that varies between sources. */
export function normalise(s: string): string {
  return s
    .toLowerCase()
    .replace(/[’‘`´]/g, "'")
    .replace(/[  ]/g, " ")
    .replace(/[«»"“”!?.,:;…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function contains(haystack: string, needle: string): boolean {
  const n = normalise(needle);
  return n.length > 0 && normalise(haystack).includes(n);
}

const SOURCE_EXT = /\.(ts|tsx|mjs|js|css|md|json|txt)$/;

/** Every source file a reader could end up seeing, minus the guard's own lists. */
export function publishedSources(root: string, dirs: string[], exclude: string[]): { path: string; text: string }[] {
  const out: { path: string; text: string }[] = [];
  const walk = (dir: string) => {
    let entries: string[] = [];
    try {
      entries = readdirSync(dir);
    } catch {
      return;
    }
    for (const name of entries) {
      const p = join(dir, name);
      const rel = relative(root, p);
      if (exclude.some((e) => rel === e || rel.startsWith(e + "/"))) continue;
      if (statSync(p).isDirectory()) walk(p);
      else if (SOURCE_EXT.test(name)) out.push({ path: rel, text: readFileSync(p, "utf8") });
    }
  };
  dirs.forEach((d) => walk(join(root, d)));
  return out;
}
