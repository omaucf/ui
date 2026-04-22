<script lang="ts">
  import { useIcon } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import { Factory } from "$lib/elements/factory";

  import type { IconProps } from "./icon.types";

  let {
    as = "span",
    class: className,
    name,
    raw,
    ref = $bindable(null),
    ui,
    ...attrs
  }: IconProps = $props();

  const baseProps = $derived({
    "aria-hidden":
      attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : true,
    role: attrs["aria-label"] || attrs["aria-labelledby"] ? "img" : undefined,
  });

  const iconProps = $derived(useIcon(name, raw));
</script>

{#if !iconProps.isDynamic && iconProps.svg}
  <Factory
    {...(attrs as any)}
    {...baseProps}
    {...iconProps.svg.attributes}
    as="svg"
    class={cx(ui?.base, className)}
    data-scope="icon"
    {ref}
  >
    {@html iconProps.svg.body}
  </Factory>
{:else}
  <Factory
    {...attrs}
    {...baseProps}
    {as}
    class={cx(iconProps.icon, ui?.base, className)}
    data-scope="icon"
    {ref}
  />
{/if}
