import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "overflow-hidden rounded-lg",
    header: "p-4 sm:px-6",
    body: "p-4 sm:p-6",
    footer: "p-4 sm:px-6",
  },
  variants: {
    variant: {
      solid: {
        root: "bg-inverted text-inverted",
      },
      outline: {
        root: "divide-y divide-default bg-default ring ring-default",
      },
      soft: {
        root: "divide-y divide-default bg-elevated/50",
      },
      subtle: {
        root: "divide-y divide-default bg-elevated/50 ring ring-default",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});
