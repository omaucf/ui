import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Container } from "@veehance/vue/container";
import { Placeholder } from "@veehance/vue/placeholder";

const meta = {
  component: Container,
  tags: ["autodocs"],
  title: "Components/UI/Container",
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: { class: "w-[480px]" },
  render: (args) => ({
    components: { Component: Container, Placeholder },
    setup() {
      return { args };
    },
    template: `
      <Component v-bind="args">
        <Placeholder class="h-32" />
      </Component>
    `,
  }),
};
