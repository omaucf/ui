import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      content:
        "flex min-w-32 origin-(--reka-dropdown-menu-content-transform-origin) flex-col overflow-hidden rounded-md bg-default shadow-lg ring ring-default data-[state=closed]:animate-[scale-out_100ms_ease-in] data-[state=open]:animate-[scale-in_100ms_ease-out]",
      input: "border-default border-b",
      empty: "text-center text-muted",
      viewport:
        "relative flex-1 scroll-py-1 divide-y divide-default overflow-y-auto",
      arrow: "fill-bg stroke-default",
      group: "isolate p-1",
      label: "flex w-full items-center font-semibold text-highlighted",
      separator: "-mx-1 my-1 h-px bg-border",
      item: "group relative flex w-full select-none items-start outline-none before:absolute before:inset-px before:z-[-1] before:rounded-md data-disabled:cursor-not-allowed data-disabled:opacity-75",
      itemLeadingIcon: "shrink-0",
      itemLeadingAvatar: "shrink-0",
      itemLeadingAvatarSize: "",
      itemTrailing: "ms-auto inline-flex items-center gap-1.5",
      itemTrailingIcon: "shrink-0",
      itemTrailingKbds: "hidden shrink-0 items-center lg:inline-flex",
      itemTrailingKbdsSize: "",
      itemWrapper: "flex min-w-0 flex-1 flex-col text-start",
      itemLabel: "truncate",
      itemDescription: "truncate text-muted",
      itemLabelExternalIcon: "inline-block size-3 align-top text-dimmed",
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      active: {
        true: {
          item: "text-highlighted before:bg-elevated",
          itemLeadingIcon: "text-default",
        },
        false: {
          item: [
            "text-default data-[state=open]:text-highlighted data-highlighted:text-highlighted data-[state=open]:before:bg-elevated/50 data-highlighted:before:bg-elevated/50",
            options.theme?.transitions &&
              "transition-colors before:transition-colors",
          ],
          itemLeadingIcon: [
            "text-dimmed group-data-[state=open]:text-default group-data-highlighted:text-default",
            options.theme?.transitions && "transition-colors",
          ],
        },
      },
      loading: {
        true: {
          itemLeadingIcon: "animate-spin",
        },
      },
      size: {
        xs: {
          label: "gap-1 p-1 text-xs",
          item: "gap-1 p-1 text-xs",
          empty: "p-2 text-xs",
          itemLeadingIcon: "size-4",
          itemLeadingAvatarSize: "3xs",
          itemTrailingIcon: "size-4",
          itemTrailingKbds: "gap-0.5",
          itemTrailingKbdsSize: "sm",
        },
        sm: {
          label: "gap-1.5 p-1.5 text-xs",
          item: "gap-1.5 p-1.5 text-xs",
          empty: "p-2.5 text-xs",
          itemLeadingIcon: "size-4",
          itemLeadingAvatarSize: "3xs",
          itemTrailingIcon: "size-4",
          itemTrailingKbds: "gap-0.5",
          itemTrailingKbdsSize: "sm",
        },
        md: {
          label: "gap-1.5 p-1.5 text-sm",
          item: "gap-1.5 p-1.5 text-sm",
          empty: "p-2.5 text-sm",
          itemLeadingIcon: "size-5",
          itemLeadingAvatarSize: "2xs",
          itemTrailingIcon: "size-5",
          itemTrailingKbds: "gap-0.5",
          itemTrailingKbdsSize: "md",
        },
        lg: {
          label: "gap-2 p-2 text-sm",
          item: "gap-2 p-2 text-sm",
          empty: "p-3 text-sm",
          itemLeadingIcon: "size-5",
          itemLeadingAvatarSize: "2xs",
          itemTrailingIcon: "size-5",
          itemTrailingKbds: "gap-1",
          itemTrailingKbdsSize: "md",
        },
        xl: {
          label: "gap-2 p-2 text-base",
          item: "gap-2 p-2 text-base",
          empty: "p-3 text-base",
          itemLeadingIcon: "size-6",
          itemLeadingAvatarSize: "xs",
          itemTrailingIcon: "size-6",
          itemTrailingKbds: "gap-1",
          itemTrailingKbdsSize: "lg",
        },
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        active: false,
        class: {
          item: `text-${color} data-highlighted:text-${color} data-highlighted:before:bg-${color}/10 data-[state=open]:before:bg-${color}/10`,
          itemLeadingIcon: `text-${color}/75 group-data-highlighted:text-${color} group-data-[state=open]:text-${color}`,
        },
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        active: true,
        class: {
          item: `text-${color} before:bg-${color}/10`,
          itemLeadingIcon: `text-${color}`,
        },
      })),
    ],
    defaultVariants: {
      size: "md",
    },
  });
