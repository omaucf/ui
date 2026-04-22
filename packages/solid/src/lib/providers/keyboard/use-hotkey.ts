import { createMemo } from "solid-js";

import type { MaybeAccessor } from "#build/ui/types";

import { runIfFn } from "@/utils/fn";

import {
  type UseHotkeysCommand,
  type UseHotkeysProps,
  useHotkeys,
} from "./use-hotkeys.js";

export interface UseHotkeyProps
  extends UseHotkeysCommand,
    Pick<UseHotkeysProps, "store"> {}

export const useHotkey = (props: MaybeAccessor<UseHotkeyProps>) => {
  const resolved = createMemo(() => {
    const { store, ...command } = runIfFn(props);
    return { commands: [command], store };
  });

  useHotkeys(resolved);
};
