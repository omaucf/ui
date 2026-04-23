import type { DeepPartial, Dict } from "./abstract.js";
import type { Color, Colors } from "./color.js";
import type { Components } from "./component.js";
import type { Icon, Icons } from "./icon.js";
import type { Config, Schema, Token } from "./schema.js";

export type Options = DeepPartial<Config>;

export type Router = boolean | Token["adapter"] | null;

export type Target = Token["runtime"];

export type Theme = ThemeMode | "system";

export type ThemeMode = "light" | "dark";

export type UI<
  T extends Dict<string> = Dict<string>,
  C extends Color = Color,
  I extends Icon = Icon,
> = DeepPartial<{
  colors: Colors<C>;
  components: Components<T>;
  icons: Icons<I>;
  tw: Schema["ui"]["tw"];
}>;
