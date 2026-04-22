import { formatHotkey, type HotkeyFormatOptions } from "@zag-js/hotkeys";

import { usePlatform } from "./use-platform.js";

export type UseFormatHotkeyReturn = (
  hotkey: string,
  options?: HotkeyFormatOptions
) => string;

export const useFormatHotkey = (): UseFormatHotkeyReturn => {
  const platform = usePlatform();

  return (hotkey: string, options: HotkeyFormatOptions = {}) =>
    formatHotkey(hotkey, { platform: platform(), ...options });
};
