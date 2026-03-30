import type { ACCENT_KEYS, SHADE_KEYS } from "../constants/color.js";
import type { Prettify, Stringify } from "./abstract.js";
import type { Token } from "./schema.js";

export type Colors<T extends Color = Color> = Prettify<
  { [K in T]?: ColorAccent | ColorShade } & {
    neutral?: ColorNeutral | ColorShade;
  }
>;

export type Color = Stringify<Token["color"]>;

export type ColorAccent = Stringify<(typeof ACCENT_KEYS)[number]>;

export type ColorNeutral = Token["baseColor"];

export type ColorScale = (typeof SHADE_KEYS)[number];

export type ColorShade = Record<ColorScale, string>;
