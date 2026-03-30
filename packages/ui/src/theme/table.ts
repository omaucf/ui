import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative overflow-auto",
      base: "min-w-full",
      caption: "sr-only",
      thead: "relative",
      tbody:
        "isolate [&>tr]:data-[selectable=true]:focus-visible:outline-primary [&>tr]:data-[selectable=true]:hover:bg-elevated/50",
      tfoot: "relative",
      tr: "data-[selected=true]:bg-elevated/50",
      th: "px-4 py-3.5 text-left font-semibold text-highlighted text-sm rtl:text-right [&:has([role=checkbox])]:pe-0",
      td: "whitespace-nowrap p-4 text-muted text-sm [&:has([role=checkbox])]:pe-0",
      separator: "absolute left-0 z-1 h-px w-full bg-(--ui-border-accented)",
      empty: "py-6 text-center text-muted text-sm",
      loading: "py-6 text-center",
    },
    variants: {
      virtualize: {
        false: {
          base: "overflow-clip",
          tbody: "divide-y divide-default",
        },
      },
      pinned: {
        true: {
          th: "sticky z-1 bg-default/75",
          td: "sticky z-1 bg-default/75",
        },
      },
      sticky: {
        true: {
          thead: "sticky inset-x-0 top-0 z-1 bg-default/75 backdrop-blur",
          tfoot: "sticky inset-x-0 bottom-0 z-1 bg-default/75 backdrop-blur",
        },
        header: {
          thead: "sticky inset-x-0 top-0 z-1 bg-default/75 backdrop-blur",
        },
        footer: {
          tfoot: "sticky inset-x-0 bottom-0 z-1 bg-default/75 backdrop-blur",
        },
      },
      loading: {
        true: {
          thead: "after:absolute after:z-1 after:h-px",
        },
      },
      loadingAnimation: {
        carousel: "",
        "carousel-inverse": "",
        swing: "",
        elastic: "",
      },
      loadingColor: {
        ...Object.fromEntries(
          (options.theme?.colors || []).map((color: string) => [color, ""])
        ),
        neutral: "",
      },
    },
    compoundVariants: [
      ...(options.theme?.colors || []).map((loadingColor: string) => ({
        loading: true,
        loadingColor,
        class: {
          thead: `after:bg-${loadingColor}`,
        },
      })),
      {
        loading: true,
        loadingColor: "neutral",
        class: {
          thead: "after:bg-inverted",
        },
      },
      {
        loading: true,
        loadingAnimation: "carousel",
        class: {
          thead:
            "after:animate-[carousel_2s_ease-in-out_infinite] rtl:after:animate-[carousel-rtl_2s_ease-in-out_infinite]",
        },
      },
      {
        loading: true,
        loadingAnimation: "carousel-inverse",
        class: {
          thead:
            "after:animate-[carousel-inverse_2s_ease-in-out_infinite] rtl:after:animate-[carousel-inverse-rtl_2s_ease-in-out_infinite]",
        },
      },
      {
        loading: true,
        loadingAnimation: "swing",
        class: {
          thead: "after:animate-[swing_2s_ease-in-out_infinite]",
        },
      },
      {
        loading: true,
        loadingAnimation: "elastic",
        class: {
          thead: "after:animate-[elastic_2s_ease-in-out_infinite]",
        },
      },
    ],
    defaultVariants: {
      loadingColor: "primary",
      loadingAnimation: "carousel",
    },
  });
