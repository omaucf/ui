<script lang="ts">
  import { useHotkeyRecorder } from "@veehance/svelte/keyboard";

  let binding = $state<string | null>(null);
  let lastEvent = $state<string | null>(null);

  const recorder = useHotkeyRecorder({
    onCancel: () => (lastEvent = "cancelled"),
    onClear: () => {
      binding = null;
      lastEvent = "cleared";
    },
    onRecord: (hotkey) => {
      binding = hotkey.display;
      lastEvent = "recorded";
    },
  });
</script>

<div
  class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-accented shadow-sm"
>
  <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
    Click record, then press a shortcut.
    <kbd
      class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented"
    >
      Esc
    </kbd>
    cancels,
    <kbd
      class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented"
    >
      Backspace
    </kbd>
    clears.
  </p>

  <div class="flex flex-wrap items-center gap-2.5">
    <button
      class="inline-flex items-center justify-center rounded-md border border-default bg-default px-3 py-1.5 text-sm font-medium text-accented transition-colors hover:bg-accented focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50"
      disabled={recorder.state().recording}
      onclick={() => recorder.start()}
      type="button"
    >
      {recorder.state().recording ? 'Listening…' : 'Record shortcut'}
    </button>
    {#if recorder.state().recording}
      <span
        class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
        data-state="active"
      >
        <span
          class="size-[0.4375rem] rounded-full bg-current motion-safe:animate-[hotkeys-pulse_1.2s_ease-in-out_infinite]"
          data-pulse=""
        ></span>
        {recorder.state().value?.display ?? 'Press a key'}
      </span>
    {/if}
  </div>

  <div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
    <span
      class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
    >
      Bound to
    </span>
    <div class="flex min-h-7 flex-wrap items-center gap-1.5">
      {#if binding}
        <kbd
          class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented data-[active]:border-accent-muted data-[active]:bg-accent-subtle data-[active]:text-accent"
          data-active=""
        >
          {binding}
        </kbd>
      {:else}
        <span class="text-highlighted italic">nothing yet</span>
      {/if}
    </div>
  </div>

  <div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
    <span
      class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
    >
      Last event
    </span>
    <span
      class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted"
    >
      {lastEvent ?? 'none'}
    </span>
  </div>
</div>
