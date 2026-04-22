<script lang="ts">
  import { useHotkeys } from "@veehance/svelte/keyboard";

  const routes = [
    { hotkey: "G > H", id: "home", keys: ["G", "H"], label: "Home" },
    { hotkey: "G > S", id: "settings", keys: ["G", "S"], label: "Settings" },
  ];

  let page = $state("home");

  useHotkeys({
    commands: routes.map((route) => ({
      action: () => (page = route.id),
      hotkey: route.hotkey,
      id: route.id,
    })),
  });
</script>

<div
  class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-accented shadow-sm"
>
  <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
    Press the keys in order, one after the other
  </p>
  <ul class="m-0 flex list-none flex-col gap-0.5 p-0">
    {#each routes as route (route.id)}
      <li
        class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out data-[fired]:bg-accent-subtle"
        data-fired={route.id === page ? '' : undefined}
      >
        <span>{route.label}</span>
        <span class="flex min-h-7 flex-wrap items-center gap-1.5">
          {#each route.keys as key, index (key)}
            <kbd
              class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented data-[active]:border-accent-muted data-[active]:bg-accent-subtle data-[active]:text-accent"
              data-active={route.id === page ? '' : undefined}
            >
              {index > 0 ? `then ${key}` : key}
            </kbd>
          {/each}
        </span>
      </li>
    {/each}
  </ul>
  <div class="flex items-baseline gap-2 border-t border-default pt-3.5">
    <span class="text-muted">Current page</span>
    <span
      class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-accent data-[state=active]:bg-accent-subtle"
      data-state="active"
    >
      {page}
    </span>
  </div>
</div>
