import {
  DEFAULT_THEMES,
  resolveColorScript,
} from "@veehance/core/utils/script";

import appConfig from "#build/app.config";
import type { Accessor } from "#build/ui/types";

import { createContext } from "@/utils/context.js";

import type { ColorModeContext } from "./color-mode.types.js";

const options = resolveColorScript(undefined, appConfig.colorMode);

export const DEFAULT_COLOR_MODE = () => ({
  mode: () => options.fallback,
  preference: () => options.preference,
  setTheme: () => {},
  systemTheme: () => options.fallback,
  themes: () =>
    options.enableSystem
      ? DEFAULT_THEMES
      : DEFAULT_THEMES.filter((theme) => theme !== "system"),
});

export const [ColorModeContextProvider, useColorModeContext] = createContext<
  Accessor<ColorModeContext>
>({
  defaultValue: DEFAULT_COLOR_MODE,
  hookName: "useColorModeContext",
  providerName: "<ColorModeProvider />",
  strict: false,
});
