import { defuFn } from "defu";

import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import { fieldGroupVariant } from "./field-group.js";
import input from "./input.js";

export default (options: Options) => {
  return defuFn(
    cc({
      slots: {
        root: () => undefined,
        base: () => [
          "group relative inline-flex select-none items-center rounded-md",
          options.theme?.transitions && "transition-colors",
        ],
        segment: [
          "rounded text-center outline-hidden data-disabled:cursor-not-allowed data-[segment=literal]:text-muted data-invalid:text-error data-placeholder:text-dimmed data-disabled:opacity-75",
          options.theme?.transitions && "transition-colors",
        ],
        separatorIcon: "size-4 shrink-0 text-muted",
      },
      variants: {
        ...fieldGroupVariant,
        size: {
          xs: {
            base: (prev: string) => [prev, "gap-0.25"],
            segment:
              "data-[segment=day]:w-6 data-[segment=month]:w-6 data-[segment=year]:w-9",
          },
          sm: {
            base: (prev: string) => [prev, "gap-0.5"],
            segment:
              "data-[segment=day]:w-6 data-[segment=month]:w-6 data-[segment=year]:w-9",
          },
          md: {
            base: (prev: string) => [prev, "gap-0.5"],
            segment:
              "data-[segment=day]:w-7 data-[segment=month]:w-7 data-[segment=year]:w-11",
          },
          lg: {
            base: (prev: string) => [prev, "gap-0.75"],
            segment:
              "data-[segment=day]:w-7 data-[segment=month]:w-7 data-[segment=year]:w-11",
          },
          xl: {
            base: (prev: string) => [prev, "gap-0.75"],
            segment:
              "data-[segment=day]:w-8 data-[segment=month]:w-8 data-[segment=year]:w-13",
          },
        },
      },
      compoundVariants: [
        {
          variant: "outline",
          class: {
            segment: "focus:bg-elevated",
          },
        },
        {
          variant: "soft",
          class: {
            segment: "focus:bg-accented/50 group-hover:focus:bg-accented",
          },
        },
        {
          variant: "subtle",
          class: {
            segment: "focus:bg-accented",
          },
        },
        {
          variant: "ghost",
          class: {
            segment: "focus:bg-elevated group-hover:focus:bg-accented",
          },
        },
        {
          variant: "none",
          class: {
            segment: "focus:bg-elevated",
          },
        },
      ],
    }),
    input(options)
  );
};
