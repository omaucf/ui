import type { Snippet } from "svelte";

import type { Accessor, Theme, ThemeMode } from "#build/ui/types";

export interface ColorModeContext {
  mode: Accessor<Theme>;
  preference: Accessor<ThemeMode>;
  setTheme: (
    preference: ThemeMode | ((previous: ThemeMode) => ThemeMode)
  ) => void;
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
  children?: Snippet;
  value?: ColorModeValue;
}
