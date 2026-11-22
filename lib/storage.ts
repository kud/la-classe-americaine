/** localStorage that never throws (private windows, blocked storage, previews). */
export function read(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function write(key: string, value: string | null): void {
  try {
    if (value === null) window.localStorage.removeItem(key);
    else window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable: the site still works, it just forgets */
  }
}

export const KEYS = {
  carton: "lca-carton",
  taisent: "lca-temoins-se-taisent",
} as const;
