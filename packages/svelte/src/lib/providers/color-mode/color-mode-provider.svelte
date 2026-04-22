<script lang="ts">
  import { onMount } from "svelte";

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
  import ColorModeScript from "./color-mode-script.svelte";
  import { ColorModeContextProvider } from "./use-color-mode-context.js";

  let { children, value }: ColorModeProviderProps = $props();

  const { getDocument, getWindow } = useEnvironment();

  // svelte-ignore state_referenced_locally
  const options = resolveColorScript(value, appConfig.colorMode);

  let preference = $state<ThemeMode>(options.preference);
  let systemTheme = $state<Theme>("light");
  let mounted = $state(false);

  const mode = $derived(resolveMode(preference, systemTheme));
  const themes = $derived(
    options.enableSystem
      ? DEFAULT_THEMES
      : DEFAULT_THEMES.filter((theme) => theme !== "system")
  );

  onMount(() => {
    const window = getWindow();

    preference = getStoredPreference(
      window,
      options.storageKey,
      options.preference,
      {
        enableSystem: options.enableSystem,
        fallback: options.fallback,
      }
    );

    systemTheme = getSystemTheme(window);
    mounted = true;
  });

  $effect(() => {
    const window = getWindow();
    return subscribeSystemTheme(window, (theme) => {
      systemTheme = theme;
    });
  });

  $effect(() => {
    const window = getWindow();

    const handleStorage = (event: StorageEvent) => {
      handleStorageChange(
        event,
        options.storageKey,
        options.preference,
        {
          enableSystem: options.enableSystem,
          fallback: options.fallback,
        },
        (nextPreference) => {
          preference = nextPreference;
        }
      );
    };

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  });

  $effect(() => {
    if (!mounted) return;
    applyColorMode(getDocument(), mode, options.enableColorScheme);
  });

  function setTheme(
    nextPreference: ThemeMode | ((previous: ThemeMode) => ThemeMode)
  ) {
    const requestedPreference = isFunction(nextPreference)
      ? nextPreference(preference)
      : nextPreference;

    const normalizedPreference = normalizePreference(requestedPreference, {
      enableSystem: options.enableSystem,
      fallback: options.fallback,
    });

    preference = normalizedPreference;
    savePreference(getWindow(), options.storageKey, normalizedPreference);
  }

  ColorModeContextProvider(() => ({
    mode: () => mode,
    preference: () => preference,
    setTheme,
    systemTheme: () => systemTheme,
    themes: () => themes,
  }));
</script>

<ColorModeScript {...value} />
{@render children?.()}
