import type { Meta, StoryObj } from "@storybook/svelte-vite";

import { ColorMode } from "@veehance/svelte/color-mode";

import BasicExample from "./examples/basic.svelte";

const meta = {
  component: ColorMode,
  tags: ["autodocs"],
  title: "Providers/ColorMode",
} satisfies Meta<typeof ColorMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({ Component: BasicExample }) as any,
};
