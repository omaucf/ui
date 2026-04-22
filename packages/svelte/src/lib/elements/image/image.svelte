<script lang="ts">
  import { cx } from "#build/ui/utils";

  import { Image as RawImage } from "@unpic/svelte";

  import { Factory } from "$lib/elements/factory";

  import type { ImageProps } from "./image.types";

  let {
    alt = "",
    as = "img",
    asChild,
    aspectRatio,
    cdn,
    class: className,
    crossorigin,
    height,
    layout = "constrained",
    objectFit,
    operations,
    options,
    priority,
    ref = $bindable(null),
    raw = false,
    src,
    ui,
    width,
    ...attrs
  }: ImageProps = $props();
</script>

{#if src && !asChild && !raw}
  <RawImage
    {...attrs}
    {alt}
    {aspectRatio}
    {cdn}
    class={cx(ui?.base, className)}
    {crossorigin}
    data-scope="image"
    {height}
    {layout}
    {objectFit}
    {operations}
    {options}
    {priority}
    {ref}
    {src}
    {width}
  />
{:else}
  <Factory
    {...attrs}
    {alt}
    {as}
    {asChild}
    class={cx(ui?.base, className)}
    {crossorigin}
    data-scope="image"
    {height}
    {ref}
    {src}
    {width}
  />
{/if}
