"use client";

import { useMemo } from "react";

import type { Theme, ThemeMode } from "@veehance/core/types";

import appConfig from "#build/app.config";

import { useColorModeContext } from "../plugins/color-mode.js";

export const useColorMode = () => {
  const { theme, systemTheme, setTheme } = useColorModeContext();

  return useMemo(() => {
    if (!appConfig.colorMode) return { forced: true as const };

    const preference: Theme =
      theme === "light" || theme === "dark" ? theme : "system";

    const value: ThemeMode | undefined =
      preference === "system"
        ? (systemTheme as ThemeMode | undefined)
        : preference;

    return {
      forced: false as const,
      preference,
      setTheme: (value: Theme) => setTheme(value),
      value,
    };
  }, [theme, systemTheme, setTheme]);
};
