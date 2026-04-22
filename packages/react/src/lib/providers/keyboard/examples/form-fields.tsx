import { useState } from "react";

import { useFormatHotkey, useHotkeys } from "@veehance/react/keyboard";

export default () => {
  const [log, setLog] = useState<string | null>(null);
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
    <div className="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-highlighted text-sm shadow-sm">
      <p className="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Try each shortcut outside the field, then again with the field focused
      </p>

      <input
        aria-label="Note"
        className="h-[2.375rem] w-full min-w-0 rounded-lg border border-default bg-elevated px-3 text-highlighted text-sm outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent-subtle"
        placeholder="Type here…"
      />

      <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
        <li className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out">
          <span>
            Search <span className="text-muted">· ignored while typing</span>
          </span>
          <kbd className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-highlighted text-xs">
            {formatHotkey("S")}
          </kbd>
        </li>
        <li className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out">
          <span>
            Save <span className="text-muted">· modifiers always fire</span>
          </span>
          <kbd className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-highlighted text-xs">
            {formatHotkey("mod+S")}
          </kbd>
        </li>
        <li className="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out">
          <span>
            Preview <span className="text-muted">· enableOnFormTags</span>
          </span>
          <kbd className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-highlighted text-xs">
            {formatHotkey("P")}
          </kbd>
        </li>
      </ul>

      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Last fired
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
          data-state={log ? "active" : undefined}
        >
          {log ?? "nothing yet"}
        </span>
      </div>
    </div>
  );
};
