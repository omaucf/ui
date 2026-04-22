import { FEATURE_DEFAULTS } from "@/defaults.js";
import type { ColorModeConfig } from "@/types/schema.js";
import type { Theme, ThemeMode } from "@/types/ui.js";

export const COLOR_MODE_MEDIA = "(prefers-color-scheme: dark)";
export const DEFAULT_THEMES = ["light", "dark", "system"];

export function createColorScript(options: ColorModeConfig): string {
  const args = JSON.stringify([
    options.storageKey,
    options.preference,
    options.fallback,
    options.enableSystem,
    options.enableColorScheme,
  ]).slice(1, -1);

  return `(${colorScript.toString()})(${args});`;
}

export function resolveColorScript(
  value?: Partial<ColorModeConfig>,
  config?: Partial<ColorModeConfig>
): ColorModeConfig {
  return {
    enableColorScheme:
      value?.enableColorScheme ??
      config?.enableColorScheme ??
      FEATURE_DEFAULTS.colorMode.enableColorScheme,
    enableSystem:
      value?.enableSystem ??
      config?.enableSystem ??
      FEATURE_DEFAULTS.colorMode.enableSystem,
    fallback:
      value?.fallback ??
      config?.fallback ??
      FEATURE_DEFAULTS.colorMode.fallback,
    preference:
      value?.preference ??
      config?.preference ??
      FEATURE_DEFAULTS.colorMode.preference,
    storageKey:
      value?.storageKey ??
      config?.storageKey ??
      FEATURE_DEFAULTS.colorMode.storageKey,
  };
}

export function normalizePreference(
  value: unknown,
  { enableSystem, fallback }: Pick<ColorModeConfig, "enableSystem" | "fallback">
): ThemeMode {
  if (value === "light" || value === "dark") return value;
  if (value === "system" && enableSystem) return "system";
  return fallback;
}

export function resolveMode(preference: ThemeMode, systemTheme: Theme): Theme {
  return preference === "system" ? systemTheme : preference;
}

export function getSystemTheme(window: Window): Theme {
  return window.matchMedia(COLOR_MODE_MEDIA).matches ? "dark" : "light";
}

export function subscribeSystemTheme(
  window: Window,
  onChange: (theme: Theme) => void
): () => void {
  const media = window.matchMedia(COLOR_MODE_MEDIA);

  const handleChange = (event: MediaQueryListEvent) => {
    onChange(event.matches ? "dark" : "light");
  };

  media.addEventListener("change", handleChange);
  return () => {
    media.removeEventListener("change", handleChange);
  };
}

export function getStoredPreference(
  window: Window,
  storageKey: string,
  preference: ThemeMode,
  options: Pick<ColorModeConfig, "enableSystem" | "fallback">
): ThemeMode {
  try {
    const storedPreference = window.localStorage.getItem(storageKey);
    return normalizePreference(storedPreference ?? preference, options);
  } catch {
    return normalizePreference(preference, options);
  }
}

export function savePreference(
  window: Window,
  storageKey: string,
  preference: ThemeMode
): void {
  try {
    window.localStorage.setItem(storageKey, preference);
  } catch {
    // Ignore unsupported storage.
  }
}

export function applyColorMode(
  document: Document,
  mode: Theme,
  enableColorScheme: boolean
): void {
  const root = document.documentElement;

  root.classList.remove("light", "dark");
  root.classList.add(mode);

  if (enableColorScheme) {
    root.style.colorScheme = mode;
  } else {
    root.style.removeProperty("color-scheme");
  }
}

export function handleStorageChange(
  event: StorageEvent,
  storageKey: string,
  preference: ThemeMode,
  options: Pick<ColorModeConfig, "enableSystem" | "fallback">,
  onPreferenceChange: (preference: ThemeMode) => void
): void {
  if (event.key !== storageKey && event.key !== null) {
    return;
  }

  onPreferenceChange(
    normalizePreference(event.newValue ?? preference, options)
  );
}

function colorScript(
  storageKey: string,
  preference: ThemeMode,
  fallback: Theme,
  enableSystem: boolean,
  enableColorScheme: boolean
) {
  const root = document.documentElement;

  try {
    const normalizePreference = (value: unknown): ThemeMode => {
      if (value === "light" || value === "dark") return value;
      if (value === "system" && enableSystem) return "system";
      return fallback;
    };

    const resolveMode = (preference: ThemeMode): Theme => {
      if (preference !== "system") return preference;
      return window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    };

    const storedPreference = localStorage.getItem(storageKey);
    const resolvedPreference = normalizePreference(
      storedPreference ?? preference
    );

    const mode = resolveMode(resolvedPreference);

    root.classList.remove("light", "dark");
    root.classList.add(mode);

    if (enableColorScheme) {
      root.style.colorScheme = mode;
    } else {
      root.style.removeProperty("color-scheme");
    }
  } catch {
    // Ignore bootstrap failures.
  }
}

