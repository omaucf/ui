import type { Meta, StoryObj } from "@storybook/react-vite";

import { Container } from "@veehance/react/container";
import { Placeholder } from "@veehance/react/placeholder";

const meta = {
  component: Container,
  tags: ["autodocs"],
  title: "Components/UI/Container",
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  render: () => (
    <Container className="w-120">
      <Placeholder className="h-32" />
    </Container>
  ),
};
