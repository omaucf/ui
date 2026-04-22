<script lang="ts" setup>
  import { computed } from "vue";

  import { NuxtLink as RawLink } from "#build/ui/components";
  import {
    useForwardExpose,
    useForwardProps,
    useNuxtApp,
    useRoute,
  } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import { reactiveOmit } from "@vueuse/core";
  import { isEqual } from "ohash/utils";
  import { isString } from "radashi";
  import { hasProtocol } from "ufo";
  import type { RouteLocationRaw } from "vue-router";

  import LinkBase from "@/elements/link/link-base.vue";
  import { Dynamic } from "@/utils/dynamic";
  import { isPartiallyEqual } from "@/utils/link";

  import type { LinkBaseProps, LinkProps, LinkSlots } from "./link.types";

  defineOptions({ inheritAttrs: false });

  const props = withDefaults(defineProps<LinkProps>(), {
    active: undefined,
    ariaCurrentValue: "page",
    locale: undefined,
    type: "button",
  });

  defineSlots<LinkSlots>();

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
      "locale",
      "noRel",
      "to",
      "type"
    )
  );

  const nuxtApp = useNuxtApp();
  const route = useRoute();

  const to = computed(() => {
    const path = props.to ?? props.href;

    if (!path) return path;
    if (!isString(path)) return path;

    if (props.external || hasProtocol(path, { acceptRelative: true }))
      return path;
    if (props.locale === false) return path;

    const localePath = nuxtApp.$localePath as
      | ((route: RouteLocationRaw, locale?: string) => string)
      | undefined;

    if (!localePath) return path;

    const codes = nuxtApp.$i18n?.localeCodes?.value;
    if (
      codes?.length &&
      new RegExp(`^/(${codes.join("|")})($|[/?#])`).test(path)
    )
      return path;

    return localePath(path, isString(props.locale) ? props.locale : undefined);
  });

  const isInternalLink = computed(() => {
    if (!to.value) return false;
    if (props.external) return false;
    if (!isString(to.value)) return true;
    if (hasProtocol(to.value, { acceptRelative: true })) return false;
    if (props.target && props.target !== "_self") return false;
    return true;
  });

  const externalRel = computed(() => {
    if (props.noRel) return null;
    if (props.rel) return props.rel;
    return "noopener noreferrer";
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

  function resolveLinkClass({
    route: linkRoute,
    isActive,
    isExactActive,
  }: any = {}) {
    const active = isLinkActive({ isActive, isExactActive, route: linkRoute });
    if (props.raw)
      return cx(props.class, active ? props.activeClass : props.inactiveClass);
    return cx(
      props.ui?.base,
      props.class,
      active ? props.activeClass : props.inactiveClass
    );
  }

  useForwardExpose();
</script>

<template>
  <RawLink
    custom
    v-if="isInternalLink"
    v-slot="{ href, isActive, isExactActive, navigate, route: linkRoute, ...rest }"
    v-bind="{ ...baseProps }"
    :to="to"
  >
    <Dynamic v-if="custom">
      <slot
        v-bind="{
          ...(exact && isExactActive ? { 'aria-current': props.ariaCurrentValue } : {}),
          active: isLinkActive({ isActive, isExactActive, route: linkRoute }),
          disabled,
          href,
          isExternal: (rest as LinkBaseProps).isExternal,
          navigate,
          rel: (rest as LinkBaseProps).rel,
          target: (rest as LinkBaseProps).target,
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
        isExternal: (rest as LinkBaseProps).isExternal,
        navigate,
        rel: (rest as LinkBaseProps).rel,
        target: (rest as LinkBaseProps).target,
        type,
        ...$attrs
      }"
      :class="resolveLinkClass({ isActive, isExactActive, route: linkRoute })"
    >
      <slot
        :active="isLinkActive({ isActive,isExactActive,route: linkRoute })"
      />
    </LinkBase>
  </RawLink>

  <Dynamic v-else-if="custom">
    <slot
      v-bind="{
        active: active ?? false,
        disabled,
        type,
        ...(to ? { href: String(to), isExternal: true, rel: externalRel, target: props.target } : {}),
        ...$attrs
      }"
    />
  </Dynamic>

  <LinkBase
    v-else
    v-bind="{
      active: active ?? false,
      disabled,
      type,
      ...(to ? { href: String(to), isExternal: true, rel: externalRel, target: props.target } : {}),
      ...$attrs,
    }"
    :class="resolveLinkClass()"
  >
    <slot :active="active ?? false" />
  </LinkBase>
</template>
