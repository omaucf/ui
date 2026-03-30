import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative inline-flex items-center gap-1.5",
      base: [
        "rounded-md border-0 text-center placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
        options.theme?.transitions && "transition-colors",
      ],
    },
    variants: {
      size: {
        xs: {
          base: "size-6 text-sm/4",
        },
        sm: {
          base: "size-7 text-sm/4",
        },
        md: {
          base: "size-8 text-base/5",
        },
        lg: {
          base: "size-9 text-base/5",
        },
        xl: {
          base: "size-10 text-base",
        },
      },
      variant: {
        outline: "bg-default text-highlighted ring ring-accented ring-inset",
        soft: "bg-elevated/50 text-highlighted hover:bg-elevated focus:bg-elevated disabled:bg-elevated/50",
        subtle: "bg-elevated text-highlighted ring ring-accented ring-inset",
        ghost:
          "bg-transparent text-highlighted hover:bg-elevated focus:bg-elevated disabled:bg-transparent dark:disabled:bg-transparent",
        none: "bg-transparent text-highlighted",
      },
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      highlight: {
        true: "",
      },
      fixed: {
        false: "",
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: ["outline", "subtle"],
        class: `focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-${color}`,
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        highlight: true,
        class: `ring ring-inset ring-${color}`,
      })),
      {
        color: "neutral",
        variant: ["outline", "subtle"],
        class:
          "focus-visible:ring-2 focus-visible:ring-inverted focus-visible:ring-inset",
      },
      {
        color: "neutral",
        highlight: true,
        class: "ring ring-inverted ring-inset",
      },
      {
        fixed: false,
        size: "xs",
        class: "md:text-xs",
      },
      {
        fixed: false,
        size: "sm",
        class: "md:text-xs",
      },
      {
        fixed: false,
        size: "md",
        class: "md:text-sm",
      },
      {
        fixed: false,
        size: "lg",
        class: "md:text-sm",
      },
    ],
    defaultVariants: {
      size: "md",
      color: "primary",
      variant: "outline",
    },
  });
