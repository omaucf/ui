<script module lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}
</script>

<script lang="ts">
  import { cn } from "@veehance/core/utils";

  let { children, class: className, ...props }: ContainerProps = $props();

  const mergedProps = $derived({
    ...props,
    class: cn("", className),
    "data-slot": "container",
  });
</script>

<div {...mergedProps}>{@render children?.()}</div>
