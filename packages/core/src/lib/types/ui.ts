import type { DeepPartial, Id, MaybeString } from "./abstract.js";
import type { Component, Components } from "./component.js";
import type { ConfigInput, Feature, Schema, Token } from "./schema.js";

export type Color = MaybeString<Token["color"]>;
export type ColorAccent = MaybeString<Token["accent"]>;
export type ColorNeutral = MaybeString<Token["neutral"]>;
export type ColorShade = Record<Token["shade"], string>;
export type Colors<T extends Color = Color> = Id<
  { neutral?: ColorNeutral | ColorShade } & {
    [K in T]?: ColorAccent | ColorShade;
  }
>;

export type Icon = MaybeString<Token["icon"]>;
export type Iconset = Token["iconset"];
export type Icons<T extends Icon = Icon> = Id<
  Record<string, string> & { [K in T]?: string }
>;

export type FontProvider = NonNullable<Feature["fonts"]["provider"]>;
export type ImageProvider = NonNullable<Feature["image"]["provider"]>;

export type Options = Id<ConfigInput>;
export type PluginOptions = Id<Omit<Options, "target">>;

export type Router = boolean | Token["router"];
export type Target = Token["runtime"];

export type Theme = NonNullable<Feature["colorMode"]["fallback"]>;
export type ThemeMode = NonNullable<Feature["colorMode"]["preference"]>;

export type UI<
  T extends Record<PropertyKey, Component> = Record<PropertyKey, Component>,
  C extends Color = Color,
  I extends Icon = Icon,
> = DeepPartial<{
  colors: Colors<C>;
  components: Components<T>;
  icons: Icons<I>;
  strategy: Schema["ui"]["strategy"];
}>;
