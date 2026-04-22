import { useMemo, useState } from "react";

import {
  type ConflictBehavior,
  createHotkeyStore,
  type HotkeyStore,
  useHotkeyRegistrations,
  useHotkeys,
} from "@veehance/react/keyboard";

const BEHAVIORS: ConflictBehavior[] = ["warn", "replace", "allow"];

const ConflictDemo = ({ store }: { store: HotkeyStore }) => {
  const [fired, setFired] = useState<string[]>([]);

  useHotkeys({
    commands: [
      {
        action: () => setFired((log) => [...log, "First"]),
        hotkey: "mod+K",
        id: "first",
        label: "First",
      },
      {
        action: () => setFired((log) => [...log, "Second"]),
        hotkey: "mod+K",
        id: "second",
        label: "Second",
      },
    ],
    store,
  });

  const commands = useHotkeyRegistrations({ store });

  return (
    <>
      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Registered on mod+K
        </span>
        <div className="flex min-h-7 flex-wrap items-center gap-1.5">
          {commands.length === 0 ? (
            <span className="text-highlighted italic">none</span>
          ) : (
            commands.map((command) => (
              <span
                className="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs"
                key={command.id}
              >
                {command.label}
              </span>
            ))
          )}
        </div>
      </div>

      <div className="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span className="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Fired on last press
        </span>
        <span
          className="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
          data-state={fired.length > 0 ? "active" : undefined}
        >
          {fired.slice(-2).join(" + ") || "nothing yet"}
        </span>
      </div>
    </>
  );
};

export default () => {
  const [behavior, setBehavior] = useState<ConflictBehavior>("warn");

  const store = useMemo(
    () => createHotkeyStore({ conflictBehavior: behavior }),
    [behavior]
  );

  return (
    <div className="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-highlighted text-sm shadow-sm">
      <p className="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Two commands claim the same shortcut. Pick how the store resolves it,
        then press it.
      </p>

      <div className="flex flex-wrap items-center gap-2.5">
        {BEHAVIORS.map((value) => (
          <button
            className="inline-flex items-center justify-center rounded-md border border-default bg-default px-3 py-1.5 font-medium text-highlighted text-sm transition-colors hover:bg-accented focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-subtle"
            key={value}
            onClick={() => setBehavior(value)}
            type="button"
          >
            {value}
          </button>
        ))}
      </div>

      <ConflictDemo key={behavior} store={store} />
    </div>
  );
};
