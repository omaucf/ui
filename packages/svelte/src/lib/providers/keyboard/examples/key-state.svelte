<script lang="ts">
  import {
    useHotkey,
    useIsKeyPressed,
    usePressedKeys,
  } from "@veehance/svelte/keyboard";

  useHotkey({ action: () => {}, hotkey: "mod+K" });

  const pressedKeys = usePressedKeys();
  const isShiftPressed = useIsKeyPressed({ hotkey: "shift" });
</script>

<div
  class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-highlighted shadow-sm"
>
  <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
    Hold any key to see it tracked live
  </p>

  <div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
    <span
      class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
    >
      Currently pressed
    </span>
    <div class="flex min-h-7 flex-wrap items-center gap-1.5">
      {#if pressedKeys().length === 0}
        <span class="text-highlighted italic">nothing</span>
      {:else}
        {#each pressedKeys() as key (key)}
          <kbd
            class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-highlighted data-[active]:border-muted data-[active]:bg-elevated data-[active]:text-primary"
            data-active=""
            >{key}</kbd
          >
        {/each}
      {/if}
    </div>
  </div>

  <div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
    <span
      class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
      >Shift</span
    >
    <span
      class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted data-[state=active]:bg-elevated data-[state=active]:text-primary"
      data-state={isShiftPressed() ? 'active' : undefined}
    >
      <span
        class="size-[0.4375rem] rounded-full bg-current data-[pulse]:motion-safe:animate-[hotkeys-pulse_1.2s_ease-in-out_infinite]"
        data-pulse={isShiftPressed() ? '' : undefined}
      ></span>
      {isShiftPressed() ? 'Precision mode' : 'Hold Shift for precision'}
    </span>
  </div>
</div>
