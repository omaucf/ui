import {
  luma,
  lyra,
  maia,
  mira,
  nova,
  sera,
  vega,
} from "../../preset/index.js";
import { default as defaults } from "../defaults.js";
import type { Components } from "../types/component.js";
import type { Token } from "../types/schema.js";
import { mergeObject } from "./merge.js";

export const PRESET_MAP = {
  luma,
  lyra,
  maia,
  mira,
  nova,
  sera,
  vega,
} as const;

export function defineComponents(
  strategy: Token["strategy"] = defaults.tailwind.strategy,
  preset: Token["preset"] = defaults.theme.preset,
  components: Components<any> = {}
) {
  return mergeObject(
    strategy,
    components,
    PRESET_MAP[preset],
    defaults.ui.components
  );
}
