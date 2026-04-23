<script module lang="ts">
  import type { HTMLAttributes } from "svelte/elements";

  export interface MainProps extends HTMLAttributes<HTMLElement> {}
</script>

<script lang="ts">
  import { cn } from "@veehance/core/utils";

  let { children, class: className, ...props }: MainProps = $props();

  const mergedProps = $derived({
    ...props,
    class: cn("", className),
    "data-slot": "main",
  });
</script>

<main {...mergedProps}>{@render children?.()}</main>
