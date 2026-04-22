<script lang="ts">
  import {
    useFormatHotkey,
    useHotkeys,
    usePlatform,
  } from "@veehance/svelte/keyboard";

  const commands = [
    { category: "File", hotkey: "mod+S", id: "save", label: "Save" },
    { category: "Edit", hotkey: "mod+Z", id: "undo", label: "Undo" },
    { category: "Edit", hotkey: "mod+shift+Z", id: "redo", label: "Redo" },
  ];

  let lastFired = $state<string | null>(null);
  const platform = usePlatform();
  const formatHotkey = useFormatHotkey();

  useHotkeys({
    commands: commands.map((command) => ({
      ...command,
      action: () => (lastFired = command.id),
    })),
  });
</script>

<div
  class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-accented shadow-sm"
>
  <div class="flex flex-wrap items-center gap-2.5">
    <span
      class="text-[0.6875rem] font-semibold uppercase tracking-[0.04em] text-muted"
    >
      Detected platform
    </span>
    <span
      class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted"
    >
      {platform()}
    </span>
  </div>
  <ul class="m-0 flex list-none flex-col gap-0.5 p-0">
    {#each commands as command (command.id)}
      <li
        class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out data-[fired]:bg-accented"
        data-fired={command.id === lastFired ? '' : undefined}
      >
        <span>{command.label}</span>
        <kbd
          class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented data-[active]:border-accent-muted data-[active]:bg-accented data-[active]:text-accented"
          data-active={command.id === lastFired ? '' : undefined}
        >
          {formatHotkey(command.hotkey)}
        </kbd>
      </li>
    {/each}
  </ul>
</div>
