import type { Meta, StoryObj } from "@storybook/react-vite";

import { Environment } from "@veehance/react/environment";

import BasicExample from "./examples/basic.js";
import FocusVisibleExample from "./examples/focus-visible.js";
import FocusVisibleTextInputExample from "./examples/focus-visible-text-input.js";

const meta = {
  component: Environment,
  tags: ["autodocs"],
  title: "Utilities/Interaction",
} satisfies Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicExample />,
};

export const FocusVisible = {
  render: () => <FocusVisibleExample />,
};

export const FocusVisibleTextInput = {
  render: () => <FocusVisibleTextInputExample />,
};
