import type { Meta, StoryObj } from "storybook-solidjs-vite";

import { Container } from "@veehance/solid/container";
import { Placeholder } from "@veehance/solid/placeholder";

const meta = {
  component: Container,
  tags: ["autodocs"],
  title: "Components/UI/Container",
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  render: () => (
    <Container class="w-120">
      <Placeholder class="h-32" />
    </Container>
  ),
};
