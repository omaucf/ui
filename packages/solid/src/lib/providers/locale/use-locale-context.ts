import en from "@veehance/core/locale/en";

import type { Accessor } from "#build/ui/types";

import { createContext } from "@/utils/context.js";

import type { LocaleContext } from "./locale.types.js";

export const DEFAULT_LOCALE = () => en;

export const [LocaleContextProvider, useLocaleContext] = createContext<
  Accessor<LocaleContext>
>({
  defaultValue: DEFAULT_LOCALE,
  hookName: "useLocaleContext",
  providerName: "<LocaleProvider />",
  strict: false,
});
