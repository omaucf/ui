import { defuFn } from "defu";
import { isString } from "radash";

import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import input from "./input.js";

export default (options: Options) => {
  return defuFn(
    cc({
      slots: {
        root: (prev: string) => [prev, "flex-wrap"],
        base: () => [
          "rounded-md",
          options.theme?.transitions && "transition-colors",
        ],
        item: 'wrap-anywhere inline-flex items-center gap-0.5 rounded-sm bg-elevated px-1.5 py-0.5 font-medium text-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-[state="active"]:bg-accented data-disabled:opacity-75',
        itemText: "",
        itemDelete: [
          "inline-flex items-center rounded-xs text-dimmed hover:bg-accented/75 hover:text-default disabled:pointer-events-none",
          options.theme?.transitions && "transition-colors",
        ],
        itemDeleteIcon: "shrink-0",
        input:
          "flex-1 border-0 bg-transparent placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
      },
      variants: {
        size: {
          xs: {
            item: "text-[10px]/3",
            itemDeleteIcon: "size-3",
          },
          sm: {
            item: "text-[10px]/3",
            itemDeleteIcon: "size-3",
          },
          md: {
            item: "text-xs",
            itemDeleteIcon: "size-3.5",
          },
          lg: {
            item: "text-xs",
            itemDeleteIcon: "size-3.5",
          },
          xl: {
            item: "text-sm",
            itemDeleteIcon: "size-4",
          },
        },
        variant: (prev: Record<string, string>) =>
          Object.fromEntries(
            Object.entries(prev).map(([key, value]) => [
              key,
              replaceFocus(value),
            ])
          ),
      },
      compoundVariants: (prev: Record<string, any>[]) =>
        prev.map((item) => ({
          ...item,
          class: isString(item.class) ? replaceFocus(item.class) : item.class,
        })),
    }),
    input(options)
  );
};

function replaceFocus(str: string): string {
  return str
    .replace(/focus:/g, "has-focus:")
    .replace(/focus-visible:/g, "has-focus-visible:");
}
