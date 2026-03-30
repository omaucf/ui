import { defuFn } from "defu";
import { isString } from "radash";

import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import select from "./select.js";

export default (options: Options) => {
  return defuFn(
    cc({
      slots: {
        input: "border-default border-b",
        focusScope: "flex min-h-0 flex-col",
        viewport: "relative flex-1 scroll-py-1 overflow-y-auto",
        content: (content: string) => [
          content,
          "w-(--reka-combobox-trigger-width) origin-(--reka-combobox-content-transform-origin)",
        ],
        trailingClear: "p-0",
      },
      variants: {
        virtualize: {
          true: {
            viewport: "isolate p-1",
          },
          false: {
            viewport: "divide-y divide-default",
          },
        },
      },
      compoundVariants: (prev: Record<string, any>[]) =>
        prev.map((item) => ({
          ...item,
          class: isString(item.class) ? replaceFocus(item.class) : item.class,
        })),
    }),
    select(options)
  );
};

function replaceFocus(str: string): string {
  return str.replace(/focus:/g, "focus-visible:");
}
