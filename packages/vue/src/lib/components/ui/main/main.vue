<script lang="ts" setup>
  import { Factory } from "#build/ui/components";
  import { useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { MainProps } from "./main.types";

  const props = defineProps<MainProps>();

  useForwardExpose();
</script>

<template>
  <Factory.main
    data-scope="main"
    :as-child="asChild"
    :class="cx(ui?.base, props.class)"
  >
    <slot />
  </Factory.main>
</template>
