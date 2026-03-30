import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "grid grid-cols-1 gap-8 sm:grid-cols-2",
      link: [
        "group block rounded-lg border border-default px-6 py-8 hover:bg-elevated/50 focus-visible:outline-primary",
        options.theme?.transitions && "transition-colors",
      ],
      linkLeading: [
        "mb-4 inline-flex items-center rounded-full bg-elevated p-1.5 ring ring-accented group-hover:bg-primary/10 group-hover:ring-primary/50",
        options.theme?.transitions && "transition",
      ],
      linkLeadingIcon: [
        "size-5 shrink-0 text-highlighted group-hover:text-primary",
        options.theme?.transitions && "transition-[color,translate]",
      ],
      linkTitle: "mb-1 truncate font-medium text-[15px] text-highlighted",
      linkDescription: "line-clamp-2 text-muted text-sm",
    },
    variants: {
      direction: {
        left: {
          linkLeadingIcon: [
            options.theme?.transitions && "group-active:-translate-x-0.5",
          ],
        },
        right: {
          link: "text-end",
          linkLeadingIcon: [
            options.theme?.transitions && "group-active:translate-x-0.5",
          ],
        },
      },
    },
  });
