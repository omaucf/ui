import { defu } from "defu";

import { luna, lyra, maia, mira, nova, vega } from "../../preset/index.js";
import { default as defaults } from "../defaults.js";
import type { Macro, Schema } from "../types/schema.js";

export const PRESET_MAP = {
  luna,
  lyra,
  maia,
  mira,
  nova,
  vega,
} as const;

export function defineComponents(preset?: Macro["preset"]) {
  const [key, overrides] = parsePreset(preset);
  return defu(overrides ?? {}, PRESET_MAP[key], {
    icon: { dynamic: false, size: 24 },
  }) as Schema["ui"]["components"];
}

function parsePreset(preset: Macro["preset"] = defaults.theme.preset) {
  return Array.isArray(preset) ? preset : ([preset, {}] as const);
}
