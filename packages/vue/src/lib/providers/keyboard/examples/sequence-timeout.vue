<script lang="ts" setup>
  import { ref } from "vue";

  import { createHotkeyStore, useHotkey } from "@veehance/vue/keyboard";

  const TIMEOUT_MS = 600;
  const completed = ref(0);

  const store = createHotkeyStore({ sequenceTimeoutMs: TIMEOUT_MS });

  useHotkey({
    action: () => {
      completed.value += 1;
    },
    hotkey: "G > H",
    store,
  });
</script>

<template>
  <div
    class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-accented shadow-sm"
  >
    <p class="leading-[1.6] text-muted">
      Press
      <kbd
        class="mx-0.5 inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented"
      >
        G
      </kbd>
      then
      <kbd
        class="mx-0.5 inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented"
      >
        H
      </kbd>
      . The second key must land within {{ TIMEOUT_MS }}ms, otherwise the
      sequence resets and nothing fires.
    </p>

    <div class="flex items-baseline gap-2 border-t border-default pt-3.5">
      <span
        class="text-[1.75rem] font-bold leading-none tabular-nums text-accented"
      >
        {{ completed }}
      </span>

      <span class="text-muted">
        {{ completed === 1 ? "completion" : "completions" }}
      </span>
    </div>

    <div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
      <span
        class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
      >
        sequenceTimeoutMs
      </span>

      <span
        class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted"
      >
        {{ TIMEOUT_MS }}ms
      </span>
    </div>
  </div>
</template>
