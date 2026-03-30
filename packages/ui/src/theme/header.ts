import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "sticky top-0 z-50 h-(--ui-header-height) border-default border-b bg-default/75 backdrop-blur",
    container: "flex h-full items-center justify-between gap-3",
    left: "flex items-center gap-1.5 lg:flex-1",
    center: "hidden lg:flex",
    right: "flex items-center justify-end gap-1.5 lg:flex-1",
    title: "flex shrink-0 items-end gap-1.5 font-bold text-highlighted text-xl",
    toggle: "lg:hidden",
    content: "lg:hidden",
    overlay: "lg:hidden",
    header:
      "flex h-(--ui-header-height) shrink-0 items-center justify-between gap-3 px-4 sm:px-6",
    body: "overflow-y-auto p-4 sm:p-6",
  },
  variants: {
    toggleSide: {
      left: {
        toggle: "-ms-1.5",
      },
      right: {
        toggle: "-me-1.5",
      },
    },
  },
});
