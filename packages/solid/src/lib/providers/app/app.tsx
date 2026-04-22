"use client";

import { ColorModeProvider } from "../color-mode";
import { EnvironmentProvider } from "../environment";
import { LocaleProvider } from "../locale";
import type { AppProviderProps } from "./app.types";

function AppProvider(props: AppProviderProps) {
  return (
    <EnvironmentProvider value={props.environment}>
      <LocaleProvider value={props.locale}>
        <ColorModeProvider value={props.colorMode}>
          {props.children}
        </ColorModeProvider>
      </LocaleProvider>
    </EnvironmentProvider>
  );
}

export default AppProvider;
