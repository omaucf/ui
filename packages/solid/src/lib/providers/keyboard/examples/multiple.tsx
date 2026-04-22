import { createSignal, For } from "solid-js";

import {
  useFormatHotkey,
  useHotkeys,
  usePlatform,
} from "@veehance/solid/keyboard";

const commands = [
  { category: "File", hotkey: "mod+S", id: "save", label: "Save" },
  { category: "Edit", hotkey: "mod+Z", id: "undo", label: "Undo" },
  { category: "Edit", hotkey: "mod+shift+Z", id: "redo", label: "Redo" },
];

export default () => {
  const [lastFired, setLastFired] = createSignal<string | null>(null);
  const platform = usePlatform();
  const formatHotkey = useFormatHotkey();

  useHotkeys({
    commands: commands.map((command) => ({
      ...command,
      action: () => setLastFired(command.id),
    })),
  });

  return (
    <div class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-accented text-sm shadow-sm">
      <div class="flex flex-wrap items-center gap-2.5">
        <span class="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Detected platform
        </span>
        <span class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs">
          {platform()}
        </span>
      </div>

      <ul class="m-0 flex list-none flex-col gap-0.5 p-0">
        <For each={commands}>
          {(command) => (
            <li
              class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out data-[fired]:bg-accented"
              data-fired={command.id === lastFired() ? "" : undefined}
            >
              <span>{command.label}</span>
              <kbd
                class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs data-[active]:border-accent-muted data-[active]:bg-accented data-[active]:text-accented"
                data-active={command.id === lastFired() ? "" : undefined}
              >
                {formatHotkey(command.hotkey)}
              </kbd>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
