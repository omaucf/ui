import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import { fieldGroupVariantWithRoot } from "./field-group.js";
import inputTheme from "./input.js";

export default (options: Options) => {
  const input = inputTheme(options);
  return cc({
    slots: {
      root: "relative inline-flex items-center",
      base: [
        "w-full rounded-md border-0 placeholder:text-dimmed focus:outline-none disabled:cursor-not-allowed disabled:opacity-75",
        options.theme?.transitions && "transition-colors",
      ],
      increment: "absolute flex items-center",
      decrement: "absolute flex items-center",
    },
    variants: {
      ...fieldGroupVariantWithRoot,
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      size: {
        xs: "gap-1 px-2 py-1 text-sm/4",
        sm: "gap-1.5 px-2.5 py-1.5 text-sm/4",
        md: "gap-1.5 px-2.5 py-1.5 text-base/5",
        lg: "gap-2 px-3 py-2 text-base/5",
        xl: "gap-2 px-3 py-2 text-base",
      },
      variant: {
        ...input.variants.variant,
      },
      disabled: {
        true: {
          increment: "cursor-not-allowed opacity-75",
          decrement: "cursor-not-allowed opacity-75",
        },
      },
      orientation: {
        horizontal: {
          base: "text-center",
          increment: "inset-y-0 end-0 pe-1",
          decrement: "inset-y-0 start-0 ps-1",
        },
        vertical: {
          increment: "end-0 top-0 scale-80 pe-1 [&>button]:py-0",
          decrement: "end-0 bottom-0 scale-80 pe-1 [&>button]:py-0",
        },
      },
      highlight: {
        true: "",
      },
      fixed: {
        false: "",
      },
      increment: {
        false: "",
      },
      decrement: {
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
        orientation: "horizontal",
        decrement: false,
        class: "text-start",
      },
      {
        decrement: true,
        size: "xs",
        class: "ps-7",
      },
      {
        decrement: true,
        size: "sm",
        class: "ps-8",
      },
      {
        decrement: true,
        size: "md",
        class: "ps-9",
      },
      {
        decrement: true,
        size: "lg",
        class: "ps-10",
      },
      {
        decrement: true,
        size: "xl",
        class: "ps-11",
      },
      {
        increment: true,
        size: "xs",
        class: "pe-7",
      },
      {
        increment: true,
        size: "sm",
        class: "pe-8",
      },
      {
        increment: true,
        size: "md",
        class: "pe-9",
      },
      {
        increment: true,
        size: "lg",
        class: "pe-10",
      },
      {
        increment: true,
        size: "xl",
        class: "pe-11",
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
};
