import { createSignal } from "solid-js";

import { useFocusVisible } from "@veehance/solid/interaction";

export default () => {
  const isFocusVisible = useFocusVisible({ isTextInput: true });
  const [focusedField, setFocusedField] = createSignal<string | null>(null);

  return (
    <div class="flex flex-col gap-3 p-4">
      <p class="text-muted text-sm">Focus visible: {String(isFocusVisible)}</p>
      <div class="flex flex-col gap-1">
        <label class="font-medium text-sm" for="first-name">
          First Name
        </label>
        <input
          class="rounded-md border border-muted px-2.5 py-1.5 text-sm data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-500 data-[focus-visible]:outline-offset-2"
          data-focus-visible={
            focusedField() === "first" && isFocusVisible ? "" : undefined
          }
          id="first-name"
          onBlur={() => setFocusedField(null)}
          onFocus={() => setFocusedField("first")}
          type="text"
        />
      </div>
      <div class="flex flex-col gap-1">
        <label class="font-medium text-sm" for="last-name">
          Last Name
        </label>
        <input
          class="rounded-md border border-muted px-2.5 py-1.5 text-sm data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-500 data-[focus-visible]:outline-offset-2"
          data-focus-visible={
            focusedField() === "last" && isFocusVisible ? "" : undefined
          }
          id="last-name"
          onBlur={() => setFocusedField(null)}
          onFocus={() => setFocusedField("last")}
          type="text"
        />
      </div>
    </div>
  );
};
