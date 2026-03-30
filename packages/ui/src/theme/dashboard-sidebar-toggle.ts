import { cc } from "../lib/utils/tailwind.js";

export default cc({
  base: "lg:hidden",
  variants: {
    side: {
      left: "",
      right: "",
    },
  },
});
