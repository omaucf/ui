import { createSignal, For } from "solid-js";

import { useHotkeys } from "@veehance/solid/keyboard";

const routes = [
  { hotkey: "G > H", id: "home", keys: ["G", "H"], label: "Home" },
  { hotkey: "G > S", id: "settings", keys: ["G", "S"], label: "Settings" },
];

export default () => {
  const [page, setPage] = createSignal("home");

  useHotkeys({
    commands: routes.map((route) => ({
      action: () => setPage(route.id),
      hotkey: route.hotkey,
      id: route.id,
    })),
  });

  return (
    <div class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-accented text-sm shadow-sm">
      <p class="flex flex-wrap items-center gap-2 text-muted leading-[1.6]">
        Press the keys in order, one after the other
      </p>

      <ul class="m-0 flex list-none flex-col gap-0.5 p-0">
        <For each={routes}>
          {(route) => (
            <li
              class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out data-[fired]:bg-accent-subtle"
              data-fired={route.id === page() ? "" : undefined}
            >
              <span>{route.label}</span>
              <span class="flex min-h-7 flex-wrap items-center gap-1.5">
                <For each={route.keys}>
                  {(key, index) => (
                    <kbd
                      class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] font-semibold text-accented text-xs data-[active]:border-accent-muted data-[active]:bg-accent-subtle data-[active]:text-accent"
                      data-active={route.id === page() ? "" : undefined}
                    >
                      {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
                      {index() > 0 ? `then ${key}` : key}
                    </kbd>
                  )}
                </For>
              </span>
            </li>
          )}
        </For>
      </ul>

      <div class="flex items-baseline gap-2 border-default border-t pt-3.5">
        <span class="text-muted">Current page</span>
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] font-semibold text-accent text-xs data-[state=active]:bg-accent-subtle"
          data-state="active"
        >
          {page()}
        </span>
      </div>
    </div>
  );
};
