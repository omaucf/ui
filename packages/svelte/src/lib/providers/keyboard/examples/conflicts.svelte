<script lang="ts">
  import {
    type ConflictBehavior,
    createHotkeyStore,
  } from "@veehance/svelte/keyboard";

  import ConflictDemo from "./conflict-demo.svelte";

  const BEHAVIORS: ConflictBehavior[] = ["warn", "replace", "allow"];
  let behavior = $state<ConflictBehavior>("warn");
</script>

<div
  class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-highlighted shadow-sm"
>
  <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
    Two commands claim the same shortcut. Pick how the store resolves it, then
    press it.
  </p>

  <div class="flex flex-wrap items-center gap-2.5">
    {#each BEHAVIORS as value (value)}
      <button
        class="inline-flex items-center justify-center rounded-md border border-default bg-default px-3 py-1.5 text-sm font-medium text-highlighted transition-colors hover:bg-accented focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-subtle"
        onclick={() => (behavior = value)}
        type="button"
      >
        {value}
      </button>
    {/each}
  </div>

  {#key behavior}
    <ConflictDemo store={createHotkeyStore({ conflictBehavior: behavior })} />
  {/key}
</div>
