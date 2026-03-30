import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "",
      list: "",
      item: "relative",
      link: "group flex items-center gap-1.5 py-1 text-sm focus-visible:outline-primary",
      linkLeading: "inline-flex rounded-md p-1 ring ring-inset",
      linkLeadingIcon: "size-4 shrink-0",
      linkLabel: "truncate",
      linkLabelExternalIcon: "absolute top-0 size-3 text-dimmed",
    },
    variants: {
      active: {
        true: {
          link: "font-semibold text-primary",
          linkLeading: "bg-primary text-inverted ring-primary",
        },
        false: {
          link: [
            "font-medium text-muted hover:text-default",
            options.theme?.transitions && "transition-colors",
          ],
          linkLeading: [
            "bg-elevated/50 text-dimmed ring-accented group-hover:bg-primary group-hover:text-inverted group-hover:ring-primary",
            options.theme?.transitions && "transition",
          ],
        },
      },
    },
  });
