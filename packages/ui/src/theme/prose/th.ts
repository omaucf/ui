import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  base: "border-muted border-e border-t border-b px-4 py-3 font-semibold text-sm first:border-s",
  variants: {
    align: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});
