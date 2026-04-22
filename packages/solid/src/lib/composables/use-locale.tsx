import type {
  Accessor,
  Locale,
  MaybeAccessor,
  Messages,
  Translator,
} from "#build/ui/types";

import { get, isFunction } from "radashi";

import { useLocaleContext } from "@/providers/locale/index.js";

export const useLocale = (
  localeOverrides?: MaybeAccessor<Locale<Messages>>
) => {
  const locale = localeOverrides
    ? // biome-ignore lint/style/noNestedTernary: safe_to_set
      isFunction(localeOverrides)
      ? localeOverrides
      : () => localeOverrides
    : useLocaleContext();

  return createLocale<Messages>(locale);
};

function createLocale<M>(locale: Accessor<Locale<M>>) {
  return {
    code: () => locale().code,
    dir: () => locale().dir,
    lang: () => locale().name,
    t: createTranslator(locale),
  };
}

function createTranslator<M>(locale: Accessor<Locale<M>>): Translator {
  return (path, option) =>
    get(locale(), `messages.${path}`, path).replace(
      /\{(\w+)\}/g,
      (_, key) => `${option?.[key] ?? `{${key}}`}`
    );
}
