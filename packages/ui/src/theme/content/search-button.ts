import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    base: "",
    label: "",
    trailing: "ms-auto hidden items-center gap-0.5 lg:flex",
  },
  variants: {
    collapsed: {
      true: {
        label: "hidden",
        trailing: "lg:hidden",
      },
    },
  },
});
