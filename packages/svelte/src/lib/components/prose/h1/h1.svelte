<script lang="ts">
  import { Factory } from "#build/ui/components";
  import { useAppConfig } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { ProseH1Props } from "./h1.types";

  let {
    as = "h1",
    anchor,
    children,
    class: className,
    id,
    ref = $bindable(null),
    ui,
    ...attrs
  }: ProseH1Props = $props();

  const appConfig = useAppConfig() as {
    prose?: { headings?: { anchorLinks?: { h1?: boolean } } };
  };

  const generate = $derived(
    () => id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h1 ?? false)
  );
</script>

<Factory {...attrs} {as} class={cx(className)} {id}>
  {#if id && generate()}
    <a href={`#${id}`}> {@render children?.()} </a>
  {:else}
    {@render children?.()}
  {/if}
</Factory>
