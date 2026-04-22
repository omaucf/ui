import type { Meta, StoryObj } from "@storybook/react-vite";

import { Environment } from "@veehance/react/environment";

import BasicExample from "./examples/basic.js";

const meta = {
  component: Environment,
  tags: ["autodocs"],
  title: "Providers/Environment",
} satisfies Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicExample />,
};
