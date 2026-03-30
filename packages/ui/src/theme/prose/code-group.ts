import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "group *:not-first:static! relative my-5 *:not-first:my-0!",
      list: "relative flex items-center gap-1 overflow-x-auto rounded-t-md border border-muted border-b-0 bg-default p-2",
      indicator:
        "absolute inset-y-2 left-0 w-(--reka-tabs-indicator-size) translate-x-(--reka-tabs-indicator-position) rounded-md bg-elevated shadow-xs transition-[translate,width] duration-200",
      trigger: [
        "relative inline-flex items-center gap-1.5 rounded-md px-2 py-1.5 text-default text-sm hover:bg-elevated/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset disabled:cursor-not-allowed disabled:opacity-75 data-[state=active]:text-highlighted",
        options.theme?.transitions && "transition-colors",
      ],
      triggerIcon: "size-4 shrink-0",
      triggerLabel: "truncate",
    },
  });
