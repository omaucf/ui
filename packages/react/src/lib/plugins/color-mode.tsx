import type { Theme } from "@veehance/core/types";

import { ThemeProvider } from "next-themes";

import appConfig from "#build/app.config";

export interface ColorModeProps {
  children?: React.ReactNode;
  value?: {
    defaultTheme?: Theme;
    disableTransition?: boolean;
    storageKey?: string;
  };
}

export function ColorMode({ children, value }: ColorModeProps) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme={
        value?.defaultTheme ?? (appConfig.colorMode ? "system" : "light")
      }
      disableTransitionOnChange={value?.disableTransition ?? true}
      enableSystem={appConfig.colorMode}
      storageKey={value?.storageKey}
    >
      {children}
    </ThemeProvider>
  );
}

export default ColorMode;
