"use client";

import {
  type UseHotkeysCommand,
  type UseHotkeysProps,
  useHotkeys,
} from "./use-hotkeys.js";

export interface UseHotkeyProps
  extends UseHotkeysCommand,
    Pick<UseHotkeysProps, "store"> {}

export const useHotkey = (props: UseHotkeyProps) => {
  const { store, ...command } = props;

  useHotkeys({ commands: [command], store });
};
