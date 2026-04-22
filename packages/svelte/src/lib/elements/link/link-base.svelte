<script lang="ts">
  import { Factory } from "$lib/elements/factory";

  import type { LinkBaseProps } from "./link.types";

  let {
    active,
    as = "a",
    children,
    disabled,
    href,
    isExternal,
    onclick,
    raw,
    ref = $bindable(null),
    rel,
    target,
    type = "button",
    ...attrs
  }: LinkBaseProps = $props();

  function onClickWrapper(event: MouseEvent) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    onclick?.(event);
  }
</script>

{#if href}
  <Factory
    aria-disabled={disabled ? "true" : undefined}
    {as}
    data-active={active ? "true" : undefined}
    data-scope={raw ? undefined : "link"}
    href={disabled ? undefined : href}
    onclick={onClickWrapper}
    {ref}
    rel={rel || undefined}
    role={disabled ? "link" : undefined}
    tabindex={disabled ? -1 : undefined}
    target={target || undefined}
    {...attrs}
  >
    {@render children?.()}
  </Factory>
{:else}
  <Factory
    as="button"
    data-active={active ? "true" : undefined}
    data-scope={raw ? undefined : "link"}
    {disabled}
    onclick={onClickWrapper}
    {ref}
    {type}
    {...attrs as any}
  >
    {@render children?.()}
  </Factory>
{/if}
