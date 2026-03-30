import { cc } from "../lib/utils/tailwind.js";

export default cc({
  base: "animate-[shimmer_var(--duration)_linear_infinite] bg-[linear-gradient(90deg,#0000_calc(50%-var(--spread)),var(--ui-text-highlighted),#0000_calc(50%+var(--spread))),linear-gradient(var(--ui-text-muted),var(--ui-text-muted))] bg-size-[calc(200%+var(--spread)*2+2px)_100%,auto] bg-clip-text bg-no-repeat text-transparent will-change-[background-position] rtl:animate-[shimmer-rtl_var(--duration)_linear_infinite]",
});
