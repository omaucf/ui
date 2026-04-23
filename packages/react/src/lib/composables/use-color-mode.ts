"use client";

import { useMemo } from "react";

import type { Theme, ThemeMode } from "@veehance/core/types";

import { useTheme } from "next-themes";

import appConfig from "#build/app.config";

export const useColorMode = () => {
  const { theme, systemTheme, setTheme } = useTheme();

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
