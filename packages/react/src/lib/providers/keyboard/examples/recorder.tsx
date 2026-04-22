import { useState } from "react";

import { useHotkeyRecorder } from "@veehance/react/keyboard";

export default () => {
  const [binding, setBinding] = useState<string | null>(null);
  const [lastEvent, setLastEvent] = useState<string | null>(null);

  const recorder = useHotkeyRecorder({
    onCancel: () => setLastEvent("cancelled"),
    onClear: () => {
      setBinding(null);
      setLastEvent("cleared");
    },
    onRecord: (hotkey) => {
      setBinding(hotkey.display);
      setLastEvent("recorded");
    },
  });

  return (
    <div className="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-accented text-sm shadow-sm">
      <p className="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Click record, then press a shortcut.{" "}
        <kbd className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs">
          Esc
        </kbd>{" "}
        cancels,{" "}
        <kbd className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs">
          Backspace
        </kbd>{" "}
        clears.
      </p>

      <div className="flex flex-wrap items-center gap-2.5">
        <button
          className="inline-flex items-center justify-center rounded-md border border-default bg-default px-3 py-1.5 font-medium text-accented text-sm transition-colors hover:bg-accented focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50"
          disabled={recorder.recording}
          onClick={() => recorder.start()}
          type="button"
        >
          {recorder.recording ? "Listening…" : "Record shortcut"}
        </button>
        {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
        {recorder.recording && (
          <span
            className="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
            data-state="active"
          >
            <span className="size-[0.4375rem] rounded-full bg-current motion-safe:animate-[hotkeys-pulse_1.2s_ease-in-out_infinite]" />
            {recorder.value?.display ?? "Press a key"}
          </span>
        )}
      </div>

      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Bound to
        </span>
        <div className="flex min-h-7 flex-wrap items-center gap-1.5">
          {binding ? (
            <kbd
              className="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs data-[active]:border-accent-muted data-[active]:bg-accent-subtle data-[active]:text-accent"
              data-active=""
            >
              {binding}
            </kbd>
          ) : (
            <span className="text-highlighted italic">nothing yet</span>
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Last event
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs">
          {lastEvent ?? "none"}
        </span>
      </div>
    </div>
  );
};
