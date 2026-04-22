<script lang="ts">
  import { useFocusVisible } from "@veehance/svelte/interaction";

  const isFocusVisible = useFocusVisible();
  let focused = $state(false);
</script>

<div class="flex flex-col gap-3 p-4">
  <p class="text-muted text-sm">Focus visible: {String(isFocusVisible())}</p>
  <button
    class="
      w-fit cursor-pointer rounded-md border border-muted px-4 py-2 text-sm hover:bg-elevated
      data-[focus-visible]:outline-2
      data-[focus-visible]:outline-blue-500
      data-[focus-visible]:outline-offset-2
    "
    data-focus-visible={focused && isFocusVisible() ? '' : undefined}
    onblur={() => (focused = false)}
    onfocus={() => (focused = true)}
    type="button"
  >
    Tab or click me
  </button>
</div>
