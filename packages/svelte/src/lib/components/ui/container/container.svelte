<script lang="ts">
  import { Factory } from "#build/ui/components";
  import { cx } from "#build/ui/utils";

  import type { ContainerProps } from "./container.types";

  let {
    as = "div",
    children,
    class: className,
    ref = $bindable(null),
    ui,
    ...attrs
  }: ContainerProps = $props();
</script>

<Factory
  {...attrs}
  {as}
  class={cx(ui?.base, className)}
  data-scope="container"
  {ref}
>
  {@render children?.()}
</Factory>
