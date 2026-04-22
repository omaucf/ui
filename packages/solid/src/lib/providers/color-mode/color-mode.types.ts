import type { JSX, Setter } from "solid-js";

import type { Accessor, Theme, ThemeMode } from "#build/ui/types";

export interface ColorModeContext {
  mode: Accessor<Theme>;
  preference: Accessor<ThemeMode>;
  setTheme: Setter<ThemeMode>;
  systemTheme: Accessor<Theme>;
  themes: Accessor<string[]>;
}

export interface ColorModeValue {
  enableColorScheme?: boolean;
  enableSystem?: boolean;
  fallback?: Theme;
  preference?: ThemeMode;
  storageKey?: string;
}

export interface ColorModeProviderProps {
  children?: JSX.Element;
  value?: ColorModeValue;
}
