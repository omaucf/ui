<script lang="ts" setup>
  import { computed } from "vue";

  import { Factory } from "#build/ui/components";
  import { useAppConfig, useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { ProseH2Props } from "./h2.types";

  const props = defineProps<ProseH2Props>();

  const appConfig = useAppConfig() as {
    prose?: { headings?: { anchorLinks?: { h2?: boolean } } };
  };

  const generate = computed(
    () =>
      props.id &&
      (props.anchor ?? appConfig.prose?.headings?.anchorLinks?.h2 ?? false)
  );

  useForwardExpose();
</script>

<template>
  <Factory.h2 :class="cx(props.class)" :id="props.id">
    <!-- biome-ignore lint/a11y/useAnchorContent: safe_to_set -->
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </Factory.h2>
</template>
