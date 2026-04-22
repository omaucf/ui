import { type MaybeRef, type Ref, toValue } from "vue";

import { useSyncExternalStore } from "@zag-js/vue";

import {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.js";

export interface UseIsKeyPressedProps extends UseHotkeyStoreProps {
  hotkey: string;
}

export const useIsKeyPressed = (
  props: MaybeRef<UseIsKeyPressedProps>
): Readonly<Ref<boolean>> => {
  const store = useHotkeyStore({ store: toValue(props).store });
  const hotkey = () => toValue(props).hotkey;

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(hotkey()), listener),
    () => store.isPressed(hotkey())
  );
};
