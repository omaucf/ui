import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    content:
      "pointer-events-auto origin-(--reka-popover-content-transform-origin) rounded-md bg-default shadow-lg ring ring-default focus:outline-none data-[state=closed]:animate-[scale-out_100ms_ease-in] data-[state=open]:animate-[scale-in_100ms_ease-out]",
    arrow: "fill-bg stroke-default",
  },
});
