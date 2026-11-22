import type { CharacterId } from "./characters";
import generated from "./stills.generated.json";
import { STILLS, type StillSpec } from "./stills.data";

export * from "./stills.data";

export interface GeneratedStill {
  src: string;
  width: number;
  height: number;
  blurDataURL: string;
}

const GENERATED = generated as Record<string, GeneratedStill>;

export interface Still extends StillSpec, GeneratedStill {}

export function still(id: string): Still {
  const spec = STILLS.find((s) => s.id === id);
  const gen = GENERATED[id];
  if (!spec || !gen) throw new Error(`Still « ${id} » is not declared or not generated (npm run stills).`);
  return { ...spec, ...gen };
}

/** The card still for a character, if one exists. */
export function cardStill(character: CharacterId): Still | null {
  const id = `${character}-card`;
  return STILLS.some((s) => s.id === id) && GENERATED[id] ? still(id) : null;
}

export const STILL_CREDIT = "Image : La Classe Américaine, 1993 · © Warner Bros., Canal+";
