<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import { Container } from "@veehance/svelte/container";
  import { Placeholder } from "@veehance/svelte/placeholder";

  const { Story } = defineMeta({
    component: Container,
    tags: ["autodocs"],
    title: "Components/UI/Container",
  });
</script>

<Story args={{ class: "w-[480px]" }} name="Usage">
  <Placeholder class="h-32" />
</Story>
