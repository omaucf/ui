import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      base: [
        "relative mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] font-bold text-highlighted text-xl lg:scroll-mt-[calc(32px+var(--ui-header-height))] [&>a>code]:border-dashed [&>a>code]:font-bold [&>a>code]:text-lg/6 hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a]:focus-visible:outline-primary",
        options.theme?.transitions && "[&>a>code]:transition-colors",
      ],
      leading: [
        "absolute top-0.5 -ms-8 hidden rounded-md bg-elevated p-1 text-muted opacity-0 hover:text-primary group-hover:opacity-100 group-focus:opacity-100 lg:flex",
        options.theme?.transitions && "transition",
      ],
      leadingIcon: "size-4 shrink-0",
      link: "group lg:-ms-2 lg:ps-2",
    },
  });
