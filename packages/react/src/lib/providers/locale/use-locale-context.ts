"use client";

import en from "@veehance/core/locale/en";

import { createContext } from "@/utils/context.js";

import type { LocaleContext } from "./locale.types.js";

export const DEFAULT_LOCALE = en;

export const [LocaleContextProvider, useLocaleContext] =
  createContext<LocaleContext>({
    defaultValue: DEFAULT_LOCALE,
    hookName: "useLocaleContext",
    name: "LocaleContext",
    providerName: "<LocaleProvider />",
    strict: false,
  });
