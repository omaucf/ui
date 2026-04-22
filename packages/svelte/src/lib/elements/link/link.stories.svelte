<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import { Link } from "@veehance/svelte/link";

  const { Story } = defineMeta({
    component: Link,
    tags: ["autodocs"],
    title: "Components/UI/Link",
  });
</script>

<Story args={{ to: "#" }} name="Usage"> Link </Story>

<Story
  args={{ activeClass: "font-bold", inactiveClass: "text-muted", raw: true, to: "#" }}
  name="Raw"
>
  Link
</Story>
