import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    content:
      "pointer-events-auto flex h-6 origin-(--reka-tooltip-content-transform-origin) select-none items-center gap-1 rounded-sm bg-default px-2.5 py-1 text-highlighted text-xs shadow-sm ring ring-default data-[state=closed]:animate-[scale-out_100ms_ease-in] data-[state=delayed-open]:animate-[scale-in_100ms_ease-out]",
    arrow: "fill-bg stroke-default",
    text: "truncate",
    kbds: `hidden lg:inline-flex items-center shrink-0 gap-0.5 not-first-of-type:before:content-['·'] not-first-of-type:before:me-0.5`,
    kbdsSize: "sm",
  },
});
