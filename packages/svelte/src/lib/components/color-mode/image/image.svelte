<script lang="ts">
  import { Image } from "#build/ui/components";
  import { cc, cn } from "#build/ui/utils";

  import type { ColorModeImageProps } from "./image.types";

  let {
    class: className,
    light,
    dark,
    ref = $bindable(null),
    ui,
    ...attrs
  }: ColorModeImageProps = $props();
</script>

<Image
  class={cn(cc('dark:hidden'), ui?.base, className)}
  {ref}
  src={light}
  {...attrs}
/>
<Image
  class={cn(cc('hidden dark:inline-block'), ui?.base, className)}
  {ref}
  src={dark}
  {...attrs}
/>
