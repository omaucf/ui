import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      base: [
        "group relative my-5 block rounded-md border border-default bg-default p-4 sm:p-6",
        options.theme?.transitions && "transition-colors",
      ],
      icon: "mb-2 block size-6",
      title: "font-semibold text-highlighted",
      description: "text-[15px] text-muted *:my-1 *:first:mt-0 *:last:mb-0",
      externalIcon: [
        "pointer-events-none absolute top-2 right-2 size-4 align-top text-dimmed",
        options.theme?.transitions && "transition-colors",
      ],
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            { icon: `text-${color}` },
          ])
        ),
        neutral: {
          icon: "text-highlighted",
        },
      },
      to: {
        true: "",
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
        to: true,
        class: {
          base: `hover:bg-${color}/10 hover:border-${color} has-focus-visible:border-${color}`,
          externalIcon: `group-hover:text-${color}`,
        },
      })),
      {
        color: "neutral",
        to: true,
        class: {
          base: "hover:border-inverted hover:bg-elevated/50 has-focus-visible:border-inverted",
          externalIcon: "group-hover:text-highlighted",
        },
      },
    ],
    defaultVariants: {
      color: "primary",
    },
  });
