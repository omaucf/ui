import { defu } from "defu";

import {
  heroicons_outline,
  heroicons_solid,
  hugeicons,
  lucide,
  phosphor,
  tabler,
} from "../../iconset/index.js";
import { default as defaults } from "../defaults.js";
import type { Macro } from "../types/schema.js";

export const ICONSET_MAP = {
  "heroicons-outline": heroicons_outline,
  "heroicons-solid": heroicons_solid,
  hugeicons,
  lucide,
  phosphor,
  tabler,
} as const;

export function defineIcons(iconset?: Macro["iconset"]) {
  const [key, overrides] = parseIconset(iconset);
  return defu(overrides, ICONSET_MAP[key]);
}

function parseIconset(iconset: Macro["iconset"] = defaults.theme.iconset) {
  return Array.isArray(iconset) ? iconset : ([iconset, {}] as const);
}
