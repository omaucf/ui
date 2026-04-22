import { computed } from "vue";

import appConfig from "#build/app.config";
import type { ThemeMode } from "#build/ui/types";

import { useColorModeContext } from "@/providers/color-mode/index.js";

export const useColorMode = () => {
  const colorMode = useColorModeContext();

  return {
    force: !appConfig.colorMode,
    mode: computed(() => colorMode.mode.value),
    preference: computed(() => colorMode.preference.value),
    setTheme: (theme: ThemeMode) => colorMode.setTheme(theme),
  };
};
