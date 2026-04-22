import { type ComputedRef, computed } from "vue";

import { formatHotkey, type HotkeyFormatOptions } from "@zag-js/hotkeys";

import { usePlatform } from "./use-platform.js";

export type UseFormatHotkeyReturn = ComputedRef<
  (hotkey: string, options?: HotkeyFormatOptions) => string
>;

export const useFormatHotkey = (): UseFormatHotkeyReturn => {
  const platform = usePlatform();

  return computed(
    () =>
      (hotkey: string, options: HotkeyFormatOptions = {}) =>
        formatHotkey(hotkey, { platform: platform.value, ...options })
  );
};
