<script lang="ts" setup>
  import { Image } from "#build/ui/components";
  import { useForwardExpose } from "#build/ui/imports";
  import { cc, cx } from "#build/ui/utils";

  import type { ColorModeImageProps } from "./image.types";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<ColorModeImageProps>();

  useForwardExpose();
</script>

<template>
  <Image
    :class="cx(cc('dark:hidden'), ui?.base, props.class)"
    :src="light"
    v-bind="$attrs"
  />
  <Image
    :class="cx(cc('hidden dark:inline-block'), ui?.base, props.class)"
    :src="dark"
    v-bind="$attrs"
  />
</template>
