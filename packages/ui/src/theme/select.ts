import { defuFn } from "defu";

import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import { fieldGroupVariant } from "./field-group.js";
import input from "./input.js";

export default (options: Options) => {
  return defuFn(
    cc({
      slots: {
        root: () => undefined,
        base: () => [
          "group relative inline-flex items-center rounded-md focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          options.theme?.transitions && "transition-colors",
        ],
        value: "pointer-events-none truncate",
        placeholder: "truncate text-dimmed",
        arrow: "fill-bg stroke-default",
        content:
          "pointer-events-auto flex max-h-60 w-(--reka-select-trigger-width) origin-(--reka-select-content-transform-origin) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-default data-[state=closed]:animate-[scale-out_100ms_ease-in] data-[state=open]:animate-[scale-in_100ms_ease-out]",
        viewport:
          "relative flex-1 scroll-py-1 divide-y divide-default overflow-y-auto",
        group: "isolate p-1",
        empty: "text-center text-muted",
        label: "font-semibold text-highlighted",
        separator: "-mx-1 my-1 h-px bg-border",
        item: [
          "group relative flex w-full select-none items-start text-default outline-none before:absolute before:inset-px before:z-[-1] before:rounded-md data-disabled:cursor-not-allowed data-highlighted:not-data-disabled:text-highlighted data-disabled:opacity-75 data-highlighted:not-data-disabled:before:bg-elevated/50",
          options.theme?.transitions &&
            "transition-colors before:transition-colors",
        ],
        itemLeadingIcon: [
          "shrink-0 text-dimmed group-data-highlighted:not-group-data-disabled:text-default",
          options.theme?.transitions && "transition-colors",
        ],
        itemLeadingAvatar: "shrink-0",
        itemLeadingAvatarSize: "",
        itemLeadingChip: "shrink-0",
        itemLeadingChipSize: "",
        itemTrailing: "ms-auto inline-flex items-center gap-1.5",
        itemTrailingIcon: "shrink-0",
        itemWrapper: "flex min-w-0 flex-1 flex-col",
        itemLabel: "truncate",
        itemDescription: "truncate text-muted",
      },
      variants: {
        ...fieldGroupVariant,
        variant: (prev: Record<string, string>) => ({
          ...prev,
          outline: [prev.outline, "hover:bg-elevated disabled:bg-default"].join(
            " "
          ),
          subtle: [
            prev.subtle,
            "hover:bg-accented/75 disabled:bg-elevated",
          ].join(" "),
        }),
        size: {
          xs: {
            base: "gap-1 px-2 py-1 text-xs",
            label: "gap-1 p-1 text-[10px]/3",
            item: "gap-1 p-1 text-xs",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            empty: "p-2 text-xs",
          },
          sm: {
            base: "gap-1.5 px-2.5 py-1.5 text-xs",
            label: "gap-1.5 p-1.5 text-[10px]/3",
            item: "gap-1.5 p-1.5 text-xs",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            empty: "p-2.5 text-xs",
          },
          md: {
            base: "gap-1.5 px-2.5 py-1.5 text-sm",
            label: "gap-1.5 p-1.5 text-xs",
            item: "gap-1.5 p-1.5 text-sm",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            empty: "p-2.5 text-sm",
          },
          lg: {
            base: "gap-2 px-3 py-2 text-sm",
            label: "gap-2 p-2 text-xs",
            item: "gap-2 p-2 text-sm",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            empty: "p-3 text-sm",
          },
          xl: {
            base: "gap-2 px-3 py-2 text-base",
            label: "gap-2 p-2 text-sm",
            item: "gap-2 p-2 text-base",
            itemLeadingIcon: "size-6",
            itemLeadingAvatarSize: "xs",
            itemLeadingChip: "size-6",
            itemLeadingChipSize: "lg",
            itemTrailingIcon: "size-6",
            empty: "p-3 text-base",
          },
        },
      },
      compoundVariants: (prev: Record<string, any>[]) =>
        prev.map((item) => ({
          ...item,
          class:
            typeof item.class === "string"
              ? replaceFocus(item.class)
              : item.class,
        })),
    }),
    input(options)
  );
};

function replaceFocus(str: string): string {
  return str.replace(/focus-visible:/g, "focus:");
}
