<script lang="ts" setup>
  import { isArray } from "radashi";

  import { Factory } from "@/elements/factory";

  import type { LinkBaseProps } from "./link.types";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<LinkBaseProps>(), { type: "button" });

  function onClickWrapper(e: MouseEvent) {
    if (props.disabled) {
      e.stopPropagation();
      e.preventDefault();
      return;
    }

    if (props.onClick) {
      for (const onClick of isArray(props.onClick)
        ? props.onClick
        : [props.onClick]) {
        onClick(e);
      }
    }

    if (props.href && props.navigate && !props.isExternal) {
      props.navigate(e);
    }
  }
</script>

<template>
  <Factory.a
    v-if="href"
    :aria-disabled="disabled ? 'true' : undefined"
    :class="props.class"
    :data-active="active ? 'true' : undefined"
    :data-scope="raw ? undefined : 'link'"
    v-bind="{
      href: disabled ? undefined : href,
      rel: rel ? rel : undefined,
      role: disabled ? 'link' : undefined,
      tabindex: disabled ? -1 : undefined,
      target: target ? target : undefined,
      ...$attrs
    }"
    @click="onClickWrapper"
  >
    <slot />
  </Factory.a>
  <Factory.button
    v-else
    :class="props.class"
    :data-active="active ? 'true' : undefined"
    :data-scope="raw ? undefined : 'link'"
    v-bind="{ disabled, type, ...$attrs }"
    @click="onClickWrapper"
  >
    <slot />
  </Factory.button>
</template>
