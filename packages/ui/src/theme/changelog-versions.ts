import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative",
    container: "flex flex-col gap-y-8 sm:gap-y-12 lg:gap-y-16",
    indicator:
      "absolute inset-y-3 start-32 -ms-[8.5px] hidden h-full w-px overflow-hidden bg-border lg:block",
    beam: "absolute start-0 top-0 w-full bg-primary will-change-[height]",
  },
});
