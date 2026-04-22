<script lang="ts" setup>
  import { computed } from "vue";

  import {
    useForwardExpose,
    useForwardProps,
    useRoute,
  } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import { reactiveOmit } from "@vueuse/core";
  import { isEqual } from "ohash/utils";
  import { isString } from "radashi";
  import { hasProtocol } from "ufo";
  import { RouterLink as RawLink } from "vue-router";

  import { Dynamic } from "@/utils/dynamic";
  import { isPartiallyEqual } from "@/utils/link";

  import type { LinkProps } from "./link.types";
  import LinkBase from "./link-base";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<LinkProps>(), {
    active: undefined,
    ariaCurrentValue: "page",
    type: "button",
  });

  const baseProps = useForwardProps(
    reactiveOmit(
      props,
      "active",
      "activeClass",
      "disabled",
      "custom",
      "exact",
      "exactHash",
      "exactQuery",
      "href",
      "inactiveClass",
      "noRel",
      "to",
      "type"
    )
  );

  const route = useRoute();
  const to = computed(() => props.to ?? props.href);

  const isExternal = computed(() => {
    if (props.external) return true;
    if (!to.value) return false;
    return (
      isString(to.value) && hasProtocol(to.value, { acceptRelative: true })
    );
  });

  const hasTarget = computed(() => !!props.target && props.target !== "_self");

  const rel = computed(() => {
    if (props.noRel) return null;
    if (props.rel !== undefined) return props.rel || null;
    if (isExternal.value || hasTarget.value) return "noopener noreferrer";
    return null;
  });

  function isLinkActive({
    route: linkRoute,
    isActive,
    isExactActive,
  }: any = {}) {
    if (props.active !== undefined) return props.active;
    if (!to.value || to.value === "/") return false;

    if (props.exactQuery === "partial") {
      if (!isPartiallyEqual(linkRoute.query, route.query)) return false;
    } else if (
      props.exactQuery === true &&
      !isEqual(linkRoute.query, route.query)
    )
      return false;

    if (props.exactHash && linkRoute.hash !== route.hash) return false;
    if (props.exact && isExactActive) return true;
    if (!props.exact && isActive) return true;
    return false;
  }

  function resolveLinkClass(active = false) {
    if (props.raw)
      return cx(props.class, active ? props.activeClass : props.inactiveClass);
    return cx(
      props.ui?.base,
      active ? props.activeClass : props.inactiveClass,
      props.class
    );
  }

  useForwardExpose();
</script>

<template>
  <RawLink
    custom
    v-if="!isExternal && !!to"
    v-slot="{ href, isActive, isExactActive, navigate, route: linkRoute }"
    v-bind="{...baseProps}"
    :to="to"
  >
    <Dynamic v-if="custom">
      <slot
        v-bind="{
          ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
          active: isLinkActive({ isActive, isExactActive, route: linkRoute }),
          disabled,
          href,
          isExternal,
          navigate,
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
        ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
        active: isLinkActive({ isActive, isExactActive, route: linkRoute }),
        disabled,
        href,
        isExternal,
        navigate,
        raw,
        rel,
        target,
        type,
        ...$attrs
      }"
      :class="resolveLinkClass(isLinkActive({ isActive, isExactActive, route: linkRoute }))"
    >
      <slot
        :active="isLinkActive({ isActive, isExactActive, route: linkRoute })"
      />
    </LinkBase>
  </RawLink>
  <Dynamic v-else-if="custom">
    <slot
      v-bind="{
        active: active ?? false,
        disabled,
        href: to,
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
      active: active ?? false,
      disabled,
      href: to as string,
      isExternal,
      raw,
      rel,
      target,
      type,
      ...$attrs
    }"
    :class="resolveLinkClass(active)"
  >
    <slot :active="active ?? false" />
  </LinkBase>
</template>
