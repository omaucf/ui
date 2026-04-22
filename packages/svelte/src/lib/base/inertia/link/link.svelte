<script lang="ts">
  import { cx } from "#build/ui/utils";

  import { usePage } from "@inertiajs/svelte";
  import { hasProtocol } from "ufo";

  import type { LinkProps } from "./link.types";
  import LinkBase from "./link-base.svelte";

  let {
    active,
    activeClass,
    ariaCurrentValue = "page",
    children,
    class: className,
    custom,
    disabled,
    exact,
    external,
    href,
    inactiveClass,
    noRel,
    raw,
    rel,
    target,
    to,
    type = "button",
    ui,
    ...attrs
  }: LinkProps = $props();

  const page = usePage();

  const resolvedHref = $derived(to ?? href);

  const isExternal = $derived.by(() => {
    if (target === "_blank") return true;
    if (external) return true;
    if (!resolvedHref) return false;
    return hasProtocol(resolvedHref, { acceptRelative: true });
  });

  const hasTarget = $derived(!!target && target !== "_self");

  const resolvedRel = $derived.by(() => {
    if (noRel) return;
    if (rel) return rel;
    if (isExternal || hasTarget) return "noopener noreferrer";
  });

  const isActive = $derived.by(() => {
    if (active !== undefined) return active;
    if (!resolvedHref || resolvedHref === "/") return false;
    if (exact && page.url === resolvedHref) return true;
    if (!exact && page.url.startsWith(resolvedHref)) return true;
    return false;
  });

  const linkClass = $derived.by(() => {
    if (raw) return cx(className, isActive ? activeClass : inactiveClass);
    return cx(ui?.base, className, isActive ? activeClass : inactiveClass);
  });
</script>

{#if custom}
  {@render custom({
    active: isActive,
    class: linkClass,
    disabled,
    href: resolvedHref,
    isExternal,
    raw,
    rel: resolvedRel,
    target: target || (isExternal ? "_blank" : undefined),
    type,
    ...attrs
  })}
{:else}
  <LinkBase
    active={isActive}
    class={linkClass}
    {disabled}
    href={resolvedHref}
    {isExternal}
    {raw}
    rel={resolvedRel}
    target={target || (isExternal ? "_blank" : undefined)}
    {type}
    {...attrs}
  >
    {@render children?.({ active: isActive })}
  </LinkBase>
{/if}
