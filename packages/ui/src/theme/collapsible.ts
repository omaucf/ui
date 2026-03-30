import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "",
    content:
      "overflow-hidden data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=open]:animate-[collapsible-down_200ms_ease-out]",
  },
});
