import type { ComputedRef, Ref } from "vue";

import type { Theme, ThemeMode } from "#build/ui/types";

export interface ColorModeContext {
  mode: ComputedRef<Theme>;
  preference: Ref<ThemeMode>;
  setTheme: (
    preference: ThemeMode | ((previous: ThemeMode) => ThemeMode)
  ) => void;
  systemTheme: Ref<Theme>;
  themes: ComputedRef<string[]>;
}

export interface ColorModeValue {
  enableColorScheme?: boolean;
  enableSystem?: boolean;
  fallback?: Theme;
  preference?: ThemeMode;
  storageKey?: string;
}

export interface ColorModeProviderProps {
  children?: unknown;
  value?: ColorModeValue;
}
