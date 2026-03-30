import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    base: "mt-6 mb-2 scroll-mt-[calc(24px+45px+var(--ui-header-height))] font-bold text-highlighted text-lg lg:scroll-mt-[calc(24px+var(--ui-header-height))] [&>a]:focus-visible:outline-primary",
    link: "",
  },
});
