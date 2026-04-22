import type { Accessor, MaybeAccessor } from "#build/ui/types";

import { useSyncExternalStore } from "@zag-js/solid";

import { runIfFn } from "@/utils/fn";

import {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.js";

export interface UseIsKeyPressedProps extends UseHotkeyStoreProps {
  hotkey: string;
}

export const useIsKeyPressed = (
  props: MaybeAccessor<UseIsKeyPressedProps>
): Accessor<boolean> => {
  const store = useHotkeyStore({ store: runIfFn(props).store });
  const hotkey = () => runIfFn(props).hotkey;

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(hotkey()), listener),
    () => store.isPressed(hotkey())
  );
};
