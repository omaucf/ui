import type { Meta, StoryObj } from "@storybook/react-vite";

import { ColorMode } from "@veehance/react/color-mode";

import BasicExample from "./examples/basic.js";

const meta = {
  component: ColorMode,
  tags: ["autodocs"],
  title: "Providers/ColorMode",
} satisfies Meta<typeof ColorMode>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicExample />,
};
