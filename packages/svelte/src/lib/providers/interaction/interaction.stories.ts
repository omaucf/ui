import type { Meta, StoryObj } from "@storybook/svelte-vite";

import { Environment } from "@veehance/svelte/environment";

import BasicExample from "./examples/basic.svelte";
import FocusVisibleExample from "./examples/focus-visible.svelte";
import FocusVisibleTextInputExample from "./examples/focus-visible-text-input.svelte";

const meta = {
  component: Environment,
  tags: ["autodocs"],
  title: "Utilities/Interaction",
} satisfies Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({ Component: BasicExample }) as any,
};

export const FocusVisible = {
  render: () => ({ Component: FocusVisibleExample }) as any,
};

export const FocusVisibleTextInput = {
  render: () => ({ Component: FocusVisibleTextInputExample }) as any,
};
