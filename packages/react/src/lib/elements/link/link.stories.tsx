import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link } from "@veehance/react/link";

const meta = {
  component: Link,
  tags: ["autodocs"],
  title: "Components/UI/Link",
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Usage: Story = {
  render: () => <Link to="#">Link</Link>,
};

export const Raw: Story = {
  render: () => (
    <Link activeClass="font-bold" inactiveClass="text-muted" raw to="#">
      Link
    </Link>
  ),
};
