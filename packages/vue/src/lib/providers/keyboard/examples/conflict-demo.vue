<script lang="ts" setup>
  import { ref } from "vue";

  import {
    type HotkeyStore,
    useHotkeyRegistrations,
    useHotkeys,
  } from "@veehance/vue/keyboard";

  const props = defineProps<{ store: HotkeyStore }>();

  const fired = ref<string[]>([]);

  useHotkeys({
    commands: [
      {
        action: () => fired.value.push("First"),
        hotkey: "mod+K",
        id: "first",
        label: "First",
      },
      {
        action: () => fired.value.push("Second"),
        hotkey: "mod+K",
        id: "second",
        label: "Second",
      },
    ],
    store: props.store,
  });

  const commands = useHotkeyRegistrations({ store: props.store });
</script>

<template>
  <div class="flex flex-col items-start gap-2 border-t border-default pt-3.5">
    <span
      class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
    >
      Registered on mod+K
    </span>

    <div class="flex min-h-7 flex-wrap items-center gap-1.5">
      <span class="text-highlighted italic" v-if="commands.length === 0">
        none
      </span>

      <span
        class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted"
        v-for="command in commands"
        v-else
        :key="command.id"
      >
        {{ command.label }}
      </span>
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
      :data-state="fired.length > 0 ? 'active' : undefined"
    >
      {{ fired.slice(-2).join(" + ") || "nothing yet" }}
    </span>
  </div>
</template>
