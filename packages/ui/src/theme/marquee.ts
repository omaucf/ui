import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "group relative flex items-center gap-(--gap) overflow-hidden [--duration:20s] [--gap:--spacing(16)]",
    content: "flex min-w-max shrink-0 items-center justify-around gap-(--gap)",
  },
  variants: {
    orientation: {
      horizontal: {
        content: "w-full",
      },
      vertical: {
        content: "h-full",
      },
    },
    pauseOnHover: {
      true: {
        content: "group-hover:[animation-play-state:paused]",
      },
    },
    reverse: {
      true: {
        content: "[animation-direction:reverse]!",
      },
    },
    overlay: {
      true: {
        root: 'before:pointer-events-none before:absolute before:z-2 before:from-default before:to-transparent before:content-[""] after:pointer-events-none after:absolute after:z-2 after:from-default after:to-transparent after:content-[""]',
      },
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      class: {
        root: "flex-row",
        content:
          "backface-hidden animate-[marquee_var(--duration)_linear_infinite] flex-row rtl:animate-[marquee-rtl_var(--duration)_linear_infinite]",
      },
    },
    {
      orientation: "horizontal",
      overlay: true,
      class: {
        root: "backface-hidden before:inset-y-0 before:left-0 before:h-full before:w-1/3 before:bg-linear-to-r after:inset-y-0 after:right-0 after:h-full after:w-1/3 after:bg-linear-to-l",
      },
    },
    {
      orientation: "vertical",
      class: {
        root: "flex-col",
        content:
          "backface-hidden h-fit animate-[marquee-vertical_var(--duration)_linear_infinite] flex-col rtl:animate-[marquee-vertical-rtl_var(--duration)_linear_infinite]",
      },
    },
    {
      orientation: "vertical",
      overlay: true,
      class: {
        root: "backface-hidden before:inset-x-0 before:top-0 before:h-1/3 before:w-full before:bg-linear-to-b after:inset-x-0 after:bottom-0 after:h-1/3 after:w-full after:bg-linear-to-t",
      },
    },
  ],
});
