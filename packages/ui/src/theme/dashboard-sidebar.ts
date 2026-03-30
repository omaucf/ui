import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative hidden min-h-svh w-(--width) min-w-16 shrink-0 flex-col lg:flex",
    header: "flex h-(--ui-header-height) shrink-0 items-center gap-1.5 px-4",
    body: "flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-2",
    footer: "flex shrink-0 items-center gap-1.5 px-4 py-2",
    toggle: "",
    handle: "",
    content: "lg:hidden",
    overlay: "lg:hidden",
  },
  variants: {
    menu: {
      true: {
        header: "sm:px-6",
        body: "sm:px-6",
        footer: "sm:px-6",
      },
    },
    side: {
      left: {
        root: "border-default border-e",
      },
      right: {
        root: "",
      },
    },
    toggleSide: {
      left: {
        toggle: "",
      },
      right: {
        toggle: "ms-auto",
      },
    },
  },
});
