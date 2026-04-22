import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Link } from "@veehance/vue/link";

const meta = {
  component: Link,
  tags: ["autodocs"],
  title: "Components/UI/Link",
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  args: { to: "#" },
  render: (args) => ({
    components: { Component: Link },
    setup() {
      return { args };
    },
    template: `<Component v-bind="args">Link</Component>`,
  }),
};

export const Raw: Story = {
  args: {
    activeClass: "font-bold",
    inactiveClass: "text-muted",
    raw: true,
    to: "#",
  },
  render: (args) => ({
    components: { Component: Link },
    setup() {
      return { args };
    },
    template: `<Component v-bind="args">Link</Component>`,
  }),
};
