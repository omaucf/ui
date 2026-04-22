import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Environment } from "@veehance/solid/environment";

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
