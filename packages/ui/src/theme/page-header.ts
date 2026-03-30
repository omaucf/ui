import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative border-default border-b py-8",
    container: "",
    wrapper:
      "flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between",
    headline:
      "mb-2.5 flex items-center gap-1.5 font-semibold text-primary text-sm",
    title: "text-pretty font-bold text-3xl text-highlighted sm:text-4xl",
    description: "text-pretty text-lg text-muted",
    links: "flex flex-wrap items-center gap-1.5",
  },
  variants: {
    title: {
      true: {
        description: "mt-4",
      },
    },
  },
});
