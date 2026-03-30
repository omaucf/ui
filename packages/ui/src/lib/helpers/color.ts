import { pick } from "radash";

import { COLOR_KEYS } from "../constants/theme.js";
import { default as defaults } from "../defaults.js";
import type { ColorNeutral, Colors } from "../types/color.js";

export function defineColors(
  baseColor: ColorNeutral = "zinc",
  colors: string[] = COLOR_KEYS as unknown as string[]
) {
  return pick({ ...defaults.ui.colors, neutral: baseColor } as Colors, [
    ...colors,
    "neutral",
  ]);
}

export function resolveColors(colors?: string[]) {
  return colors?.length
    ? [...new Set(["primary", ...colors])]
    : (COLOR_KEYS as unknown as string[]);
}
