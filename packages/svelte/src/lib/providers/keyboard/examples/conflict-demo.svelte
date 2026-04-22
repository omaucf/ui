<script lang="ts">
  import { untrack } from "svelte";

  import {
    type HotkeyStore,
    useHotkeyRegistrations,
    useHotkeys,
  } from "@veehance/svelte/keyboard";

  const props: { store: HotkeyStore } = $props();

  // The parent remounts this component for each behavior, so the store is read once.
  const store = untrack(() => props.store);

  let fired = $state<string[]>([]);

  useHotkeys({
    commands: [
      {
        action: () => (fired = [...fired, "First"]),
        hotkey: "mod+K",
        id: "first",
        label: "First",
      },
      {
        action: () => (fired = [...fired, "Second"]),
        hotkey: "mod+K",
        id: "second",
        label: "Second",
      },
    ],
    store,
  });

  const commands = useHotkeyRegistrations({ store });
</script>

<div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
  <span
    class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
  >
    Registered on mod+K
  </span>
  <div class="flex min-h-7 flex-wrap items-center gap-1.5">
    {#if commands().length === 0}
      <span class="text-highlighted italic">none</span>
    {:else}
      {#each commands() as command (command.id)}
        <span
          class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted"
        >
          {command.label}
        </span>
      {/each}
    {/if}
  </div>
</div>

<div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
  <span
    class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
  >
    Fired on last press
  </span>
  <span
    class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
    data-state={fired.length > 0 ? 'active' : undefined}
  >
    {fired.slice(-2).join(' + ') || 'nothing yet'}
  </span>
</div>
