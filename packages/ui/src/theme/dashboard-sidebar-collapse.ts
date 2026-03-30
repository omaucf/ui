import { cc } from "../lib/utils/tailwind.js";

export default cc({
  base: "hidden lg:flex",
  variants: {
    side: {
      left: "",
      right: "",
    },
  },
});
