import type { Locale, Messages, Translator } from "@veehance/core/types";

import { get } from "radashi";

import {
  type LocaleContext,
  useLocaleContext,
} from "@/providers/locale/index.js";

export const useLocale = (localeOverrides?: LocaleContext) => {
  const locale = localeOverrides ? localeOverrides : useLocaleContext();
  return createLocale<Messages>(locale);
};

function createLocale<M>({ code, dir, name, messages }: Locale<M>) {
  return {
    code,
    dir,
    lang: name,
    t: createTranslator({ code, dir, messages, name }),
  };
}

function createTranslator<M>(locale: Locale<M>): Translator {
  return (path, option) =>
    get(locale, `messages.${path}`, path).replace(
      /\{(\w+)\}/g,
      (_, key) => `${option?.[key] ?? `{${key}}`}`
    );
}
