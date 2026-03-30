import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  base: "border-muted border-e border-b px-4 py-3 align-top text-sm first:border-s [&_code]:text-xs/5 [&_li]:my-0.5 [&_li]:leading-6 [&_ol]:my-0 [&_ol]:ps-4.5 [&_p]:my-0 [&_p]:leading-6 [&_ul]:my-0 [&_ul]:ps-4.5",
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
