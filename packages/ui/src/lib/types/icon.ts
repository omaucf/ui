import type { Prettify, Stringify } from "./abstract.js";
import type { Token } from "./schema.js";

export type Icons<T extends Icon = Icon> = Prettify<
  Record<string, string> & { [K in T]?: string }
>;

export type Icon = Stringify<Token["icon"]>;

export type Iconset = Token["iconset"];
