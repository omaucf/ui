import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative flex w-full gap-2.5 overflow-hidden rounded-lg p-4",
      wrapper: "flex min-w-0 flex-1 flex-col",
      title: "font-medium text-sm",
      description: "text-sm opacity-90",
      icon: "size-5 shrink-0",
      avatar: "shrink-0",
      avatarSize: "2xl",
      actions: "flex shrink-0 flex-wrap gap-1.5",
      close: "p-0",
    },
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
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "solid",
        class: {
          root: `bg-${color} text-inverted`,
        },
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "outline",
        class: {
          root: `text-${color} ring ring-inset ring-${color}/25`,
        },
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "soft",
        class: {
          root: `bg-${color}/10 text-${color}`,
        },
      })),
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        variant: "subtle",
        class: {
          root: `bg-${color}/10 text-${color} ring ring-inset ring-${color}/25`,
        },
      })),
      {
        color: "neutral",
        variant: "solid",
        class: {
          root: "bg-inverted text-inverted",
        },
      },
      {
        color: "neutral",
        variant: "outline",
        class: {
          root: "bg-default text-highlighted ring ring-default ring-inset",
        },
      },
      {
        color: "neutral",
        variant: "soft",
        class: {
          root: "bg-elevated/50 text-highlighted",
        },
      },
      {
        color: "neutral",
        variant: "subtle",
        class: {
          root: "bg-elevated/50 text-highlighted ring ring-accented ring-inset",
        },
      },
    ],
    defaultVariants: {
      color: "primary",
      variant: "solid",
    },
  });
