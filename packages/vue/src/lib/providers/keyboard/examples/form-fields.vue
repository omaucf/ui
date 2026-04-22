<script lang="ts" setup>
  import { ref } from "vue";

  import { useFormatHotkey, useHotkeys } from "@veehance/vue/keyboard";

  const log = ref<string | null>(null);
  const formatHotkey = useFormatHotkey();

  useHotkeys({
    commands: [
      { action: () => (log.value = "Search (single key)"), hotkey: "S" },
      { action: () => (log.value = "Save (modifier)"), hotkey: "mod+S" },
      {
        action: () => (log.value = "Preview (opted in)"),
        hotkey: "P",
        options: { enableOnFormTags: true },
      },
    ],
  });
</script>

<template>
  <div
    class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-highlighted shadow-sm"
  >
    <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
      Try each shortcut outside the field, then again with the field focused
    </p>

    <input
      aria-label="Note"
      class="min-w-0 w-full h-[2.375rem] rounded-lg border border-default bg-elevated px-3 text-sm text-highlighted outline-none placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent-subtle"
      placeholder="Type here…"
    >

    <ul class="m-0 flex list-none flex-col gap-0.5 p-0">
      <li
        class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out"
      >
        <span>
          Search
          <span class="text-muted">· ignored while typing</span>
        </span>

        <kbd
          class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-highlighted"
        >
          {{ formatHotkey("S") }}
        </kbd>
      </li>

      <li
        class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out"
      >
        <span>
          Save
          <span class="text-muted">· modifiers always fire</span>
        </span>

        <kbd
          class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-highlighted"
        >
          {{ formatHotkey("mod+S") }}
        </kbd>
      </li>

      <li
        class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out"
      >
        <span>
          Preview
          <span class="text-muted">· enableOnFormTags</span>
        </span>

        <kbd
          class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-highlighted"
        >
          {{ formatHotkey("P") }}
        </kbd>
      </li>
    </ul>

    <div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
      <span
        class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
      >
        Last fired
      </span>

      <span
        class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
        :data-state="log ? 'active' : undefined"
      >
        {{ log ?? "nothing yet" }}
      </span>
    </div>
  </div>
</template>
