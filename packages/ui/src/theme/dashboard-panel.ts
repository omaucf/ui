import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative flex min-h-svh min-w-0 shrink-0 flex-col lg:not-last:border-default lg:not-last:border-e",
    body: "flex flex-1 flex-col gap-4 overflow-y-auto p-4 sm:gap-6 sm:p-6",
    handle: "",
  },
  variants: {
    size: {
      true: {
        root: "w-full lg:w-(--width)",
      },
      false: {
        root: "flex-1",
      },
    },
  },
});
