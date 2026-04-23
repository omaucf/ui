<script lang="ts">
  import type { HTMLAttributes } from "vue";

  export interface ContainerProps {
    class?: HTMLAttributes["class"];
  }
</script>

<script setup lang="ts">
  import { cn } from "@veehance/core/utils";

  const props = defineProps<ContainerProps>();
</script>

<template>
  <div
    :class="cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', props.class)"
    data-slot="container"
  >
    <slot />
  </div>
</template>
