import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { ColorMode } from "@veehance/vue/color-mode";

import BasicExample from "./examples/basic.vue";

const meta = {
  component: ColorMode,
  tags: ["autodocs"],
  title: "Providers/ColorMode",
} satisfies Meta<typeof ColorMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { Component: BasicExample },
    template: "<Component />",
  }),
};
