import type { Meta, StoryObj } from "@storybook/vue3-vite";

import BasicExample from "./examples/basic.vue";
import ConflictsExample from "./examples/conflicts.vue";
import FormFieldsExample from "./examples/form-fields.vue";
import KeyStateExample from "./examples/key-state.vue";
import MultipleExample from "./examples/multiple.vue";
import RecorderExample from "./examples/recorder.vue";
import ScopesExample from "./examples/scopes.vue";
import SequenceExample from "./examples/sequence.vue";
import SequenceTimeoutExample from "./examples/sequence-timeout.vue";

const meta = {
  tags: ["autodocs"],
  title: "Utilities/Keyboard",
} satisfies Meta<any>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  render: () => ({
    components: { Component: BasicExample },
    template: "<Component />",
  }),
};

export const Multiple: Story = {
  render: () => ({
    components: { Component: MultipleExample },
    template: "<Component />",
  }),
};

export const Sequence: Story = {
  render: () => ({
    components: { Component: SequenceExample },
    template: "<Component />",
  }),
};

export const Scopes: Story = {
  render: () => ({
    components: { Component: ScopesExample },
    template: "<Component />",
  }),
};

export const KeyState: Story = {
  render: () => ({
    components: { Component: KeyStateExample },
    template: "<Component />",
  }),
};

export const Recorder: Story = {
  render: () => ({
    components: { Component: RecorderExample },
    template: "<Component />",
  }),
};

export const FormFields: Story = {
  render: () => ({
    components: { Component: FormFieldsExample },
    template: "<Component />",
  }),
};

export const SequenceTimeout: Story = {
  render: () => ({
    components: { Component: SequenceTimeoutExample },
    template: "<Component />",
  }),
};

export const Conflicts: Story = {
  render: () => ({
    components: { Component: ConflictsExample },
    template: "<Component />",
  }),
};
