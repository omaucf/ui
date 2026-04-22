import en from "@veehance/core/locale/en";

import type { Accessor } from "#build/ui/types";

import { createContext } from "$lib/utils/context.js";

import type { LocaleContext } from "./locale.types.js";

export const DEFAULT_LOCALE = () => en;

export const [LocaleContextProvider, useLocaleContext] = createContext<
  Accessor<LocaleContext>
>({
  defaultValue: DEFAULT_LOCALE,
  hookName: "useLocaleContext",
  name: "LocaleContext",
  providerName: "LocaleProvider",
  strict: false,
});
