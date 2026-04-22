<script lang="ts" module>
  import type { HTMLAttributes } from "svelte/elements";

  import type { ContainerTheme } from "./container.types";

  export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
    class?: any;
    ref?: Element | null;
    ui?: Partial<ContainerTheme["slots"]>;
  }
</script>

<script lang="ts">
  import { ui as theme } from "@iueev/core/theme";
  import { cv } from "@iueev/core/utils";

  let {
    children,
    class: className,
    ref = $bindable(null),
    ui: overrides,
    ...attrs
  }: ContainerProps = $props();

  const ui = cv(theme.container);
</script>

<div
  class={ui({ className: [overrides?.base, className] })}
  data-scope="container"
  bind:this={ref}
  {...attrs}
>
  {@render children?.()}
</div>
