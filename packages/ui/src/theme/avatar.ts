import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "inline-flex shrink-0 select-none items-center justify-center rounded-full bg-elevated align-middle",
    image: "h-full w-full rounded-[inherit] object-cover",
    fallback: "truncate font-medium text-muted leading-none",
    icon: "shrink-0 text-muted",
  },
  variants: {
    size: {
      "3xs": {
        root: "size-4 text-[8px]",
      },
      "2xs": {
        root: "size-5 text-[10px]",
      },
      xs: {
        root: "size-6 text-xs",
      },
      sm: {
        root: "size-7 text-sm",
      },
      md: {
        root: "size-8 text-base",
      },
      lg: {
        root: "size-9 text-lg",
      },
      xl: {
        root: "size-10 text-xl",
      },
      "2xl": {
        root: "size-11 text-[22px]",
      },
      "3xl": {
        root: "size-12 text-2xl",
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});
