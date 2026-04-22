"use client";

import type { HotkeyCommand, HotkeyStoreState } from "@zag-js/hotkeys";

import {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.js";
import { useStoreSnapshot } from "./use-store-snapshot.js";

const getVersion = (state: HotkeyStoreState) =>
  Array.from(
    state.commands.values(),
    (command) => `${command.id}:${command.hotkey}:${command.label ?? ""}`
  ).join("|");

const build = (state: HotkeyStoreState): HotkeyCommand[] =>
  Array.from(state.commands.values());

export const useHotkeyRegistrations = (
  props: UseHotkeyStoreProps = {}
): HotkeyCommand[] => {
  const store = useHotkeyStore(props);
  return useStoreSnapshot(store, getVersion, build);
};
