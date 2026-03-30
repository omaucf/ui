import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "hidden items-center justify-center transition-all duration-200 ease-out sm:flex",
    handle: "cursor-grab px-1",
  },
});
