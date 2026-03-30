import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "flex min-h-[calc(100vh-var(--ui-header-height))] flex-col items-center justify-center text-center",
    statusCode: "font-semibold text-base text-primary",
    statusMessage:
      "mt-2 text-balance font-bold text-4xl text-highlighted sm:text-5xl",
    message: "mt-4 text-balance text-lg text-muted",
    links: "mt-8 flex items-center justify-center gap-6",
  },
});
