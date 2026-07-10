import type { MagicMapping } from "../types/magic";

const STORAGE_KEY = "magic-mapping";

export function loadMagicMapping(): MagicMapping | null {
  const json = localStorage.getItem(STORAGE_KEY);

  if (!json) {
    return null;
  }

  return JSON.parse(json);
}

export function saveMagicMapping(
  mapping: MagicMapping
) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(mapping)
  );
}
