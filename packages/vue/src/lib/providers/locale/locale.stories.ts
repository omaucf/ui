import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Locale } from "@veehance/vue/locale";

import BasicExample from "./examples/basic.vue";

const meta = {
  component: Locale,
  tags: ["autodocs"],
  title: "Providers/Locale",
} satisfies Meta<typeof Locale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { Component: BasicExample },
    template: "<Component />",
  }),
};
