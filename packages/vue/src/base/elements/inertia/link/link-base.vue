<script lang="ts" setup>
  import { Factory } from "#build/ui/components";

  import { Link as RawLink } from "@inertiajs/vue3";
  import { isArray } from "radashi";

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
  }
</script>

<template>
  <RawLink
    v-if="!!href && !isExternal && !disabled"
    :class="props.class"
    :data-active="active ? 'true' : undefined"
    :data-scope="raw ? undefined : 'link'"
    :href="href"
    v-bind="{
      rel,
      target,
      ...$attrs
    }"
    @click="onClickWrapper"
  >
    <slot />
  </RawLink>
  <Factory.a
    v-else-if="href"
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
