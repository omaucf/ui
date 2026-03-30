import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "",
      trigger: [
        "group flex w-full min-w-0 items-center gap-1.5 text-muted text-sm hover:text-default focus-visible:outline-primary focus-visible:outline-offset-2 disabled:cursor-default disabled:hover:text-muted",
        options.theme?.transitions && "transition-colors",
      ],
      leading: "relative size-4 shrink-0",
      leadingIcon: "size-4 shrink-0",
      chevronIcon:
        "size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
      label: "truncate",
      trailingIcon:
        "size-4 shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180",
      content:
        "overflow-hidden data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=open]:animate-[collapsible-down_200ms_ease-out]",
      body: "max-h-[200px] overflow-y-auto whitespace-pre-wrap pt-2 text-dimmed text-sm",
    },
    variants: {
      chevron: {
        leading: {
          leadingIcon: "group-hover:opacity-0",
        },
        trailing: "",
      },
      alone: {
        false: {
          leadingIcon: [
            "absolute inset-0 group-data-[state=open]:opacity-0",
            options.theme?.transitions && "transition-opacity duration-200",
          ],
          chevronIcon: [
            "absolute inset-0 opacity-0 group-hover:opacity-100 group-data-[state=open]:opacity-100",
            options.theme?.transitions &&
              "transition-[rotate,opacity] duration-200",
          ],
        },
      },
    },
  });
