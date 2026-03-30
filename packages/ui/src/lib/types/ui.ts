import type { DeepPartial } from "./abstract.js";
import type { Color, Colors } from "./color.js";
import type { Components } from "./component.js";
import type { Icon, Icons } from "./icon.js";
import type { Config, Schema, Token } from "./schema.js";

export type Options = DeepPartial<Config>;

export type Router = boolean | Token["router"] | null;

export interface Template {
  filename: string;
  getContents: (...args: any[]) => string;
  write?: boolean;
}

export type UI<
  T extends Record<string, any> = Record<string, any>,
  C extends Color = Color,
  I extends Icon = Icon,
> = DeepPartial<{
  colors: Colors<C>;
  components: Components<T>;
  icons: Icons<I>;
  tw: Schema["ui"]["tw"];
}>;
