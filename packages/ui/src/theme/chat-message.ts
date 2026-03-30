import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "group/message relative w-full",
      container: "relative flex items-start",
      leading: "inline-flex min-h-6 items-center justify-center",
      leadingIcon: "shrink-0",
      leadingAvatar: "shrink-0",
      leadingAvatarSize: "",
      files: "mb-1.5 flex items-center gap-1.5",
      content: "relative min-w-0 text-pretty *:first:mt-0 *:last:mb-0",
      actions: [
        "absolute bottom-0 flex items-center opacity-0 group-hover/message:opacity-100",
        options.theme?.transitions && "transition-opacity",
      ],
    },
    variants: {
      variant: {
        solid: {
          content: "bg-inverted text-inverted",
        },
        outline: {
          content: "bg-default ring ring-default",
        },
        soft: {
          content: "bg-elevated/50",
        },
        subtle: {
          content: "bg-elevated/50 ring ring-default",
        },
        naked: {
          content: "",
        },
      },
      side: {
        left: {},
        right: {
          container: "ms-auto max-w-[75%] justify-end",
          files: "justify-end",
        },
      },
      leading: {
        true: "",
      },
      actions: {
        true: "",
      },
      compact: {
        true: {
          root: "scroll-mt-3",
          container: "gap-1.5 pb-3",
          content: "space-y-2",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
        },
        false: {
          root: "scroll-mt-4 sm:scroll-mt-6",
          container: "gap-3 pb-8",
          content: "space-y-4",
          leadingIcon: "size-8",
          leadingAvatarSize: "md",
        },
      },
    },
    compoundVariants: [
      {
        compact: true,
        actions: true,
        class: {
          container: "pb-8",
        },
      },
      {
        leading: true,
        compact: false,
        side: "left",
        class: {
          actions: "left-11",
        },
      },
      {
        leading: true,
        compact: true,
        side: "left",
        class: {
          actions: "left-6.5",
        },
      },
      {
        variant: ["solid", "outline", "soft", "subtle"],
        compact: false,
        class: {
          content: "min-h-12 rounded-lg px-4 py-3",
          leading: "mt-2",
        },
      },
      {
        variant: ["solid", "outline", "soft", "subtle"],
        compact: true,
        class: {
          content: "min-h-8 rounded-lg px-2 py-1",
          leading: "mt-1",
        },
      },
      {
        variant: "naked",
        side: "left",
        class: {
          content: "w-full",
        },
      },
    ],
    defaultVariants: {
      variant: "naked",
    },
  });
