import { computed, isRef, type MaybeRef, type Ref, toRef } from "vue";

import type { Locale, Messages, Translator } from "#build/ui/types";

import { get } from "radashi";

import {
  type LocaleContext,
  useLocaleContext,
} from "@/providers/locale/index.js";

export const useLocale = (localeOverrides?: MaybeRef<LocaleContext>) => {
  const locale = localeOverrides
    ? // biome-ignore lint/style/noNestedTernary: safe_to_set
      isRef(localeOverrides)
      ? localeOverrides
      : toRef(() => localeOverrides)
    : useLocaleContext();

  return createLocale<Messages>(locale);
};

function createLocale<M>(locale: Ref<Locale<M>>) {
  return {
    code: computed(() => locale.value.code),
    dir: computed(() => locale.value.dir),
    lang: computed(() => locale.value.name),
    t: createTranslator(locale),
  };
}

function createTranslator<M>(locale: Ref<Locale<M>>): Translator {
  return (path, option) =>
    get(locale.value, `messages.${path}`, path).replace(
      /\{(\w+)\}/g,
      (_, key) => `${option?.[key] ?? `{${key}}`}`
    );
}
