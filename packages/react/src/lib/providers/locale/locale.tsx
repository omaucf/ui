"use client";

import type { LocaleProviderProps } from "./locale.types";
import { LocaleContextProvider } from "./use-locale-context";

function LocaleProvider({ children, value }: LocaleProviderProps) {
  return (
    <LocaleContextProvider value={value!}>{children}</LocaleContextProvider>
  );
}

export default LocaleProvider;
