"use client";

import appConfig from "#build/app.config";

import { useColorModeContext } from "@/providers/color-mode/index.js";

export const useColorMode = () => {
  const { mode, preference, setTheme } = useColorModeContext();

  return {
    force: !appConfig.colorMode?.enableSystem,
    mode,
    preference,
    setTheme,
  };
};
