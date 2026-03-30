import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative overflow-hidden",
    title: "text-center font-semibold text-highlighted text-lg",
    logos: "mt-10",
    logo: "size-10 shrink-0",
  },
  variants: {
    marquee: {
      false: {
        logos:
          "flex shrink-0 items-center justify-around gap-(--gap) [--gap:--spacing(16)]",
      },
    },
  },
});
