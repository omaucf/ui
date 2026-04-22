<script lang="ts" setup>
  import { ref } from "vue";

  import { useFormatHotkey, useHotkey } from "@veehance/vue/keyboard";

  const count = ref(0);
  const formatHotkey = useFormatHotkey();

  useHotkey({
    action: () => {
      count.value += 1;
    },
    hotkey: "mod+K",
  });
</script>

<template>
  <div
    class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-accented shadow-sm"
  >
    <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
      Press
      <kbd
        class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented"
      >
        {{ formatHotkey("mod+K") }}
      </kbd>
      anywhere on this page
    </p>

    <div class="flex items-baseline gap-2 border-t border-default pt-3.5">
      <span
        class="text-[1.75rem] font-bold leading-none tabular-nums text-accented"
      >
        {{ count }}
      </span>

      <span class="text-muted">
        {{ count === 1 ? "time" : "times" }}
      </span>
    </div>
  </div>
</template>
