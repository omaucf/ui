import { computed, ref } from "vue";

import {
  DEFAULT_THEMES,
  resolveColorScript,
} from "@veehance/core/utils/script";

import appConfig from "#build/app.config";

import { createContext } from "@/utils/context.js";

import type { ColorModeContext } from "./color-mode.types.js";

const options = resolveColorScript(undefined, appConfig.colorMode);

export const DEFAULT_COLOR_MODE = {
  mode: computed(() => options.fallback),
  preference: ref(options.preference),
  setTheme: () => {},
  systemTheme: ref(options.fallback),
  themes: computed(() =>
    options.enableSystem
      ? DEFAULT_THEMES
      : DEFAULT_THEMES.filter((theme) => theme !== "system")
  ),
};

export const [ColorModeContextProvider, useColorModeContext] =
  createContext<ColorModeContext>({
    defaultValue: DEFAULT_COLOR_MODE,
    name: "ColorModeContext",
    strict: false,
  });
