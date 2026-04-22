import type { Meta, StoryObj } from "@storybook/react-vite";

import { Locale } from "@veehance/react/locale";

import BasicExample from "./examples/basic.js";

const meta = {
  component: Locale,
  tags: ["autodocs"],
  title: "Providers/Locale",
} satisfies Meta<typeof Locale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicExample />,
};
