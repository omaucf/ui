<script lang="ts" setup>
  import { computed } from "vue";

  import { Factory } from "#build/ui/components";
  import { useAppConfig, useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { ProseH1Props } from "./h1.types";

  const props = defineProps<ProseH1Props>();

  const appConfig = useAppConfig() as {
    prose?: { headings?: { anchorLinks?: { h1?: boolean } } };
  };

  const generate = computed(
    () =>
      props.id &&
      (props.anchor ?? appConfig.prose?.headings?.anchorLinks?.h1 ?? false)
  );

  useForwardExpose();
</script>

<template>
  <Factory.h1 :class="cx(props.class)" :id="props.id">
    <!-- biome-ignore lint/a11y/useAnchorContent: safe_to_set -->
    <a v-if="props.id && generate" :href="`#${props.id}`">
      <slot />
    </a>
    <slot v-else />
  </Factory.h1>
</template>
