"use client";

import { useEffect, useId, useRef } from "react";

import {
  type CommandDefinition,
  type HotkeyStore,
  normalizeHotkey,
  type Platform,
} from "@zag-js/hotkeys";
import { isEqual, warn } from "@zag-js/utils";

import {
  type UseHotkeyStoreProps,
  useHotkeyStore,
} from "./use-hotkey-store.js";
import { usePlatform } from "./use-platform.js";

export interface UseHotkeysCommand extends Omit<CommandDefinition, "id"> {
  id?: string | undefined;
}

export interface UseHotkeysProps extends UseHotkeyStoreProps {
  commands: UseHotkeysCommand[];
  id?: string | undefined;
}

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

export const useHotkeys = (props: UseHotkeysProps) => {
  const store = useHotkeyStore(props);
  const platform = usePlatform();
  const generatedId = useId();
  const instanceId = props.id ?? generatedId;

  const commandsRef = useRef(props.commands);
  commandsRef.current = props.commands;

  const registered = useRef(new Map<string, Registration>());

  const resolveId = (command: UseHotkeysCommand, index: number) =>
    command.id ?? `${instanceId}:${index}`;

  const findCommand = (id: string) =>
    commandsRef.current.find((item, index) => resolveId(item, index) === id);

  useEffect(() => {
    const current = commandsRef.current;
    const nextIds = new Set(current.map(resolveId));

    for (const id of [...registered.current.keys()]) {
      if (nextIds.has(id)) continue;
      store.unregister(id);
      registered.current.delete(id);
    }

    current.forEach((command, index) => {
      const id = resolveId(command, index);
      const next = toRegistration(command, platform);
      const previous = registered.current.get(id);

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

      registered.current.set(id, next);
    });
  });

  useEffect(() => {
    const registry = registered.current;
    return () => {
      for (const id of registry.keys()) store.unregister(id);
      registry.clear();
    };
  }, [store]);
};
