import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "flex min-h-[49px] shrink-0 items-center justify-between gap-1.5 overflow-x-auto border-default border-b px-4 sm:px-6",
    left: "flex items-center gap-1.5",
    right: "flex items-center gap-1.5",
  },
});
