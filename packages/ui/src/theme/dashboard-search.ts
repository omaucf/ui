import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    modal: "",
    input: "",
  },
  variants: {
    fullscreen: {
      false: {
        modal: "h-full sm:h-[28rem] sm:max-w-3xl",
      },
    },
    size: {
      xs: {},
      sm: {},
      md: {},
      lg: {},
      xl: {},
    },
  },
  defaultVariants: {
    size: "md",
  },
});
