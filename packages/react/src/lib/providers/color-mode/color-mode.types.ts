import type { Dispatch, SetStateAction } from "react";

import type { Theme, ThemeMode } from "#build/ui/types";

export interface ColorModeContext {
  mode: Theme;
  preference: ThemeMode;
  setTheme: Dispatch<SetStateAction<ThemeMode>>;
  systemTheme: Theme;
  themes: string[];
}

export interface ColorModeValue {
  enableColorScheme?: boolean;
  enableSystem?: boolean;
  fallback?: Theme;
  preference?: ThemeMode;
  storageKey?: string;
}

export interface ColorModeProviderProps {
  children?: React.ReactNode;
  value?: ColorModeValue;
}
