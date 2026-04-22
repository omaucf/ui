import { useState } from "react";

import { useFocusVisible } from "@veehance/react/interaction";

export default () => {
  const isFocusVisible = useFocusVisible({ isTextInput: true });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-3 p-4">
      <p className="text-muted text-sm">
        Focus visible: {String(isFocusVisible)}
      </p>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm" htmlFor="first-name">
          First Name
        </label>
        <input
          className="rounded-md border border-muted px-2.5 py-1.5 text-sm data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-500 data-[focus-visible]:outline-offset-2"
          data-focus-visible={
            focusedField === "first" && isFocusVisible ? "" : undefined
          }
          id="first-name"
          onBlur={() => setFocusedField(null)}
          onFocus={() => setFocusedField("first")}
          type="text"
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium text-sm" htmlFor="last-name">
          Last Name
        </label>
        <input
          className="rounded-md border border-muted px-2.5 py-1.5 text-sm data-[focus-visible]:outline-2 data-[focus-visible]:outline-blue-500 data-[focus-visible]:outline-offset-2"
          data-focus-visible={
            focusedField === "last" && isFocusVisible ? "" : undefined
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
