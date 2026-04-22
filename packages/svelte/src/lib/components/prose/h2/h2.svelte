<script lang="ts">
  import { Factory } from "#build/ui/components";
  import { useAppConfig } from "#build/ui/imports";
  import { cx } from "#build/ui/utils";

  import type { ProseH2Props } from "./h2.types";

  let {
    as = "h2",
    anchor,
    children,
    class: className,
    id,
    ref = $bindable(null),
    ui,
    ...attrs
  }: ProseH2Props = $props();

  const appConfig = useAppConfig() as {
    prose?: { headings?: { anchorLinks?: { h2?: boolean } } };
  };

  const generate = $derived(
    () => id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h2 ?? false)
  );
</script>

<Factory {...attrs} {as} class={cx(className)} {id}>
  {#if id && generate()}
    <a href={`#${id}`}> {@render children?.()} </a>
  {:else}
    {@render children?.()}
  {/if}
</Factory>
