<script lang="ts">
  import { useFocusVisible } from "@veehance/svelte/interaction";

  const isFocusVisible = useFocusVisible({ isTextInput: true });
  let focusedField = $state<string | null>(null);
</script>

<div class="flex flex-col gap-3 p-4">
  <p class="text-muted text-sm">Focus visible: {String(isFocusVisible())}</p>
  <div class="flex flex-col gap-1">
    <label class="font-medium text-sm" for="first-name">First Name</label>
    <input
      class="
        rounded-md border border-muted px-2.5 py-1.5 text-sm
        data-[focus-visible]:outline-2
        data-[focus-visible]:outline-blue-500
        data-[focus-visible]:outline-offset-2
      "
      data-focus-visible={focusedField === 'first' && isFocusVisible() ? '' : undefined}
      id="first-name"
      onblur={() => (focusedField = null)}
      onfocus={() => (focusedField = 'first')}
      type="text"
    >
  </div>
  <div class="flex flex-col gap-1">
    <label class="font-medium text-sm" for="last-name">Last Name</label>
    <input
      class="
        rounded-md border border-muted px-2.5 py-1.5 text-sm
        data-[focus-visible]:outline-2
        data-[focus-visible]:outline-blue-500
        data-[focus-visible]:outline-offset-2
      "
      data-focus-visible={focusedField === 'last' && isFocusVisible() ? '' : undefined}
      id="last-name"
      onblur={() => (focusedField = null)}
      onfocus={() => (focusedField = 'last')}
      type="text"
    >
  </div>
</div>
