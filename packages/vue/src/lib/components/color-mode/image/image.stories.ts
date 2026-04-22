import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { ColorModeImage } from "@veehance/vue/color-mode/image";

const meta = {
  component: ColorModeImage,
  tags: ["autodocs"],
  title: "Components/ColorMode/ColorModeImage",
} satisfies Meta<typeof ColorModeImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: {
    dark: "https://picsum.photos/id/46/400",
    height: 200,
    light: "https://picsum.photos/id/29/400",
    width: 200,
  },
};
