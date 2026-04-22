<script lang="ts" setup>
  import { computed } from "vue";

  import { Factory } from "#build/ui/components";
  import { useAppConfig, useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { ProseH4Props } from "./h4.types";

  const props = defineProps<ProseH4Props>();

  const appConfig = useAppConfig() as {
    prose?: { headings?: { anchorLinks?: { h4?: boolean } } };
  };

  const generate = computed(
    () =>
      props.id &&
      (props.anchor ?? appConfig.prose?.headings?.anchorLinks?.h4 ?? false)
  );

  useForwardExpose();
</script>

<template>
  <Factory.h4 :class="cx(props.class)" :id="props.id">
    <!-- biome-ignore lint/a11y/useAnchorContent: safe_to_set -->
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </Factory.h4>
</template>
