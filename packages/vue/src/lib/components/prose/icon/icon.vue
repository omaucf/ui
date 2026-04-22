<script lang="ts" setup>
  import { Icon } from "#build/ui/components";
  import { useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { ProseIconProps } from "./icon.types";

  const props = defineProps<ProseIconProps>();

  useForwardExpose();
</script>

<template>
  <Icon :class="cx(props.class)" :name="props.name" :raw="props.raw" />
</template>
