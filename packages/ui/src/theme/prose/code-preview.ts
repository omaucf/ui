import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "my-5",
    preview: "relative flex justify-center rounded-md border border-muted p-4",
    code: "[&>div>pre]:rounded-t-none [&>div]:my-0",
  },
  variants: {
    code: {
      true: {
        preview: "rounded-b-none border-b-0",
      },
    },
  },
});
