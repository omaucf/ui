import { useEnvironment } from "#build/ui/imports";

import { createHotkeyStore, type HotkeyStore } from "@zag-js/hotkeys";

export interface UseHotkeyStoreProps {
  store?: HotkeyStore | undefined;
}

let defaultHotkeyStore: HotkeyStore | undefined;

const getDefaultHotkeyStore = () => {
  defaultHotkeyStore ??= createHotkeyStore();
  return defaultHotkeyStore;
};

const initialized = new WeakSet<HotkeyStore>();

export function useHotkeyStore(props: UseHotkeyStoreProps = {}): HotkeyStore {
  const { getRootNode } = useEnvironment();
  const store = props.store ?? getDefaultHotkeyStore();

  $effect(() => {
    if (initialized.has(store)) return;
    initialized.add(store);
    store.init({ target: getRootNode() as Document });
  });

  return store;
}
