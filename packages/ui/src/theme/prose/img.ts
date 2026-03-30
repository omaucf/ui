import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    base: "w-full rounded-md",
    overlay: "fixed inset-0 bg-default/75 backdrop-blur-sm will-change-opacity",
    content:
      "fixed inset-0 flex cursor-zoom-out items-center justify-center focus:outline-none",
    zoomedImage:
      "h-auto max-h-[95vh] w-full max-w-[95vw] rounded-md object-contain",
  },
  variants: {
    zoom: {
      true: "will-change-transform",
    },
    open: {
      true: "",
    },
  },
  compoundVariants: [
    {
      zoom: true,
      open: false,
      class: "cursor-zoom-in",
    },
  ],
});
