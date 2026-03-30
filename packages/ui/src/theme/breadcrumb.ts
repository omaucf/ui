import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative min-w-0",
      list: "flex items-center gap-1.5",
      item: "flex min-w-0",
      link: "group relative flex min-w-0 items-center gap-1.5 text-sm focus-visible:outline-primary",
      linkLeadingIcon: "size-5 shrink-0",
      linkLeadingAvatar: "shrink-0",
      linkLeadingAvatarSize: "2xs",
      linkLabel: "truncate",
      separator: "flex",
      separatorIcon: "size-5 shrink-0 text-muted",
    },
    variants: {
      active: {
        true: {
          link: "font-semibold text-primary",
        },
        false: {
          link: "font-medium text-muted",
        },
      },
      disabled: {
        true: {
          link: "cursor-not-allowed opacity-75",
        },
      },
      to: {
        true: "",
      },
    },
    compoundVariants: [
      {
        disabled: false,
        active: false,
        to: true,
        class: {
          link: [
            "hover:text-default",
            options.theme?.transitions && "transition-colors",
          ],
        },
      },
    ],
  });
