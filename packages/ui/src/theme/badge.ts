import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import { fieldGroupVariant } from "./field-group.js";

export default (options: Options) =>
  cc({
    slots: {
      base: "inline-flex items-center font-medium",
      label: "truncate",
      leadingIcon: "shrink-0",
      leadingAvatar: "shrink-0",
      leadingAvatarSize: "",
      trailingIcon: "shrink-0",
    },
    variants: {
      ...fieldGroupVariant,
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
        xs: {
          base: "gap-1 rounded-sm px-1 py-0.5 text-[8px]/3",
          leadingIcon: "size-3",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-3",
        },
        sm: {
          base: "gap-1 rounded-sm px-1.5 py-1 text-[10px]/3",
          leadingIcon: "size-3",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-3",
        },
        md: {
          base: "gap-1 rounded-md px-2 py-1 text-xs",
          leadingIcon: "size-4",
          leadingAvatarSize: "3xs",
          trailingIcon: "size-4",
        },
        lg: {
          base: "gap-1.5 rounded-md px-2 py-1 text-sm",
          leadingIcon: "size-5",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-5",
        },
        xl: {
          base: "gap-1.5 rounded-md px-2.5 py-1 text-base",
          leadingIcon: "size-6",
          leadingAvatarSize: "2xs",
          trailingIcon: "size-6",
        },
      },
      square: {
        true: "",
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "solid",
        class: `bg-${color} text-inverted`,
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "outline",
        class: `text-${color} ring ring-inset ring-${color}/50`,
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "soft",
        class: `bg-${color}/10 text-${color}`,
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "subtle",
        class: `bg-${color}/10 text-${color} ring ring-inset ring-${color}/25`,
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
      {
        size: "xs",
        square: true,
        class: "p-0.5",
      },
      {
        size: "sm",
        square: true,
        class: "p-1",
      },
      {
        size: "md",
        square: true,
        class: "p-1",
      },
      {
        size: "lg",
        square: true,
        class: "p-1",
      },
      {
        size: "xl",
        square: true,
        class: "p-1",
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
      size: "md",
    },
  });
