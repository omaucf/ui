import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative isolate",
      item: "w-full",
      listWithChildren: "border-default border-s",
      itemWithChildren: "-ms-px ps-1.5",
      link: "group relative flex w-full select-none items-center text-sm before:absolute before:inset-x-0 before:inset-y-px before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset",
      linkLeadingIcon: "relative shrink-0",
      linkLabel: "truncate",
      linkTrailing: "ms-auto inline-flex items-center gap-1.5",
      linkTrailingIcon:
        "shrink-0 transform transition-transform duration-200 group-data-expanded:rotate-180",
    },
    variants: {
      virtualize: {
        true: {
          root: "overflow-y-auto",
        },
      },
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            { link: `focus-visible:before:ring-${color}` },
          ])
        ),
        neutral: {
          link: "focus-visible:before:ring-inverted",
        },
      },
      size: {
        xs: {
          listWithChildren: "ms-4",
          link: "gap-1 px-2 py-1 text-xs",
          linkLeadingIcon: "size-4",
          linkTrailingIcon: "size-4",
        },
        sm: {
          listWithChildren: "ms-4.5",
          link: "gap-1.5 px-2.5 py-1.5 text-xs",
          linkLeadingIcon: "size-4",
          linkTrailingIcon: "size-4",
        },
        md: {
          listWithChildren: "ms-5",
          link: "gap-1.5 px-2.5 py-1.5 text-sm",
          linkLeadingIcon: "size-5",
          linkTrailingIcon: "size-5",
        },
        lg: {
          listWithChildren: "ms-5.5",
          link: "gap-2 px-3 py-2 text-sm",
          linkLeadingIcon: "size-5",
          linkTrailingIcon: "size-5",
        },
        xl: {
          listWithChildren: "ms-6",
          link: "gap-2 px-3 py-2 text-base",
          linkLeadingIcon: "size-6",
          linkTrailingIcon: "size-6",
        },
      },
      selected: {
        true: {
          link: "before:bg-elevated",
        },
      },
      disabled: {
        true: {
          link: "cursor-not-allowed opacity-75",
        },
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        selected: true,
        class: {
          link: `text-${color}`,
        },
      })),
      {
        color: "neutral",
        selected: true,
        class: {
          link: "text-highlighted",
        },
      },
      {
        selected: false,
        disabled: false,
        class: {
          link: [
            "hover:text-highlighted hover:before:bg-elevated/50",
            options.theme?.transitions &&
              "transition-colors before:transition-colors",
          ],
        },
      },
    ],
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  });
