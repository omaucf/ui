<script lang="ts" setup>
  import { NuxtImg as RawImage } from "#build/ui/components";
  import { useForwardExpose, useForwardProps } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import { reactivePick } from "@vueuse/core";

  import { Factory } from "@/elements/factory";

  import type { ImageProps } from "./image.types";

  defineOptions({ inheritAttrs: false });

  const props = defineProps<ImageProps>();

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
      "width"
    )
  );

  const rawProps = useForwardProps(
    reactivePick(
      props,
      "background",
      "densities",
      "fit",
      "format",
      "modifiers",
      "nonce",
      "placeholder",
      "placeholderClass",
      "preload",
      "preset",
      "provider",
      "quality",
      "sizes"
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
