import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Locale } from "@veehance/solid/locale";

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
