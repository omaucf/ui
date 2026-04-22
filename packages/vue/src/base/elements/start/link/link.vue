<script lang="ts" setup>
  import { computed } from "vue";

  import { useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import { useLocation } from "@tanstack/vue-router";
  import { isString } from "radashi";
  import { hasProtocol } from "ufo";

  import { Dynamic } from "@/utils/dynamic";

  import type { LinkProps } from "./link.types";
  import LinkBase from "./link-base.vue";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<LinkProps>(), {
    active: undefined,
    ariaCurrentValue: "page",
    type: "button",
  });

  const page = useLocation();
  const href = computed(() => props.to ?? props.href);

  const isExternal = computed(() => {
    if (props.target === "_blank" || props.external) return true;
    if (!href.value) return false;
    return (
      isString(href.value) && hasProtocol(href.value, { acceptRelative: true })
    );
  });

  const hasTarget = computed(() => !!props.target && props.target !== "_self");

  const rel = computed(() => {
    if (props.noRel) return null;
    if (props.rel) return props.rel;
    if (isExternal.value || hasTarget.value) return "noopener noreferrer";
    return null;
  });

  const isActive = computed(() => {
    if (props.active !== undefined) return props.active;
    if (!href.value || href.value === "/") return false;
    if (props.exact && page.value.pathname === href.value) return true;
    if (!props.exact && page.value.pathname.startsWith(href.value)) return true;
    return false;
  });

  const linkClass = computed(() => {
    if (props.raw)
      return cx(
        props.class,
        isActive.value ? props.activeClass : props.inactiveClass
      );
    return cx(
      props.ui?.base,
      props.class,
      isActive.value ? props.activeClass : props.inactiveClass
    );
  });

  useForwardExpose();
</script>

<template>
  <Dynamic v-if="custom">
    <slot
      v-bind="{
        active: isActive,
        disabled,
        href,
        isExternal,
        raw,
        rel,
        target,
        type,
        ...$attrs
      }"
    />
  </Dynamic>
  <LinkBase
    v-else
    v-bind="{
      active: isActive,
      disabled,
      href,
      isExternal,
      raw,
      rel,
      target,
      type,
      ...$attrs
    }"
    :class="linkClass"
  >
    <slot :active="isActive" />
  </LinkBase>
</template>
