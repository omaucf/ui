import { createSignal } from "solid-js";

import { useFormatHotkey, useHotkeys } from "@veehance/solid/keyboard";

export default () => {
  const [log, setLog] = createSignal<string | null>(null);
  const formatHotkey = useFormatHotkey();

  useHotkeys({
    commands: [
      { action: () => setLog("Search (single key)"), hotkey: "S" },
      { action: () => setLog("Save (modifier)"), hotkey: "mod+S" },
      {
        action: () => setLog("Preview (opted in)"),
        hotkey: "P",
        options: { enableOnFormTags: true },
      },
    ],
  });

  return (
    <div class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-highlighted text-sm shadow-sm">
      <p class="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Try each shortcut outside the field, then again with the field focused
      </p>

      <input
        aria-label="Note"
        class="h-[2.375rem] w-full min-w-0 rounded-lg border border-default bg-elevated px-3 text-highlighted text-sm outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        placeholder="Type here…"
      />

      <ul class="m-0 flex list-none flex-col gap-0.5 p-0">
        <li class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out">
          <span>
            Search <span class="text-muted">· ignored while typing</span>
          </span>
          <kbd class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-highlighted text-xs">
            {formatHotkey("S")}
          </kbd>
        </li>
        <li class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out">
          <span>
            Save <span class="text-muted">· modifiers always fire</span>
          </span>
          <kbd class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-highlighted text-xs">
            {formatHotkey("mod+S")}
          </kbd>
        </li>
        <li class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out">
          <span>
            Preview <span class="text-muted">· enableOnFormTags</span>
          </span>
          <kbd class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-highlighted text-xs">
            {formatHotkey("P")}
          </kbd>
        </li>
      </ul>

      <div class="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span class="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Last fired
        </span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
          data-state={log() ? "active" : undefined}
        >
          {log() ?? "nothing yet"}
        </span>
      </div>
    </div>
  );
};
