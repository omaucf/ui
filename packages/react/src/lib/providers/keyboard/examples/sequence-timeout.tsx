import { useState } from "react";

import { createHotkeyStore, useHotkey } from "@veehance/react/keyboard";

const TIMEOUT_MS = 600;

const store = createHotkeyStore({ sequenceTimeoutMs: TIMEOUT_MS });

export default () => {
  const [completed, setCompleted] = useState(0);

  useHotkey({
    action: () => setCompleted((value) => value + 1),
    hotkey: "G > H",
    store,
  });

  return (
    <div className="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-accented text-sm shadow-sm">
      <p className="text-muted leading-[1.6]">
        Press{" "}
        <kbd className="mx-0.5 inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs">
          G
        </kbd>{" "}
        then{" "}
        <kbd className="mx-0.5 inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs">
          H
        </kbd>
        . The second key must land within {TIMEOUT_MS}ms, otherwise the sequence
        resets and nothing fires.
      </p>

      <div className="flex items-baseline gap-2 border-default border-t pt-3.5">
        <span className="font-bold text-[1.75rem] text-accented tabular-nums leading-none">
          {completed}
        </span>
        <span className="text-muted">
          {completed === 1 ? "completion" : "completions"}
        </span>
      </div>

      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          sequenceTimeoutMs
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs">
          {TIMEOUT_MS}ms
        </span>
      </div>
    </div>
  );
};
