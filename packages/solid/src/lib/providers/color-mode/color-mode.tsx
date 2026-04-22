import {
  createContext,
  createEffect,
  createMemo,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";

import {
  applyColorMode,
  DEFAULT_THEMES,
  getStoredPreference,
  getSystemTheme,
  handleStorageChange,
  normalizePreference,
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

function ColorMode(props: ColorModeProviderProps) {
  const { getDocument, getWindow } = useEnvironment();

  const options = resolveColorScript(props.value, appConfig.colorMode);
  const [preference, setPreferenceState] = createSignal<ThemeMode>(
    options.preference
  );

  const [systemTheme, setSystemTheme] = createSignal<Theme>("light");
  const [mounted, setMounted] = createSignal(false);
  const mode = createMemo<Theme>(() =>
    resolveMode(preference(), systemTheme())
  );

  onMount(() => {
    const window = getWindow();

    setPreferenceState(
      getStoredPreference(window, options.storageKey, options.preference, {
        enableSystem: options.enableSystem,
        fallback: options.fallback,
      })
    );

    setSystemTheme(getSystemTheme(window));
    setMounted(true);
  });

  createEffect(() => {
    if (!mounted()) return;
    const document = getDocument();
    applyColorMode(document, mode(), options.enableColorScheme);
  });

  createEffect(() => {
    const window = getWindow();
    const unsubscribe = subscribeSystemTheme(window, setSystemTheme);
    onCleanup(unsubscribe);
  });

  createEffect(() => {
    const window = getWindow();

    const onStorage = (event: StorageEvent) => {
      handleStorageChange(
        event,
        options.storageKey,
        options.preference,
        {
          enableSystem: options.enableSystem,
          fallback: options.fallback,
        },
        setPreferenceState
      );
    };

    window.addEventListener("storage", onStorage);
    onCleanup(() => {
      window.removeEventListener("storage", onStorage);
    });
  });

  const setTheme = (
    nextPreference: ThemeMode | ((previous: ThemeMode) => ThemeMode)
  ) => {
    const window = getWindow();

    setPreferenceState((previousPreference) => {
      const requestedPreference = isFunction(nextPreference)
        ? nextPreference(previousPreference)
        : nextPreference;

      const normalizedPreference = normalizePreference(requestedPreference, {
        enableSystem: options.enableSystem,
        fallback: options.fallback,
      });

      savePreference(window, options.storageKey, normalizedPreference);
      return normalizedPreference;
    });
  };

  const themes = createMemo(() =>
    options.enableSystem
      ? DEFAULT_THEMES
      : DEFAULT_THEMES.filter((theme) => theme !== "system")
  );

  const contextValue = createMemo(() => ({
    mode,
    preference,
    setTheme,
    systemTheme,
    themes,
  }));

  return (
    <ColorModeContextProvider value={contextValue}>
      <ColorModeScript {...props.value} />
      {props.children}
    </ColorModeContextProvider>
  );
}

export default ColorModeProvider;
