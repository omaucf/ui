<script generics="T extends DOMElements" lang="ts">
  import { mergeProps } from "@zag-js/svelte";
  import { isString } from "radashi";

  import type { DOMElements, PropsFn, RefAttribute } from "$lib/types/element";

  import type { FactoryProps } from "./factory.types";

  let {
    as,
    asChild,
    children,
    ref = $bindable(null),
    ...attrs
  }: FactoryProps<T> & RefAttribute = $props();

  const propsFn: PropsFn<T> = (props) => mergeProps(attrs, props ?? {});

  const voidHTMLTags = ["area", "br", "col", "embed", "hr", "img", "input"];
  const isVoidHTMLTag = (e: unknown) => isString(e) && voidHTMLTags.includes(e);
</script>

{#if asChild}
  {@render asChild?.(propsFn)}
{:else if isVoidHTMLTag(as)}
  <svelte:element this={as} {...attrs} bind:this={ref} />
{:else if as === 'textarea'}
  <textarea {...attrs} bind:this={ref}></textarea>
{:else}
  <svelte:element this={as} {...attrs} bind:this={ref}>
    {@render children?.()}
  </svelte:element>
{/if}
