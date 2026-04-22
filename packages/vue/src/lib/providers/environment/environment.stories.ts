import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Environment } from "@veehance/vue/environment";

import BasicExample from "./examples/basic.vue";

const meta = {
  component: Environment,
  tags: ["autodocs"],
  title: "Providers/Environment",
} satisfies Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { Component: BasicExample },
    template: "<Component />",
  }),
};
