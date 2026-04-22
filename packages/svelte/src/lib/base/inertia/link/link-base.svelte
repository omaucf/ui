<script lang="ts">
  import { Link as RawLink } from "@inertiajs/svelte";

  import { Factory } from "$lib/elements/factory";

  import type { LinkBaseProps } from "./link.types";

  let {
    children,
    href,
    disabled,
    isExternal,
    raw,
    rel,
    target,
    type = "button",
    onclick,
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

{#if href && !isExternal && !disabled}
  <RawLink on:click={onClickWrapper} {rel} {target} to={href} {...attrs}>
    {@render children?.()}
  </RawLink>
{:else if href}
  <Factory
    aria-disabled={disabled ? "true" : undefined}
    as="a"
    data-scope={raw ? undefined : "link"}
    href={disabled ? undefined : href}
    onclick={onClickWrapper}
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
    data-scope={raw ? undefined : "link"}
    {disabled}
    onclick={onClickWrapper}
    {type}
    {...attrs as any}
  >
    {@render children?.()}
  </Factory>
{/if}
