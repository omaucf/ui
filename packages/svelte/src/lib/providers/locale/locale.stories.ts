import type { Meta, StoryObj } from "@storybook/svelte-vite";

import { Locale } from "@veehance/svelte/locale";

import BasicExample from "./examples/basic.svelte";

const meta = {
  component: Locale,
  tags: ["autodocs"],
  title: "Providers/Locale",
} satisfies Meta<typeof Locale>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({ Component: BasicExample }) as any,
};
