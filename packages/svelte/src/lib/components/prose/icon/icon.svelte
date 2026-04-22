<script lang="ts">
  import { Icon } from "#build/ui/components";
  import { cx } from "#build/ui/utils";

  import type { ProseIconProps } from "./icon.types";

  let {
    name,
    class: className,
    ref = $bindable(null),
    raw,
    ui,
    ...attrs
  }: ProseIconProps = $props();
</script>

<Icon {...attrs} class={cx(ui?.base, className)} {name} {raw} {ref} />
