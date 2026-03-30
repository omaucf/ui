import { defu } from "defu";

import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";
import input from "./input.js";

export default (options: Options) => {
  return defu(
    cc({
      slots: {
        leading: "absolute start-0 flex items-start",
        trailing: "absolute end-0 flex items-start",
      },
      variants: {
        autoresize: {
          true: {
            base: "resize-none",
          },
        },
        size: {
          xs: {
            leading: "inset-y-1 ps-2",
            trailing: "inset-y-1 pe-2",
          },
          sm: {
            leading: "inset-y-1.5 ps-2.5",
            trailing: "inset-y-1.5 pe-2.5",
          },
          md: {
            leading: "inset-y-1.5 ps-2.5",
            trailing: "inset-y-1.5 pe-2.5",
          },
          lg: {
            leading: "inset-y-2 ps-3",
            trailing: "inset-y-2 pe-3",
          },
          xl: {
            leading: "inset-y-2 ps-3",
            trailing: "inset-y-2 pe-3",
          },
        },
      },
    }),
    input(options)
  );
};
