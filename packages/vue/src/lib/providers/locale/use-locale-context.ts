import { type Ref, toRef } from "vue";

import en from "@veehance/core/locale/en";

import { createContext } from "@/utils/context";

import type { LocaleContext } from "./locale.types.js";

export const DEFAULT_LOCALE = toRef(() => en);

export const [LocaleContextProvider, useLocaleContext] = createContext<
  Ref<LocaleContext>
>({
  defaultValue: DEFAULT_LOCALE,
  name: "LocaleContext",
  strict: false,
});
