import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "flex flex-col lg:grid lg:grid-cols-10 lg:gap-10",
    left: "lg:col-span-2",
    center: "lg:col-span-8",
    right: "order-first lg:order-last lg:col-span-2",
  },
  variants: {
    left: {
      true: "",
    },
    right: {
      true: "",
    },
  },
  compoundVariants: [
    {
      left: true,
      right: true,
      class: {
        center: "lg:col-span-6",
      },
    },
    {
      left: false,
      right: false,
      class: {
        center: "lg:col-span-10",
      },
    },
  ],
});
