import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "sticky top-(--ui-header-height) z-10 -mx-4 max-h-[calc(100vh-var(--ui-header-height))] overflow-y-auto bg-default/75 px-4 backdrop-blur sm:-mx-6 sm:px-6 lg:ms-0 lg:bg-[initial]",
      container:
        "flex flex-col border-default border-b border-dashed pt-4 pb-2.5 sm:pt-6 sm:pb-4.5 lg:border-0 lg:py-8",
      top: "",
      bottom: "hidden gap-6 lg:flex lg:flex-col",
      trigger:
        "group -mt-1.5 flex flex-1 items-center gap-1.5 py-1.5 font-semibold text-sm focus-visible:outline-primary",
      title: "truncate",
      trailing: "ms-auto inline-flex items-center gap-1.5",
      trailingIcon:
        "size-5 shrink-0 transform transition-transform duration-200 group-data-[state=open]:rotate-180 lg:hidden",
      content:
        "relative overflow-hidden focus:outline-none data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=open]:animate-[collapsible-down_200ms_ease-out]",
      list: "min-w-0",
      listWithChildren: "ms-3",
      item: "min-w-0",
      itemWithChildren: "",
      link: "group relative flex items-center py-1 text-sm focus-visible:outline-primary",
      linkText: "truncate",
      indicator: "",
      indicatorLine: "",
      indicatorActive: "",
    },
    variants: {
      color: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
      highlightColor: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [
            color,
            {
              indicatorActive: `bg-${color}`,
            },
          ])
        ),
        neutral: {
          indicatorActive: "bg-inverted",
        },
      },
      active: {
        false: {
          link: [
            "text-muted hover:text-default",
            options.theme?.transitions && "transition-colors",
          ],
        },
      },
      highlight: {
        true: "",
      },
      highlightVariant: {
        straight: "",
        circuit: "",
      },
      body: {
        true: {
          bottom: "mt-6",
        },
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((color: string) => ({
        color,
        active: true,
        class: {
          link: `text-${color}`,
        },
      })),
      {
        color: "neutral",
        active: true,
        class: {
          link: "text-highlighted",
        },
      },
      {
        highlight: true,
        highlightVariant: "straight",
        class: {
          list: "ms-2.5 border-default border-s ps-4",
          item: "-ms-px",
          indicator:
            "absolute ms-2.5 h-(--indicator-size) w-px translate-y-(--indicator-position) rounded-full transition-[translate,height] duration-200",
          indicatorLine: "hidden",
          indicatorActive: "h-full w-full",
        },
      },
      {
        highlight: true,
        highlightVariant: "circuit",
        class: {
          list: "ps-6.5",
          item: "-ms-px",
          itemWithChildren: "ps-px",
          indicator: "absolute start-0 top-0 ms-2.5 rtl:-scale-x-100",
          indicatorLine: "absolute inset-0 bg-border",
          indicatorActive:
            "absolute h-(--indicator-size) w-full translate-y-(--indicator-position) transition-[translate,height] duration-200 ease-out",
        },
      },
    ],
    defaultVariants: {
      color: "primary",
      highlightColor: "primary",
      highlightVariant: "straight",
    },
  });
