<script lang="ts" setup>
  import { computed, inject } from "vue";

  import { useForwardExpose } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

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

  const href = computed(() => props.to ?? props.href);

  const isExternal = computed(() => {
    if (props.target === "_blank" || props.external) return true;
    if (!href.value) return false;
    return hasProtocol(href.value, { acceptRelative: true });
  });

  const isActive = computed(() => {
    if (props.active !== undefined) return props.active;
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

  const linkRel = computed(() => {
    if (props.noRel) return null;
    if (props.rel) return props.rel;
    if (isExternal.value) return "noopener noreferrer";

    return null;
  });

  const handleNavigation = inject<
    | ((
        event: MouseEvent,
        context: {
          href: string;
          external: boolean;
          target?: string | null;
        }
      ) => void)
    | undefined
  >("ui:router", undefined);

  const navigate = handleNavigation
    ? (e: MouseEvent) => {
        handleNavigation(e, {
          external: isExternal.value,
          href: href.value || "",
          target: props.target || (isExternal.value ? "_blank" : undefined),
        });
      }
    : undefined;

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
        navigate,
        raw,
        rel: linkRel,
        target: target || (isExternal ? '_blank' : undefined),
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
      navigate,
      raw,
      rel: linkRel,
      target: target || (isExternal ? '_blank' : undefined),
      type,
      ...$attrs
    }"
    :class="linkClass"
  >
    <slot :active="isActive" />
  </LinkBase>
</template>
