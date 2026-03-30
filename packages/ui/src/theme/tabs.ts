import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "flex items-center gap-2",
      list: "group relative flex p-1",
      indicator: "absolute transition-[translate,width] duration-200",
      trigger: [
        "group relative inline-flex min-w-0 items-center rounded-md font-medium disabled:cursor-not-allowed disabled:opacity-75 data-[state=inactive]:text-muted hover:data-[state=inactive]:not-disabled:text-default",
        options.theme?.transitions && "transition-colors",
      ],
      leadingIcon: "shrink-0",
      leadingAvatar: "shrink-0",
      leadingAvatarSize: "",
      label: "truncate",
      trailingBadge: "shrink-0",
      trailingBadgeSize: "sm",
      content: "w-full focus:outline-none",
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      variant: {
        pill: {
          list: "rounded-lg bg-elevated",
          trigger: "grow",
          indicator: "rounded-md shadow-xs",
        },
        link: {
          list: "border-default",
          indicator: "rounded-full",
          trigger: "focus:outline-none",
        },
      },
      orientation: {
        horizontal: {
          root: "flex-col",
          list: "w-full",
          indicator:
            "left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position)",
          trigger: "justify-center",
        },
        vertical: {
          list: "flex-col",
          indicator:
            "top-0 h-(--reka-tabs-indicator-size) translate-y-(--reka-tabs-indicator-position)",
        },
      },
      size: {
        xs: {
          trigger: "gap-1 px-2 py-1 text-xs",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
        },
        sm: {
          trigger: "gap-1.5 px-2.5 py-1.5 text-xs",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
        },
        md: {
          trigger: "gap-1.5 px-3 py-1.5 text-sm",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
        },
        lg: {
          trigger: "gap-2 px-3 py-2 text-sm",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
        },
        xl: {
          trigger: "gap-2 px-3 py-2 text-base",
          leadingIcon: "size-6",
          leadingAvatarSize: "xs",
        },
      },
    },
    compoundVariants: [
      {
        orientation: "horizontal",
        variant: "pill",
        class: {
          indicator: "inset-y-1",
        },
      },
      {
        orientation: "horizontal",
        variant: "link",
        class: {
          list: "-mb-px border-b",
          indicator: "-bottom-px h-px",
        },
      },
      {
        orientation: "vertical",
        variant: "pill",
        class: {
          indicator: "inset-x-1",
          list: "items-center",
        },
      },
      {
        orientation: "vertical",
        variant: "link",
        class: {
          list: "-ms-px border-s",
          indicator: "-start-px w-px",
        },
      },
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "pill",
        class: {
          indicator: `bg-${color}`,
          trigger: `data-[state=active]:text-inverted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-${color}`,
        },
      })),
      {
        color: "neutral",
        variant: "pill",
        class: {
          indicator: "bg-inverted",
          trigger:
            "focus-visible:outline-2 focus-visible:outline-inverted focus-visible:outline-offset-2 data-[state=active]:text-inverted",
        },
      },
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "link",
        class: {
          indicator: `bg-${color}`,
          trigger: `data-[state=active]:text-${color} focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}`,
        },
      })),
      {
        color: "neutral",
        variant: "link",
        class: {
          indicator: "bg-inverted",
          trigger:
            "focus-visible:ring-2 focus-visible:ring-inverted focus-visible:ring-inset data-[state=active]:text-highlighted",
        },
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "pill",
      size: "md",
    },
  });
