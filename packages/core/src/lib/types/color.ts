import type { Dict, Prettify, Stringify } from "./abstract.js";
import type { Token } from "./schema.js";

export type Colors<T extends Color = Color> = Prettify<
  { [K in T]?: ColorAccent | ColorShade } & {
    neutral?: ColorNeutral | ColorShade;
  }
>;

export type Color = Stringify<Token["color"]>;
export type ColorAccent = Stringify<Token["accent"]>;
export type ColorNeutral = Stringify<Token["neutral"]>;
export type ColorShade = Dict<Token["shade"], string>;
