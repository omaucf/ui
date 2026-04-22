<script lang="ts" setup>
  import { ref } from "vue";

  import {
    createHotkeyStore,
    useFormatHotkey,
    useHotkeys,
  } from "@veehance/vue/keyboard";

  const commands = [
    { hotkey: "mod+B", id: "bold", label: "Bold", scope: "editor" },
    { hotkey: "mod+P", id: "print", label: "Print", scope: "reader" },
  ];

  const store = createHotkeyStore({ activeScopes: ["editor"] });
  const formatHotkey = useFormatHotkey();
  const scope = ref("editor");
  const fired = ref<string | null>(null);

  useHotkeys({
    commands: commands.map((command) => ({
      action: () => {
        fired.value = command.id;
      },
      hotkey: command.hotkey,
      id: command.id,
      scopes: [command.scope],
    })),
    store,
  });

  const toggle = () => {
    scope.value = scope.value === "editor" ? "reader" : "editor";
    fired.value = null;
    store.setScope(scope.value);
  };
</script>

<template>
  <div
    class="flex w-full max-w-[26rem] flex-col gap-4 rounded-[0.875rem] border border-default bg-elevated p-5 text-sm text-accented shadow-sm"
  >
    <p class="flex flex-wrap items-center gap-2 leading-[1.6] text-muted">
      Only commands in the active scope respond
    </p>

    <div class="flex flex-wrap items-center gap-2.5">
      <button
        class="inline-flex items-center justify-center rounded-md border border-default bg-default px-3 py-1.5 text-sm font-medium text-accented transition-colors hover:bg-accented focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        type="button"
        @click="toggle"
      >
        Switch scope
      </button>

      <span
        class="inline-flex items-center gap-1.5 rounded-full bg-accented px-2 py-[0.1875rem] text-xs font-semibold text-muted data-[state=active]:bg-accent-subtle data-[state=active]:text-accent"
        data-state="active"
      >
        {{ scope }}
      </span>
    </div>

    <ul class="m-0 flex list-none flex-col gap-0.5 p-0">
      <li
        class="flex items-center justify-between gap-3 rounded-lg px-2.5 py-2 transition-[background] duration-[120ms] ease-in-out data-[fired]:bg-accent-subtle"
        v-for="command in commands"
        :key="command.id"
        :data-fired="command.id === fired ? '' : undefined"
      >
        <span
          :class="command.scope === scope ? 'opacity-100' : 'opacity-[0.45]'"
        >
          {{ command.label }}
          <span class="text-muted">· {{ command.scope }}</span>
        </span>

        <kbd
          class="inline-flex items-center gap-0.5 whitespace-nowrap rounded-md border border-default border-b-2 bg-accented px-[0.4375rem] py-[0.1875rem] text-xs font-semibold text-accented data-[active]:border-accent-muted data-[active]:bg-accent-subtle data-[active]:text-accent"
          :data-active="command.id === fired ? '' : undefined"
        >
          {{ formatHotkey(command.hotkey) }}
        </kbd>
      </li>
    </ul>
  </div>
</template>
