"use client";

import { ColorModeProvider } from "../color-mode";
import { EnvironmentProvider } from "../environment";
import { LocaleProvider } from "../locale";
import type { AppProviderProps } from "./app.types";

function AppProvider({
  children,
  colorMode,
  environment,
  locale,
}: AppProviderProps) {
  return (
    <EnvironmentProvider value={environment}>
      <LocaleProvider value={locale}>
        <ColorModeProvider value={colorMode}>{children}</ColorModeProvider>
      </LocaleProvider>
    </EnvironmentProvider>
  );
}

export default AppProvider;
