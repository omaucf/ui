import type { MaybeAccessor } from "#build/ui/types";

import { useSyncExternalStore } from "@zag-js/svelte";

import { runIfFn } from "$lib/utils/fn";

import {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.svelte.js";

export interface UseIsKeyPressedProps extends UseHotkeyStoreProps {
  hotkey: string;
}

export function useIsKeyPressed(
  props: MaybeAccessor<UseIsKeyPressedProps>
): () => boolean {
  const store = useHotkeyStore({ store: runIfFn(props).store });
  const hotkey = () => runIfFn(props).hotkey;

  return useSyncExternalStore(
    (listener) => store.subscribe(() => store.isPressed(hotkey()), listener),
    () => store.isPressed(hotkey())
  );
}
