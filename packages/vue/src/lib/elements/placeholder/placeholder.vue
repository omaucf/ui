<script lang="ts" setup>
  import { Factory } from "#build/ui/components";
  import { cx } from "#build/ui/utils";

  import type { PlaceholderProps } from "./placeholder.types";

  const props = defineProps<PlaceholderProps>();
</script>

<template>
  <Factory.div data-scope="placeholder" :class="cx(ui?.base, props.class)">
    <!-- biome-ignore lint/a11y/noSvgWithoutTitle: safe_to_set -->
    <svg fill="none">
      <defs>
        <pattern
          height="10"
          id="pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e"
          patternUnits="userSpaceOnUse"
          width="10"
          x="0"
          y="0"
        >
          <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3" />
        </pattern>
      </defs>
      <rect
        fill="url(#pattern-5c1e4f0e-62d5-498b-8ff0-cf77bb448c8e)"
        height="100%"
        stroke="none"
        width="100%"
      />
    </svg>

    <slot />
  </Factory.div>
</template>
