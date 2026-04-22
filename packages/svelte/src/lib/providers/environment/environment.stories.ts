import type { Meta, StoryObj } from "@storybook/svelte-vite";

import { Environment } from "@veehance/svelte/environment";

import BasicExample from "./examples/basic.svelte";

const meta = {
  component: Environment,
  tags: ["autodocs"],
  title: "Providers/Environment",
} satisfies Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({ Component: BasicExample }) as any,
};
