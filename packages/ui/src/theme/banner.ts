import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: [
        "relative z-50 w-full",
        options.theme?.transitions && "transition-colors",
      ],
      container: "flex h-12 items-center justify-between gap-3",
      left: "hidden lg:flex lg:flex-1 lg:items-center",
      center: "flex min-w-0 items-center gap-1.5",
      right: "flex items-center justify-end lg:flex-1",
      icon: "pointer-events-none size-5 shrink-0 text-inverted",
      title: "truncate font-medium text-inverted text-sm",
      actions: "isolate flex shrink-0 gap-1.5",
      close:
        "-me-1.5 text-inverted hover:bg-default/10 focus-visible:bg-default/10 lg:me-0",
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            { root: `bg-${color}` },
          ])
        ),
        neutral: {
          root: "bg-inverted",
        },
      },
      to: {
        true: "",
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        to: true,
        class: {
          root: `hover:bg-${color}/90`,
        },
      })),
      {
        color: "neutral",
        to: true,
        class: {
          root: "hover:bg-inverted/90",
        },
      },
    ],
    defaultVariants: {
      color: "primary",
    },
  });
