import type { Options } from "@/types/ui.js";

export default (options: Options) => /*ui*/ ({
  defaultVariants: {
    color: "neutral",
    size: "md",
  },
  slots: {
    fallback: "truncate rounded-full font-medium",
    icon: "shrink-0",
    image: "h-full w-full rounded-[inherit] object-cover",
    root: "relative inline-flex shrink-0 select-none items-center justify-center rounded-full align-middle after:absolute after:inset-0 after:rounded-full after:border after:border-default/10 after:mix-blend-darken dark:after:mix-blend-lighten",
  },
  variants: {
    color: {
      ...Object.fromEntries(
        (options.theme?.colors || []).map((color: string) => [
          color,
          {
            fallback: `text-${color}`,
            icon: `text-${color}`,
            root: `bg-${color}/10`,
          },
        ])
      ),
      neutral: {
        fallback: "text-muted",
        icon: "text-muted",
        root: "bg-elevated",
      },
    },
    size: {
      "2xl": { root: "size-14 text-2xl" },
      "2xs": { root: "size-6 text-xs" },
      "3xl": { root: "size-16 text-3xl" },
      "3xs": { root: "size-5 text-[10px]" },
      lg: { root: "size-11 text-xl" },
      md: { root: "size-10 text-lg" },
      sm: { root: "size-8 text-base" },
      xl: { root: "size-12 text-2xl" },
      xs: { root: "size-7 text-sm" },
    },
  },
});
