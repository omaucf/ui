import type { Options } from "@/types/ui.js";

export default (options: Options) => /*ui*/ ({
  base: "outline-primary/25 focus-visible:outline-3",
  compoundVariants: [
    {
      active: false,
      class: [
        "hover:text-default",
        options.theme?.transitions && "transition-colors",
      ],
      disabled: false,
    },
  ],
  variants: {
    active: {
      false: "text-muted",
      true: "text-primary",
    },
    disabled: {
      true: "cursor-not-allowed opacity-75",
    },
  },
});
