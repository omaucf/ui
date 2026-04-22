import type { Meta, StoryObj } from "@storybook/vue3-vite";

import { Environment } from "@veehance/vue/environment";

import BasicExample from "./examples/basic.vue";
import FocusVisibleExample from "./examples/focus-visible.vue";
import FocusVisibleTextInputExample from "./examples/focus-visible-text-input.vue";

const meta = {
  component: Environment,
  tags: ["autodocs"],
  title: "Utilities/Interaction",
} satisfies Meta<typeof Environment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { Component: BasicExample },
    template: "<Component />",
  }),
};

export const FocusVisible = {
  render: () => ({
    components: { Component: FocusVisibleExample },
    template: "<Component />",
  }),
};

export const FocusVisibleTextInput = {
  render: () => ({
    components: { Component: FocusVisibleTextInputExample },
    template: "<Component />",
  }),
};
