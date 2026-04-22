import type { Meta, StoryObj } from "storybook-solidjs-vite";

import BasicExample from "./examples/basic.js";
import ConflictsExample from "./examples/conflicts.js";
import FormFieldsExample from "./examples/form-fields.js";
import KeyStateExample from "./examples/key-state.js";
import MultipleExample from "./examples/multiple.js";
import RecorderExample from "./examples/recorder.js";
import ScopesExample from "./examples/scopes.js";
import SequenceExample from "./examples/sequence.js";
import SequenceTimeoutExample from "./examples/sequence-timeout.js";

const meta = {
  tags: ["autodocs"],
  title: "Utilities/Keyboard",
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => <BasicExample />,
};

export const Multiple: Story = {
  render: () => <MultipleExample />,
};

export const Sequence: Story = {
  render: () => <SequenceExample />,
};

export const Scopes: Story = {
  render: () => <ScopesExample />,
};

export const KeyState: Story = {
  render: () => <KeyStateExample />,
};

export const Recorder: Story = {
  render: () => <RecorderExample />,
};

export const FormFields: Story = {
  render: () => <FormFieldsExample />,
};

export const SequenceTimeout: Story = {
  render: () => <SequenceTimeoutExample />,
};

export const Conflicts: Story = {
  render: () => <ConflictsExample />,
};
