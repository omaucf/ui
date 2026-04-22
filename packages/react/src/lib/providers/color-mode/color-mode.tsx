"use client";

import {
  createContext,
  type SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  applyColorMode,
  DEFAULT_THEMES,
  getStoredPreference,
  getSystemTheme,
  handleStorageChange,
  resolveColorScript,
  resolveMode,
  savePreference,
  subscribeSystemTheme,
} from "@veehance/core/utils/script";

import appConfig from "#build/app.config";
import { useEnvironment } from "#build/ui/imports";
import type { Theme, ThemeMode } from "#build/ui/types";

import { isFunction } from "radashi";

import type { ColorModeProviderProps } from "./color-mode.types.js";
import { ColorModeScript } from "./color-mode-script.js";
import { ColorModeContextProvider } from "./use-color-mode-context.js";

const ColorModeBoundContext = createContext(false);

function ColorModeProvider(props: ColorModeProviderProps) {
  const bound = useContext(ColorModeBoundContext);
  if (bound) return props.children;

  return (
    <ColorModeBoundContext.Provider value={true}>
      <ColorMode {...props} />
    </ColorModeBoundContext.Provider>
  );
}

function ColorMode({ children, value }: ColorModeProviderProps) {
  const { getDocument, getWindow } = useEnvironment();

  const options = useMemo(
    () => resolveColorScript(value, appConfig.colorMode),
    [value]
  );

  const {
    enableColorScheme,
    enableSystem,
    fallback,
    preference: defaultPreference,
    storageKey,
  } = options;

  const [preference, setPreferenceState] =
    useState<ThemeMode>(defaultPreference);

  const [systemTheme, setSystemTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);
  const mode = resolveMode(preference, systemTheme);

  useEffect(() => {
    const window = getWindow();

    setPreferenceState(
      getStoredPreference(window, storageKey, defaultPreference, {
        enableSystem,
        fallback,
      })
    );

    setSystemTheme(getSystemTheme(window));
    setMounted(true);
  }, [getWindow, storageKey, defaultPreference, enableSystem, fallback]);

  useEffect(() => {
    const window = getWindow();

    return subscribeSystemTheme(window, setSystemTheme);
  }, [getWindow]);

  useEffect(() => {
    const window = getWindow();

    const onStorage = (event: StorageEvent) => {
      handleStorageChange(
        event,
        storageKey,
        defaultPreference,
        { enableSystem, fallback },
        setPreferenceState
      );
    };

    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [getWindow, storageKey, defaultPreference, enableSystem, fallback]);

  useEffect(() => {
    if (!mounted) return;
    applyColorMode(getDocument(), mode, enableColorScheme);
  }, [getDocument, mounted, mode, enableColorScheme]);

  const setTheme = useCallback(
    (nextPreference: SetStateAction<ThemeMode>) => {
      const window = getWindow();

      setPreferenceState((previousPreference) => {
        const preference = isFunction(nextPreference)
          ? nextPreference(previousPreference)
          : nextPreference;

        const normalizedPreference =
          preference === "system" && !enableSystem ? fallback : preference;

        savePreference(window, storageKey, normalizedPreference);
        return normalizedPreference;
      });
    },
    [getWindow, storageKey, enableSystem, fallback]
  );

  const themes = useMemo(
    () =>
      enableSystem
        ? DEFAULT_THEMES
        : DEFAULT_THEMES.filter((theme) => theme !== "system"),
    [enableSystem]
  );

  const contextValue = useMemo(
    () => ({
      mode,
      preference,
      setTheme,
      systemTheme,
      themes,
    }),
    [mode, preference, setTheme, systemTheme, themes]
  );

  return (
    <ColorModeContextProvider value={contextValue}>
      <ColorModeScript {...value} />
      {children}
    </ColorModeContextProvider>
  );
}

export default ColorModeProvider;
