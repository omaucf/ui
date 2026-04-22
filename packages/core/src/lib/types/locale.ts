import type { MaybeString } from "./abstract.js";

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
  header: {
    close: string;
    description?: string;
    open: string;
    title?: string;
  };
}

export type MessageKeys = Keys<Messages>;

export type TranslatorOption = Record<string, string | number>;

export type Translator = (
  path: MaybeString<MessageKeys>,
  option?: TranslatorOption
) => string;

type Join<K extends string, P extends string> = P extends "" ? K : `${K}.${P}`;

type Keys<T> = {
  [K in keyof T & string]: T[K] extends string
    ? K
    : T[K] extends Record<string, any>
      ? Join<K, Keys<T[K]>>
      : never;
}[keyof T & string];
