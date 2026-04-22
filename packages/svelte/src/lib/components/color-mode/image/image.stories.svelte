<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";

  import { ColorModeImage } from "@veehance/svelte/color-mode/image";

  const { Story } = defineMeta({
    component: ColorModeImage,
    tags: ["autodocs"],
    title: "Components/ColorMode/Image",
  });
</script>

<Story
  args={{ dark: "https://picsum.photos/id/46/400", height: 200,  light: "https://picsum.photos/id/29/400", width: 200 }}
  name="Usage"
/>
