import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "group relative flex gap-2.5 overflow-hidden rounded-lg bg-default p-4 shadow-lg ring ring-default focus:outline-none",
      wrapper: "flex w-0 flex-1 flex-col",
      title: "font-medium text-highlighted text-sm",
      description: "text-muted text-sm",
      icon: "size-5 shrink-0",
      avatar: "shrink-0",
      avatarSize: "2xl",
      actions: "flex shrink-0 gap-1.5",
      progress: "absolute inset-x-0 bottom-0",
      close: "p-0",
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            {
              root: `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}`,
              icon: `text-${color}`,
            },
          ])
        ),
        neutral: {
          root: "focus-visible:ring-2 focus-visible:ring-inverted focus-visible:ring-inset",
          icon: "text-highlighted",
        },
      },
      orientation: {
        horizontal: {
          root: "items-center",
          actions: "items-center",
        },
        vertical: {
          root: "items-start",
          actions: "mt-2.5 items-start",
        },
      },
      title: {
        true: {
          description: "mt-1",
        },
      },
    },
    defaultVariants: {
      color: "primary",
    },
  });
