import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "flex w-full flex-1 flex-col gap-1 px-2.5 [&>article]:last-of-type:min-h-(--last-message-height)",
    indicator:
      "flex h-6 items-center gap-1 py-3 *:size-2 *:rounded-full *:bg-elevated [&>*:nth-child(1)]:animate-[bounce_1s_infinite] [&>*:nth-child(2)]:animate-[bounce_1s_0.15s_infinite] [&>*:nth-child(3)]:animate-[bounce_1s_0.3s_infinite]",
    viewport:
      "absolute inset-x-0 top-[86%] data-[state=closed]:animate-[fade-out_200ms_ease-in] data-[state=open]:animate-[fade-in_200ms_ease-out]",
    autoScroll: "absolute right-1/2 bottom-0 translate-x-1/2 rounded-full",
  },
  variants: {
    compact: {
      true: "",
      false: "",
    },
  },
});
