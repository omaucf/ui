<script lang="ts" setup>
  import { computed, ref } from "vue";

  import {
    type ConflictBehavior,
    createHotkeyStore,
  } from "@veehance/vue/keyboard";

  import ConflictDemo from "./conflict-demo.vue";

  const BEHAVIORS: ConflictBehavior[] = ["warn", "replace", "allow"];

  const behavior = ref<ConflictBehavior>("warn");

  // Conflict behavior is fixed when the store is created, so switching it makes a new store.
  const store = computed(() =>
    createHotkeyStore({ conflictBehavior: behavior.value })
  );
</script>

<template>
  <div
    class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-highlighted shadow-sm"
  >
    <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
      Two commands claim the same shortcut. Pick how the store resolves it, then
      press it.
    </p>

    <div class="flex flex-wrap items-center gap-2.5">
      <button
        class="inline-flex items-center justify-center rounded-md border border-default bg-default px-3 py-1.5 text-sm font-medium text-highlighted transition-colors hover:bg-accented focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-subtle"
        type="button"
        v-for="value in BEHAVIORS"
        :key="value"
        @click="behavior = value"
      >
        {{ value }}
      </button>
    </div>

    <ConflictDemo :key="behavior" :store="store" />
  </div>
</template>
