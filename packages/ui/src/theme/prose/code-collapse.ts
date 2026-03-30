import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative [&_pre]:h-[200px]",
    footer:
      "absolute inset-x-px bottom-px flex h-16 items-center justify-center rounded-b-md",
    trigger: "group",
    triggerIcon: "group-data-[state=open]:rotate-180",
  },
  variants: {
    open: {
      true: {
        root: "[&_pre]:h-auto [&_pre]:max-h-[80vh] [&_pre]:min-h-[200px] [&_pre]:pb-12",
      },
      false: {
        root: "[&_pre]:overflow-hidden",
        footer: "bg-linear-to-t from-muted",
      },
    },
  },
});
