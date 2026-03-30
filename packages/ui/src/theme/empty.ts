import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative flex min-w-0 flex-col items-center justify-center gap-4 rounded-lg p-4 sm:p-6 lg:p-8",
    header: "flex max-w-sm flex-col items-center gap-2 text-center",
    avatar: "mb-2 shrink-0",
    title: "text-pretty font-medium text-highlighted",
    description: "text-balance text-center",
    body: "flex max-w-sm flex-col items-center gap-4",
    actions: "flex shrink-0 flex-wrap justify-center gap-2",
    footer: "flex max-w-sm flex-col items-center gap-2",
  },
  variants: {
    size: {
      xs: {
        avatar: "size-8 text-base",
        title: "text-sm",
        description: "text-xs",
      },
      sm: {
        avatar: "size-9 text-lg",
        title: "text-sm",
        description: "text-xs",
      },
      md: {
        avatar: "size-10 text-xl",
        title: "text-base",
        description: "text-sm",
      },
      lg: {
        avatar: "size-11 text-[22px]",
        title: "text-base",
        description: "text-sm",
      },
      xl: {
        avatar: "size-12 text-2xl",
        title: "text-lg",
        description: "text-base",
      },
    },
    variant: {
      solid: {
        root: "bg-inverted",
        title: "text-inverted",
        description: "text-dimmed",
      },
      outline: {
        root: "bg-default ring ring-default",
        description: "text-muted",
      },
      soft: {
        root: "bg-elevated/50",
        description: "text-toned",
      },
      subtle: {
        root: "bg-elevated/50 ring ring-default",
        description: "text-toned",
      },
      naked: {
        description: "text-muted",
      },
    },
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});
