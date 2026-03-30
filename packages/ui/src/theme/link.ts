import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    base: "focus-visible:outline-primary",
    variants: {
      active: {
        true: "text-primary",
        false: "text-muted",
      },
      disabled: {
        true: "cursor-not-allowed opacity-75",
      },
    },
    compoundVariants: [
      {
        active: false,
        disabled: false,
        class: [
          "hover:text-default",
          options.theme?.transitions && "transition-colors",
        ],
      },
    ],
  });
