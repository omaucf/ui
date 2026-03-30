import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative",
      container: "mx-auto flex max-w-2xl flex-col",
      header: "",
      meta: "mb-2 flex items-center gap-3",
      date: "truncate text-sm/6 text-toned",
      badge: "",
      title: "relative text-pretty font-semibold text-highlighted text-xl",
      description: "mt-1 text-pretty text-base text-muted",
      imageWrapper:
        "group/changelog-version-image relative mt-5 aspect-16/9 overflow-hidden rounded-lg",
      image: "h-full w-full object-cover object-top",
      authors: "flex flex-wrap gap-x-4 gap-y-1.5",
      footer: "flex items-center justify-between border-default border-t pt-5",
      indicator:
        "absolute start-0 top-0 hidden w-32 min-w-0 items-center justify-end gap-3 lg:flex",
      dot: "my-1 flex size-4 items-center justify-center rounded-full bg-default ring ring-default",
      dotInner: "size-2 rounded-full bg-primary",
    },
    variants: {
      body: {
        false: {
          footer: "mt-5",
        },
      },
      badge: {
        false: {
          meta: "lg:hidden",
        },
      },
      to: {
        true: {
          title: [
            "rounded-xs has-focus-visible:ring-2 has-focus-visible:ring-primary",
            options.theme?.transitions && "transition",
          ],
          image:
            "transform transition-transform duration-200 group-hover/changelog-version-image:scale-105 group-has-focus-visible/changelog-version-image:scale-105",
        },
      },
      hidden: {
        true: {
          date: "lg:hidden",
        },
      },
    },
  });
