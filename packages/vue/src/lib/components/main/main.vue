<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export interface MainProps {
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  import { cn } from "@veehance/core/utils";

  const props = defineProps<MainProps>();
</script>

<template>
  <main
    :class="cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', props.class)"
    data-slot="main"
  >
    <slot />
  </main>
</template>
