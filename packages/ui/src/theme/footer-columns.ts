import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "xl:grid xl:grid-cols-3 xl:gap-8",
      left: "mb-10 xl:mb-0",
      center:
        "flex auto-cols-fr grid-flow-col flex-col gap-8 lg:grid xl:col-span-2",
      right: "mt-10 xl:mt-0",
      label: "font-semibold text-sm",
      list: "mt-6 space-y-4",
      item: "relative",
      link: "group flex items-center gap-1.5 text-sm focus-visible:outline-primary",
      linkLeadingIcon: "size-5 shrink-0",
      linkLabel: "truncate",
      linkLabelExternalIcon: "absolute top-0 inline-block size-3 text-dimmed",
    },
    variants: {
      active: {
        true: {
          link: "font-medium text-primary",
        },
        false: {
          link: [
            "text-muted hover:text-default",
            options.theme?.transitions && "transition-colors",
          ],
        },
      },
    },
  });
