<script lang="ts" setup>
  import { Factory } from "#build/ui/components";
  import { useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { ContainerProps } from "./container.types";

  const props = defineProps<ContainerProps>();

  useForwardExpose();
</script>

<template>
  <Factory.div
    data-scope="container"
    :as-child="asChild"
    :class="cx(ui?.base, props.class)"
  >
    <slot />
  </Factory.div>
</template>
