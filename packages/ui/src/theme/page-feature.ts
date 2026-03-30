import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative rounded-sm",
      wrapper: "",
      leading: "inline-flex items-center justify-center",
      leadingIcon: "size-5 shrink-0 text-primary",
      title: "text-pretty font-semibold text-base text-highlighted",
      description: "text-pretty text-[15px] text-muted",
    },
    variants: {
      orientation: {
        horizontal: {
          root: "flex items-start gap-2.5",
          leading: "p-0.5",
        },
        vertical: {
          leading: "mb-2.5",
        },
      },
      to: {
        true: {
          root: [
            "has-focus-visible:ring-2 has-focus-visible:ring-primary",
            options.theme?.transitions && "transition",
          ],
        },
      },
      title: {
        true: {
          description: "mt-1",
        },
      },
    },
  });
