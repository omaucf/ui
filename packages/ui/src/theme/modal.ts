import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    overlay: "fixed inset-0",
    content:
      "flex flex-col divide-y divide-default bg-default focus:outline-none",
    header: "flex min-h-(--ui-header-height) items-center gap-1.5 p-4 sm:px-6",
    wrapper: "",
    body: "flex-1 p-4 sm:p-6",
    footer: "flex items-center gap-1.5 p-4 sm:px-6",
    title: "font-semibold text-highlighted",
    description: "mt-1 text-muted text-sm",
    close: "absolute end-4 top-4",
  },
  variants: {
    transition: {
      true: {
        overlay:
          "data-[state=closed]:animate-[fade-out_200ms_ease-in] data-[state=open]:animate-[fade-in_200ms_ease-out]",
        content:
          "data-[state=closed]:animate-[scale-out_200ms_ease-in] data-[state=open]:animate-[scale-in_200ms_ease-out]",
      },
    },
    fullscreen: {
      true: {
        content: "inset-0",
      },
      false: {
        content:
          "w-[calc(100vw-2rem)] max-w-lg rounded-lg shadow-lg ring ring-default",
      },
    },
    overlay: {
      true: {
        overlay: "bg-elevated/75",
      },
    },
    scrollable: {
      true: {
        overlay: "overflow-y-auto",
        content: "relative",
      },
      false: {
        content: "fixed",
        body: "overflow-y-auto",
      },
    },
  },
  compoundVariants: [
    {
      scrollable: true,
      fullscreen: false,
      class: {
        overlay: "grid place-items-center p-4 sm:py-8",
      },
    },
    {
      scrollable: false,
      fullscreen: false,
      class: {
        content:
          "top-1/2 left-1/2 max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-hidden sm:max-h-[calc(100dvh-4rem)]",
      },
    },
  ],
});
