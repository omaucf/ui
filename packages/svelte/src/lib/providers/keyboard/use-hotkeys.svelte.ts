import { onDestroy } from "svelte";

import type { MaybeAccessor } from "#build/ui/types";

import {
  type CommandDefinition,
  type HotkeyStore,
  normalizeHotkey,
  type Platform,
} from "@zag-js/hotkeys";
import { isEqual, warn } from "@zag-js/utils";

import { runIfFn } from "$lib/utils/fn";

import {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.svelte.js";
import { usePlatform } from "./use-platform.svelte.js";

export interface UseHotkeysCommand extends Omit<CommandDefinition, "id"> {
  id?: string | undefined;
}

export interface UseHotkeysProps extends UseHotkeyStoreProps {
  commands: UseHotkeysCommand[];
  id?: string | undefined;
}

const createInstanceId = () =>
  `hotkeys:${Math.random().toString(36).slice(2, 10)}`;

interface Registration {
  category: string | undefined;
  description: string | undefined;
  hotkey: string;
  keywords: string[] | undefined;
  label: string | undefined;
  options: CommandDefinition["options"];
  scopes: CommandDefinition["scopes"];
}

const warnOnForeignId = (store: HotkeyStore, id: string) => {
  warn(
    store.getState().commands.has(id),
    `[ui:keyboard] Command id "${id}" is already registered on this store by another component, so the earlier command will stop firing. Use a unique id, omit it to have one generated, or register on a separate store.`
  );
};

const toRegistration = (
  command: UseHotkeysCommand,
  platform: Platform
): Registration => ({
  category: command.category,
  description: command.description,
  hotkey: normalizeHotkey(command.hotkey, platform),
  keywords: command.keywords,
  label: command.label,
  options: command.options,
  scopes: command.scopes,
});

export function useHotkeys(props: MaybeAccessor<UseHotkeysProps>) {
  const store = useHotkeyStore({ store: runIfFn(props).store });
  const platform = usePlatform();
  const instanceId = runIfFn(props).id ?? createInstanceId();

  const registered = new Map<string, Registration>();
  const latest = () => runIfFn(props).commands;

  const resolveId = (command: UseHotkeysCommand, index: number) =>
    command.id ?? `${instanceId}:${index}`;

  const findCommand = (id: string) =>
    latest().find((item, index) => resolveId(item, index) === id);

  $effect(() => {
    const current = runIfFn(props).commands;
    const resolvedPlatform = platform();

    const nextIds = new Set(current.map(resolveId));

    for (const id of [...registered.keys()]) {
      if (nextIds.has(id)) continue;
      store.unregister(id);
      registered.delete(id);
    }

    current.forEach((command, index) => {
      const id = resolveId(command, index);
      const next = toRegistration(command, resolvedPlatform);
      const previous = registered.get(id);

      if (previous && isEqual(previous, next)) return;
      if (previous) store.unregister(id);
      else warnOnForeignId(store, id);

      store.register({
        ...command,
        action: (event) => {
          findCommand(id)?.action(event);
        },
        enabled: () => {
          const enabled = findCommand(id)?.enabled;
          if (enabled === undefined) return true;
          return typeof enabled === "function" ? enabled() : enabled;
        },
        id,
      });

      registered.set(id, next);
    });
  });

  onDestroy(() => {
    for (const id of registered.keys()) store.unregister(id);
    registered.clear();
  });
}
