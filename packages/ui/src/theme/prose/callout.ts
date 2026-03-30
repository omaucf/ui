import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      base: [
        "group relative my-5 block rounded-md px-4 py-3 text-sm/6 last:mb-0 *:last:mb-0! [&>div]:my-2.5 [&_code]:bg-default [&_code]:text-xs/5 [&_li]:my-0 [&_ol]:my-2.5 [&_ol]:ps-4.5 [&_pre]:bg-default [&_ul]:my-2.5 [&_ul]:ps-4.5",
        options.theme?.transitions && "transition-colors",
      ],
      icon: [
        "me-1.5 inline-block size-4 shrink-0 align-sub",
        options.theme?.transitions && "transition-colors",
      ],
      externalIcon: [
        "pointer-events-none absolute top-2 right-2 size-4 align-top",
        options.theme?.transitions && "transition-colors",
      ],
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            {
              base: `border border-${color}/25 bg-${color}/10 text-${color}-600 dark:text-${color}-300 [&_a]:text-${color} [&_a]:hover:border-${color} [&_a]:focus-visible:outline-${color} [&_code]:text-${color}-600 dark:[&_code]:text-${color}-300 [&_code]:border-${color}/25 [&_a]:hover:[&>code]:border-${color} [&_a]:hover:[&>code]:text-${color} [&_a]:focus-visible:[&>code]:border-${color} [&_a]:focus-visible:[&>code]:text-${color} [&>ul]:marker:text-${color}/50`,
              icon: `text-${color}`,
              externalIcon: `text-${color}-600 dark:text-${color}-300`,
            },
          ])
        ),
        neutral: {
          base: "border border-muted bg-muted text-default",
          icon: "text-highlighted",
          externalIcon: "text-dimmed",
        },
      },
      to: {
        true: "border-dashed",
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        to: true,
        class: {
          base: `hover:border-${color} has-focus-visible:border-${color}`,
          externalIcon: `group-hover:text-${color}`,
        },
      })),
      {
        color: "neutral",
        to: true,
        class: {
          base: "hover:border-inverted has-focus-visible:border-inverted",
          externalIcon: "group-hover:text-highlighted",
        },
      },
    ],
    defaultVariants: {
      color: "neutral",
    },
  });
