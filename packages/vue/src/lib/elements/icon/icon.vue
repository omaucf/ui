<script lang="ts" setup>
  import { computed, useAttrs } from "vue";

  import { Factory } from "#build/ui/components";
  import { useForwardExpose, useIcon } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { IconProps } from "./icon.types";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<IconProps>();

  const attrs = useAttrs();
  const { icon, isDynamic, svg } = useIcon(props.name, props.raw);

  const baseProps = computed(() => ({
    "aria-hidden":
      attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : true,
    role: attrs["aria-label"] || attrs["aria-labelledby"] ? "img" : undefined,
  }));

  useForwardExpose();
</script>

<template>
  <Factory.svg
    data-scope="icon"
    v-if="!isDynamic && svg"
    :as-child="asChild"
    :class="cx(ui?.base, props.class)"
    v-html="svg.body"
    v-bind="{ ...$attrs, ...baseProps, ...svg.attributes }"
  />
  <Factory.span
    data-scope="icon"
    v-else
    :as-child="asChild"
    :class="cx(icon, ui?.base, props.class)"
    v-bind="{ ...$attrs, ...baseProps }"
  />
</template>
