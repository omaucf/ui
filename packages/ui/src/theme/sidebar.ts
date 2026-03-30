import type { Options } from "../lib/types/ui.js";
import { cc } from "../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "peer [--sidebar-width-icon:4rem] [--sidebar-width:16rem]",
      gap: "relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-linear",
      container:
        "fixed inset-y-0 z-10 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-linear lg:flex",
      inner: "flex size-full flex-col divide-y divide-default overflow-hidden",
      header:
        "flex min-h-(--ui-header-height) items-center gap-1.5 overflow-hidden px-4",
      wrapper: "min-w-0 flex-1",
      title: "truncate font-semibold text-highlighted",
      description: "truncate text-muted text-sm",
      actions: "flex shrink-0 items-center gap-1.5",
      close: "",
      body: "flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-4",
      footer: "flex items-center gap-1.5 overflow-hidden p-4",
      rail: [
        "absolute inset-y-0 z-20 hidden w-4 transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-px hover:after:bg-(--ui-border-accented) lg:flex",
        options.theme?.transitions && "after:transition-colors",
      ],
    },
    variants: {
      side: {
        left: {
          container: "left-0 border-default border-e",
          rail: "end-0 translate-x-1/2",
        },
        right: {
          container: "right-0 border-default border-s",
          rail: "-start-px -translate-x-1/2",
        },
      },
      collapsible: {
        offcanvas: {
          root: "group/sidebar hidden lg:block",
          gap: "data-[state=collapsed]:w-0",
        },
        icon: {
          root: "group/sidebar hidden lg:block",
          gap: "data-[state=collapsed]:w-(--sidebar-width-icon)",
          container: "data-[state=collapsed]:w-(--sidebar-width-icon)",
          actions: "group-data-[state=collapsed]/sidebar:hidden",
          body: "group-data-[state=collapsed]/sidebar:overflow-hidden",
        },
        none: {
          root: "h-full w-(--sidebar-width)",
        },
      },
      variant: {
        sidebar: {},
        floating: {
          container: "border-transparent p-4",
          inner: "rounded-lg shadow-lg ring ring-default",
          rail: "inset-y-4",
        },
        inset: {
          container: "border-transparent py-4",
          inner: "divide-transparent",
          rail: "inset-y-4",
        },
      },
    },
    compoundVariants: [
      {
        side: "left",
        collapsible: ["offcanvas", "icon"],
        class: {
          rail: "cursor-w-resize data-[state=collapsed]:cursor-e-resize",
        },
      },
      {
        side: "right",
        collapsible: ["offcanvas", "icon"],
        class: {
          rail: "cursor-e-resize data-[state=collapsed]:cursor-w-resize",
        },
      },
      {
        side: "left",
        collapsible: "none",
        class: {
          root: "border-default border-e",
        },
      },
      {
        side: "right",
        collapsible: "none",
        class: {
          root: "border-default border-s",
        },
      },
      {
        side: "left",
        collapsible: "offcanvas",
        class: {
          container: "data-[state=collapsed]:-left-(--sidebar-width)",
        },
      },
      {
        side: "right",
        collapsible: "offcanvas",
        class: {
          container: "data-[state=collapsed]:-right-(--sidebar-width)",
        },
      },
      {
        variant: "floating",
        collapsible: "icon",
        class: {
          gap: "data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+--spacing(8))]",
          container:
            "data-[state=collapsed]:w-[calc(var(--sidebar-width-icon)+--spacing(8)+2px)]",
        },
      },
      {
        variant: "floating",
        collapsible: "none",
        class: {
          root: "border-0 p-4",
        },
      },
      {
        variant: "inset",
        collapsible: "none",
        class: {
          root: "border-0 py-4",
        },
      },
      {
        variant: "floating",
        side: "left",
        class: {
          rail: "end-4",
        },
      },
      {
        variant: "floating",
        side: "right",
        class: {
          rail: "start-[calc(--spacing(4)-1px)]",
        },
      },
    ],
  });
