export {
  type CommandDefinition,
  type ConflictBehavior,
  createHotkeyStore,
  formatHotkey,
  type HotkeyAction,
  type HotkeyCommand,
  type HotkeyFormatOptions,
  type HotkeyOptions,
  type HotkeyStore,
  type HotkeyStoreOptions,
  isHotKey,
  isHotkeyEqual,
  type ParsedHotkey,
  parseHotkey,
  type RecordedHotkey,
  validateHotkey,
} from "@zag-js/hotkeys";

export {
  type UseFormatHotkeyReturn,
  useFormatHotkey,
} from "./use-format-hotkey.js";
export { type UseHotkeyProps, useHotkey } from "./use-hotkey.js";
export {
  type UseHotkeyRecorderProps,
  type UseHotkeyRecorderReturn,
  useHotkeyRecorder,
} from "./use-hotkey-recorder.js";
export { useHotkeyRegistrations } from "./use-hotkey-registrations.js";
export {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.js";
export { type UseHotkeysCommand, useHotkeys } from "./use-hotkeys.js";
export {
  type UseIsKeyPressedProps,
  useIsKeyPressed,
} from "./use-is-key-pressed.js";
export { type Platform, usePlatform } from "./use-platform.js";
export { usePressedKeys } from "./use-pressed-keys.js";
