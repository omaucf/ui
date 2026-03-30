import { defuFn } from "defu";

import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import input from "./input.js";

export default (options: Options) => {
  return defuFn(
    cc({
      slots: {
        base: () => [
          "rounded-md",
          options.theme?.transitions && "transition-colors",
        ],
        trailing:
          "group absolute inset-y-0 end-0 flex items-center focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
        trailingClear: "p-0",
        arrow: "fill-bg stroke-default",
        content:
          "pointer-events-auto flex max-h-60 w-(--reka-combobox-trigger-width) origin-(--reka-combobox-content-transform-origin) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-default data-[state=closed]:animate-[scale-out_100ms_ease-in] data-[state=open]:animate-[scale-in_100ms_ease-out]",
        viewport: "relative flex-1 scroll-py-1 overflow-y-auto",
        group: "isolate p-1",
        empty: "text-center text-muted",
        label: "font-semibold text-highlighted",
        separator: "-mx-1 my-1 h-px bg-border",
        item: [
          "group relative flex w-full select-none items-start gap-1.5 p-1.5 text-default text-sm outline-none before:absolute before:inset-px before:z-[-1] before:rounded-md data-disabled:cursor-not-allowed data-highlighted:not-data-disabled:text-highlighted data-disabled:opacity-75 data-highlighted:not-data-disabled:before:bg-elevated/50",
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
        tagsItem:
          "inline-flex items-center gap-0.5 rounded-sm bg-elevated px-1.5 py-0.5 font-medium text-default ring ring-accented ring-inset data-disabled:cursor-not-allowed data-disabled:opacity-75",
        tagsItemText: "truncate",
        tagsItemDelete: [
          "inline-flex items-center rounded-xs text-dimmed hover:bg-accented/75 hover:text-default disabled:pointer-events-none",
          options.theme?.transitions && "transition-colors",
        ],
        tagsItemDeleteIcon: "shrink-0",
        tagsInput:
          "flex-1 border-0 bg-transparent placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
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
        multiple: {
          true: {
            root: "flex-wrap",
          },
          false: {
            base: "w-full border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
          },
        },
        size: {
          xs: {
            label: "gap-1 p-1 text-[10px]/3",
            item: "gap-1 p-1 text-xs",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            tagsItem: "text-[10px]/3",
            tagsItemDeleteIcon: "size-3",
            empty: "p-2 text-xs",
          },
          sm: {
            label: "gap-1.5 p-1.5 text-[10px]/3",
            item: "gap-1.5 p-1.5 text-xs",
            itemLeadingIcon: "size-4",
            itemLeadingAvatarSize: "3xs",
            itemLeadingChip: "size-4",
            itemLeadingChipSize: "sm",
            itemTrailingIcon: "size-4",
            tagsItem: "text-[10px]/3",
            tagsItemDeleteIcon: "size-3",
            empty: "p-2.5 text-xs",
          },
          md: {
            label: "gap-1.5 p-1.5 text-xs",
            item: "gap-1.5 p-1.5 text-sm",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            tagsItem: "text-xs",
            tagsItemDeleteIcon: "size-3.5",
            empty: "p-2.5 text-sm",
          },
          lg: {
            label: "gap-2 p-2 text-xs",
            item: "gap-2 p-2 text-sm",
            itemLeadingIcon: "size-5",
            itemLeadingAvatarSize: "2xs",
            itemLeadingChip: "size-5",
            itemLeadingChipSize: "md",
            itemTrailingIcon: "size-5",
            tagsItem: "text-xs",
            tagsItemDeleteIcon: "size-3.5",
            empty: "p-3 text-sm",
          },
          xl: {
            label: "gap-2 p-2 text-sm",
            item: "gap-2 p-2 text-base",
            itemLeadingIcon: "size-6",
            itemLeadingAvatarSize: "xs",
            itemLeadingChip: "size-6",
            itemLeadingChipSize: "lg",
            itemTrailingIcon: "size-6",
            tagsItem: "text-sm",
            tagsItemDeleteIcon: "size-4",
            empty: "p-3 text-base",
          },
        },
      },
      compoundVariants: [
        {
          variant: "soft",
          multiple: true,
          class: "has-focus:bg-elevated",
        },
        {
          variant: "ghost",
          multiple: true,
          class: "has-focus:bg-elevated",
        },
        ...(options.theme?.colors || []).map((color: string) => ({
          color,
          multiple: true,
          variant: ["outline", "subtle"],
          class: `has-focus-visible:ring-2 has-focus-visible:ring-${color}`,
        })),
        {
          color: "neutral",
          multiple: true,
          variant: ["outline", "subtle"],
          class: "has-focus-visible:ring-2 has-focus-visible:ring-inverted",
        },
      ],
    }),
    input(options)
  );
};
