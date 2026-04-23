"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { Theme, ThemeMode } from "@veehance/core/types";

import appConfig from "#build/app.config";

import { createContext } from "../../lib/utils/create-context.js";

export interface UseColorModeContext {
  setTheme: (theme: Theme) => void;
  systemTheme: ThemeMode;
  theme: Theme;
}

export const [ColorModeContext, useColorModeContext] =
  createContext<UseColorModeContext>({
    name: "ColorModeContext",
    hookName: "useColorModeContext",
    providerName: "<ColorMode />",
    strict: true,
  });

export interface ColorModeProps {
  children?: React.ReactNode;
  value?: {
    defaultTheme?: Theme;
    storageKey?: string;
  };
}

export const ColorMode = ({ children, value }: ColorModeProps) => {
  const props = {
    ...value,
    defaultTheme:
      value?.defaultTheme ?? (appConfig.colorMode ? "system" : "light"),
    storageKey: value?.storageKey ?? "vite-ui-theme",
  };

  const storageKeyRef = useRef(props.storageKey);

  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return props.defaultTheme;
    return (
      (localStorage.getItem(storageKeyRef.current) as Theme) ??
      props.defaultTheme
    );
  });

  const getSystemTheme = useCallback(
    (): ThemeMode =>
      window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light",
    []
  );

  const systemTheme = useMemo<ThemeMode>(
    () => (theme === "system" ? getSystemTheme() : theme),
    [theme, getSystemTheme]
  );

  useEffect(() => {
    const root = document.documentElement;

    const applyTheme = (mode: ThemeMode) => {
      root.classList.remove("light", "dark");
      root.classList.add(mode);
    };

    applyTheme(systemTheme);
    if (theme !== "system") return;

    const media = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = () => {
      applyTheme(media.matches ? "dark" : "light");
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, [theme, systemTheme]);

  const setTheme = useCallback((next: Theme) => {
    localStorage.setItem(storageKeyRef.current, next);
    setThemeState(next);
  }, []);

  const finalValue = useMemo(
    () => ({ theme, systemTheme, setTheme }),
    [theme, systemTheme, setTheme]
  );

  return <ColorModeContext value={finalValue}>{children}</ColorModeContext>;
};

export default ColorMode;
