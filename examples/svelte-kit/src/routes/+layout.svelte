<script lang="ts">
  import "../styles.css";

  import { UColorMode, UIcon, ULink, UMain } from "#build/ui/components";

  const { children } = $props();
</script>

<UColorMode>
  <header
    class="bg-default/75 backdrop-blur border-b border-default h-(--ui-header-height) sticky top-0 z-50"
  >
    <div class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <ULink class="text-highlighted hover:text-primary text-lg font-semibold" to="/">
        Veehance UI
      </ULink>

      <UIcon class="size-6" name="menu" />
    </div>
  </header>

  <UMain class="flex flex-col items-center justify-center"> {@render children()} </UMain>
</UColorMode>
