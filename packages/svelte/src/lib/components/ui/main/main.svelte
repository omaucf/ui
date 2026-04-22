<script lang="ts" module>
  import type { HTMLAttributes } from "svelte/elements";

  import type { MainTheme } from "./main.types";

  export interface MainProps extends HTMLAttributes<HTMLElement> {
    class?: any;
    ref?: Element | null;
    ui?: Partial<MainTheme["slots"]>;
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
  }: MainProps = $props();

  const ui = cv(theme.main);
</script>

<main
  class={ui({ className: [overrides?.base, className] })}
  data-scope="main"
  bind:this={ref}
  {...attrs}
>
  {@render children?.()}
</main>
