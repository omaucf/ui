import appConfig from "#build/app.config";
import type { ThemeMode } from "#build/ui/types";

import { useColorModeContext } from "@/providers/color-mode/index.js";

export const useColorMode = () => {
  const colorMode = useColorModeContext();

  return {
    force: !appConfig.colorMode?.enableSystem,
    mode: () => colorMode().mode(),
    preference: () => colorMode().preference(),
    setTheme: (mode: ThemeMode) => colorMode().setTheme(mode),
  };
};
