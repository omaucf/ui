<script lang="ts" setup>
  import {
    computed,
    type InjectionKey,
    inject,
    onMounted,
    onUnmounted,
    provide,
    ref,
    watchEffect,
  } from "vue";

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
  import ColorModeScript from "./color-mode-script.vue";
  import { ColorModeContextProvider } from "./use-color-mode-context.js";

  const COLOR_MODE_BOUND_KEY: InjectionKey<boolean> = Symbol("ColorModeBound");

  const props = defineProps<ColorModeProviderProps>();

  const isBound = inject(COLOR_MODE_BOUND_KEY, false);
  if (!isBound) {
    provide(COLOR_MODE_BOUND_KEY, true);
  }

  const { getDocument, getWindow } = useEnvironment();

  const options = resolveColorScript(props.value, appConfig.colorMode);
  const preference = ref<ThemeMode>(options.preference);
  const systemTheme = ref<Theme>("light");
  const mounted = ref(false);

  const mode = computed<Theme>(() =>
    resolveMode(preference.value, systemTheme.value)
  );

  const themes = computed(() =>
    options.enableSystem
      ? DEFAULT_THEMES
      : DEFAULT_THEMES.filter((theme) => theme !== "system")
  );

  onMounted(() => {
    const window = getWindow();

    preference.value = getStoredPreference(
      window,
      options.storageKey,
      options.preference,
      {
        enableSystem: options.enableSystem,
        fallback: options.fallback,
      }
    );

    systemTheme.value = getSystemTheme(window);
    mounted.value = true;
  });

  let unsubscribeSystemTheme: (() => void) | undefined;

  onMounted(() => {
    const window = getWindow();

    unsubscribeSystemTheme = subscribeSystemTheme(window, (theme) => {
      systemTheme.value = theme;
    });
  });

  onUnmounted(() => {
    unsubscribeSystemTheme?.();
  });

  onMounted(() => {
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
        (nextPreference) => {
          preference.value = nextPreference;
        }
      );
    };

    window.addEventListener("storage", onStorage);
    onUnmounted(() => {
      window.removeEventListener("storage", onStorage);
    });
  });

  // Apply document theme reactively

  watchEffect(() => {
    if (!mounted.value) return;
    applyColorMode(getDocument(), mode.value, options.enableColorScheme);
  });

  function setTheme(
    nextPreference: ThemeMode | ((previous: ThemeMode) => ThemeMode)
  ) {
    const requestedPreference = isFunction(nextPreference)
      ? nextPreference(preference.value)
      : nextPreference;

    const normalizedPreference = normalizePreference(requestedPreference, {
      enableSystem: options.enableSystem,
      fallback: options.fallback,
    });

    savePreference(getWindow(), options.storageKey, normalizedPreference);
    preference.value = normalizedPreference;
  }

  ColorModeContextProvider({
    mode,
    preference,
    setTheme,
    systemTheme,
    themes,
  });
</script>

<template>
  <template v-if="isBound">
    <slot />
  </template>

  <template v-else>
    <ColorModeScript :value="props.value" />
    <slot />
  </template>
</template>
