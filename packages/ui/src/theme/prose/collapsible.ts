import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "my-5",
      trigger: [
        "group relative inline-flex items-center gap-1.5 rounded-xs text-muted text-sm hover:text-default focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        options.theme?.transitions && "transition-colors",
      ],
      triggerIcon:
        "size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
      triggerLabel: "truncate",
      content: "*:my-1.5 *:first:mt-2.5 *:last:mb-0",
    },
  });
