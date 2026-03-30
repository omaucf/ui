import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    base: "mb-8 scroll-mt-[calc(45px+var(--ui-header-height))] font-bold text-4xl text-highlighted lg:scroll-mt-(--ui-header-height)",
    link: "inline-flex items-center gap-2",
  },
});
