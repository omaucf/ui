import { createSignal, For, Show } from "solid-js";

import {
  type ConflictBehavior,
  createHotkeyStore,
  type HotkeyStore,
  useHotkeyRegistrations,
  useHotkeys,
} from "@veehance/solid/keyboard";

const BEHAVIORS: ConflictBehavior[] = ["warn", "replace", "allow"];

const ConflictDemo = (props: { store: HotkeyStore }) => {
  const [fired, setFired] = createSignal<string[]>([]);

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
    store: props.store,
  });

  const commands = useHotkeyRegistrations({ store: props.store });

  return (
    <>
      <div class="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span class="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Registered on mod+K
        </span>
        <div class="flex min-h-7 flex-wrap items-center gap-1.5">
          <Show
            fallback={<span class="text-highlighted italic">none</span>}
            when={commands().length > 0}
          >
            <For each={commands()}>
              {(command) => (
                <span class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs">
                  {command.label}
                </span>
              )}
            </For>
          </Show>
        </div>
      </div>

      <div class="flex flex-col items-start gap-2 border-default border-t pt-3.5">
        <span class="font-semibold text-[0.6875rem] text-muted uppercase tracking-[0.04em]">
          Fired on last press
        </span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-muted text-xs data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
          data-state={fired().length > 0 ? "active" : undefined}
        >
          {fired().slice(-2).join(" + ") || "nothing yet"}
        </span>
      </div>
    </>
  );
};

export default () => {
  const [behavior, setBehavior] = createSignal<ConflictBehavior>("warn");

  return (
    <div class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-highlighted text-sm shadow-sm">
      <p class="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Two commands claim the same shortcut. Pick how the store resolves it,
        then press it.
      </p>

      <div class="flex flex-wrap items-center gap-2.5">
        <For each={BEHAVIORS}>
          {(value) => (
            <button
              class="inline-flex items-center justify-center rounded-md border border-default bg-default px-3 py-1.5 font-medium text-highlighted text-sm transition-colors hover:bg-accented focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-subtle"
              onClick={() => setBehavior(value)}
              type="button"
            >
              {value}
            </button>
          )}
        </For>
      </div>

      <Show keyed when={behavior()}>
        {(current) => {
          const store = createHotkeyStore({ conflictBehavior: current });
          return <ConflictDemo store={store} />;
        }}
      </Show>
    </div>
  );
};
