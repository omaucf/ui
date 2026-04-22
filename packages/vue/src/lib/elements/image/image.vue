<script lang="ts" setup>
  import { useForwardExpose, useForwardProps } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import { Image as RawImage } from "@unpic/vue";
  import { reactivePick } from "@vueuse/core";

  import { Factory } from "@/elements/factory";

  import type { ImageProps } from "./image.types";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<ImageProps>(), {
    layout: "constrained",
  });

  const baseProps = useForwardProps(
    reactivePick(
      props,
      "alt",
      "crossorigin",
      "decoding",
      "loading",
      "height",
      "referrerpolicy",
      "srcset",
      "sizes",
      "width"
    )
  );

  const rawProps = useForwardProps(
    reactivePick(
      props,
      "aspectRatio",
      "background",
      "cdn",
      "layout",
      "objectFit",
      "operations",
      "options",
      "priority"
    )
  );

  useForwardExpose();
</script>

<template>
  <RawImage
    data-scope="image"
    v-if="src && !asChild && !raw"
    :class="cx(ui?.base, props.class)"
    v-bind="{ ...$attrs, ...baseProps, ...rawProps, src }"
  />
  <Factory.img
    data-scope="image"
    v-else
    :as-child="asChild"
    :class="cx(ui?.base, props.class)"
    v-bind="{ ...$attrs, ...baseProps, src }"
  />
</template>
