import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    base: "inline-flex items-center justify-center rounded-sm px-1 font-medium font-sans uppercase",
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      variant: {
        solid: "",
        outline: "",
        soft: "",
        subtle: "",
      },
      size: {
        sm: "h-4 min-w-[16px] text-[10px]",
        md: "h-5 min-w-[20px] text-[11px]",
        lg: "h-6 min-w-[24px] text-[12px]",
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "solid",
        class: `text-inverted bg-${color}`,
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "outline",
        class: `ring ring-inset ring-${color}/50 text-${color}`,
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "soft",
        class: `text-${color} bg-${color}/10`,
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "subtle",
        class: `text-${color} ring ring-inset ring-${color}/25 bg-${color}/10`,
      })),
      {
        color: "neutral",
        variant: "solid",
        class: "bg-inverted text-inverted",
      },
      {
        color: "neutral",
        variant: "outline",
        class: "bg-default text-default ring ring-accented ring-inset",
      },
      {
        color: "neutral",
        variant: "soft",
        class: "bg-elevated text-default",
      },
      {
        color: "neutral",
        variant: "subtle",
        class: "bg-elevated text-default ring ring-accented ring-inset",
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "neutral",
      size: "md",
    },
  });
