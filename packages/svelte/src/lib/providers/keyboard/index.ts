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
} from "./use-format-hotkey.svelte.js";
export { type UseHotkeyProps, useHotkey } from "./use-hotkey.svelte.js";
export {
  type UseHotkeyRecorderProps,
  type UseHotkeyRecorderReturn,
  useHotkeyRecorder,
} from "./use-hotkey-recorder.svelte.js";
export { useHotkeyRegistrations } from "./use-hotkey-registrations.svelte.js";
export {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.svelte.js";
export { type UseHotkeysCommand, useHotkeys } from "./use-hotkeys.svelte.js";
export {
  type UseIsKeyPressedProps,
  useIsKeyPressed,
} from "./use-is-key-pressed.svelte.js";
export { type Platform, usePlatform } from "./use-platform.svelte.js";
export { usePressedKeys } from "./use-pressed-keys.svelte.js";
