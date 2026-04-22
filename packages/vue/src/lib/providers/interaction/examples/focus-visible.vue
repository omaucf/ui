<script lang="ts" setup>
  import { ref } from "vue";

  import { useFocusVisible } from "@veehance/vue/interaction";

  const isFocusVisible = useFocusVisible();
  const focused = ref(false);
</script>

<template>
  <div class="flex flex-col gap-3 p-4 font-sans">
    <p class="text-muted text-sm">
      Focus visible: {{ String(isFocusVisible) }}
    </p>

    <button
      class="
        w-fit cursor-pointer rounded-md border border-muted px-4 py-2 text-sm hover:bg-elevated
        data-[focus-visible]:outline-2
        data-[focus-visible]:outline-blue-500
        data-[focus-visible]:outline-offset-2
      "
      type="button"
      :data-focus-visible="focused && isFocusVisible ? '' : undefined"
      @blur="focused = false"
      @focus="focused = true"
    >
      Tab or click me
    </button>
  </div>
</template>
