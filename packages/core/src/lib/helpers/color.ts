import { COLOR_KEYS } from "../constants/ui.js";
import { default as defaults } from "../defaults.js";
import type { ColorNeutral, Colors } from "../types/color.js";
import { pick } from "../utils/object.js";

export function defineColors(
  baseColor: ColorNeutral = defaults.tailwind.baseColor,
  components: string[] = COLOR_KEYS as unknown as string[]
) {
  return pick({ ...defaults.ui.colors, neutral: baseColor } as Colors<any>, [
    ...components,
    "neutral",
  ]);
}

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set(["primary", ...colors])]
    : (COLOR_KEYS as unknown as string[]);
}
