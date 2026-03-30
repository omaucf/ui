import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative flex min-h-0 min-w-0 flex-1 flex-col",
    prompt: "rounded-t-none border-default border-t px-0",
    close: "",
    content: "flex flex-1 flex-col overflow-y-auto py-3",
  },
});
