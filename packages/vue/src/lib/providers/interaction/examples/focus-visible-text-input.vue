<script lang="ts" setup>
  import { ref } from "vue";

  import { useFocusVisible } from "@veehance/vue/interaction";

  const isFocusVisible = useFocusVisible({ isTextInput: true });
  const focusedField = ref<string | null>(null);
</script>

<template>
  <div class="flex flex-col gap-3 p-4">
    <p class="text-muted text-sm">
      Focus visible: {{ String(isFocusVisible) }}
    </p>

    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm" for="first-name"> First Name </label>

      <input
        class="
          rounded-md border border-muted px-2.5 py-1.5 text-sm
          data-[focus-visible]:outline-2
          data-[focus-visible]:outline-blue-500
          data-[focus-visible]:outline-offset-2
        "
        id="first-name"
        type="text"
        :data-focus-visible="focusedField === 'first' && isFocusVisible ? '' : undefined"
        @blur="focusedField = null"
        @focus="focusedField = 'first'"
      >
    </div>

    <div class="flex flex-col gap-1">
      <label class="font-medium text-sm" for="last-name"> Last Name </label>

      <input
        class="
          rounded-md border border-muted
          px-2.5 py-1.5 text-sm
          data-[focus-visible]:outline-2
          data-[focus-visible]:outline-blue-500
          data-[focus-visible]:outline-offset-2
        "
        id="last-name"
        type="text"
        :data-focus-visible="focusedField === 'last' && isFocusVisible ? '' : undefined"
        @blur="focusedField = null"
        @focus="focusedField = 'last'"
      >
    </div>
  </div>
</template>
