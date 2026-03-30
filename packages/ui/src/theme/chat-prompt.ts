import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative flex w-full flex-col items-stretch gap-2 rounded-lg px-2.5 py-2 backdrop-blur",
    header: "flex items-center gap-1.5",
    body: "items-start",
    footer: "flex items-center justify-between gap-1.5",
    base: "",
  },
  variants: {
    variant: {
      outline: {
        root: "bg-default/75 ring ring-default",
      },
      soft: {
        root: "bg-elevated/50",
      },
      subtle: {
        root: "bg-elevated/50 ring ring-default",
      },
      naked: {
        root: "",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
  },
});
