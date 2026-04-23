import type { Dict } from "./abstract.js";

export type Direction = "ltr" | "rtl";

export interface Locale<M> {
  code: string;
  dir: Direction;
  messages: M;
  name: string;
}

export interface LocaleOptions<M> {
  code: string;
  dir?: Direction;
  messages: M;
  name: string;
}

export interface Messages {
  colorMode: {
    dark: string;
    light: string;
    switchToDark: string;
    switchToLight: string;
    system: string;
  };
  error: {
    clear: string;
  };
}

export type Translator = (path: string, option?: TranslatorOption) => string;

export type TranslatorOption = Dict<string, string | number>;
