import type { Options } from "@/types/ui.js";

export default (options: Options) => /*ui*/ ({
  slots: {
    base: [
      "relative mt-12 mb-6 scroll-mt-[calc(48px+45px+var(--ui-header-height))] font-bold text-2xl text-highlighted lg:scroll-mt-[calc(48px+var(--ui-header-height))] [&>a>code]:border-dashed [&>a>code]:font-bold [&>a>code]:text-xl/7 hover:[&>a>code]:border-primary hover:[&>a>code]:text-primary [&>a]:rounded-sm [&>a]:outline-primary/25 [&>a]:focus-visible:outline-3",
      options.theme?.transitions && "[&>a>code]:transition-colors",
    ],
  },
});
