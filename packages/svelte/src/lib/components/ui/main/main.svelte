<script lang="ts">
  import { Factory } from "#build/ui/components";
  import { cx } from "#build/ui/utils";

  import type { MainProps } from "./main.types";

  let {
    as = "main",
    children,
    class: className,
    ref = $bindable(null),
    ui,
    ...attrs
  }: MainProps = $props();
</script>

<Factory
  {...attrs}
  {as}
  class={cx(ui?.base, className)}
  data-scope="main"
  {ref}
>
  {@render children?.()}
</Factory>
