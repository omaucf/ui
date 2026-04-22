import type { Meta, StoryObj } from "@storybook/svelte-vite";

import BasicExample from "./examples/basic.svelte";
import ConflictsExample from "./examples/conflicts.svelte";
import FormFieldsExample from "./examples/form-fields.svelte";
import KeyStateExample from "./examples/key-state.svelte";
import MultipleExample from "./examples/multiple.svelte";
import RecorderExample from "./examples/recorder.svelte";
import ScopesExample from "./examples/scopes.svelte";
import SequenceExample from "./examples/sequence.svelte";
import SequenceTimeoutExample from "./examples/sequence-timeout.svelte";

const meta = {
  tags: ["autodocs"],
  title: "Utilities/Keyboard",
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({ Component: BasicExample }) as any,
};

export const Multiple: Story = {
  render: () => ({ Component: MultipleExample }) as any,
};

export const Sequence: Story = {
  render: () => ({ Component: SequenceExample }) as any,
};

export const Scopes: Story = {
  render: () => ({ Component: ScopesExample }) as any,
};

export const KeyState: Story = {
  render: () => ({ Component: KeyStateExample }) as any,
};

export const Recorder: Story = {
  render: () => ({ Component: RecorderExample }) as any,
};

export const FormFields: Story = {
  render: () => ({ Component: FormFieldsExample }) as any,
};

export const SequenceTimeout: Story = {
  render: () => ({ Component: SequenceTimeoutExample }) as any,
};

export const Conflicts: Story = {
  render: () => ({ Component: ConflictsExample }) as any,
};
