import { defu } from "defu";

import type { DeepPartial } from "../types/abstract.js";
import type { Locale, LocaleOptions } from "../types/locale.js";

export function defineLocale<M>(options: LocaleOptions<M>) {
  return defu(options, { dir: "ltr" as const }) as Locale<M>;
}

export function extendLocale<M>(
  locale: Locale<M>,
  options: DeepPartial<LocaleOptions<M>>
) {
  return defu(options, locale) as Locale<M>;
}
