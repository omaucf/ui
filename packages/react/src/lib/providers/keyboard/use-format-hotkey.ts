"use client";

import { useCallback } from "react";

import { formatHotkey, type HotkeyFormatOptions } from "@zag-js/hotkeys";

import { usePlatform } from "./use-platform.js";

export type UseFormatHotkeyReturn = (
  hotkey: string,
  options?: HotkeyFormatOptions
) => string;

export const useFormatHotkey = (): UseFormatHotkeyReturn => {
  const platform = usePlatform();

  return useCallback(
    (hotkey: string, options: HotkeyFormatOptions = {}) =>
      formatHotkey(hotkey, { platform, ...options }),
    [platform]
  );
};
