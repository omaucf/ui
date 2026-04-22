import type { Options } from "../../lib/types/ui.js";

export default (options: Options) => /*ui*/ ({
  slots: {
    base: [
      "relative mt-8 mb-3 scroll-mt-[calc(32px+45px+var(--ui-header-height))] font-bold text-highlighted text-xl lg:scroll-mt-[calc(32px+var(--ui-header-height))] [&>a>code]:border-dashed [&>a>code]:font-bold [&>a>code]:text-lg/6 hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a]:rounded-sm [&>a]:outline-primary/25 [&>a]:focus-visible:outline-3",
      options.theme?.transitions && "[&>a>code]:transition-colors",
    ],
  },
});
