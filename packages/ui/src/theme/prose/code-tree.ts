import type { Options } from "../../lib/types/ui.js";
import { cc } from "../../lib/utils/tailwind.js";

export default (options: Options) =>
  cc({
    slots: {
      root: "relative my-5 grid rounded-md border border-muted lg:h-[450px] lg:grid-cols-3",
      list: "relative isolate overflow-y-auto border-muted border-b p-2 lg:border-e lg:border-b-0",
      item: "",
      listWithChildren: "ms-4.5 border-default border-s",
      itemWithChildren: "-ms-px ps-1.5",
      link: "group peer relative flex w-full items-center gap-1.5 px-2.5 py-1.5 text-sm before:absolute before:inset-x-0 before:inset-y-px before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none focus-visible:before:ring-2 focus-visible:before:ring-inset",
      linkLeadingIcon: "size-4 shrink-0",
      linkLabel: "truncate",
      linkTrailing: "ms-auto inline-flex items-center gap-1.5",
      linkTrailingIcon:
        "size-5 shrink-0 transform transition-transform duration-200 group-data-expanded:rotate-180",
      content:
        "flex flex-col overflow-hidden lg:col-span-2 [&>div>div]:border-0 [&>div>pre]:flex-1 [&>div>pre]:rounded-l-none [&>div>pre]:border-s-0 [&>div>pre]:border-e-0 [&>div>pre]:border-b-0 [&>div]:my-0 [&>div]:flex [&>div]:flex-1 [&>div]:flex-col [&>div]:overflow-y-auto",
    },
    variants: {
      active: {
        true: {
          link: "text-highlighted before:bg-elevated",
        },
        false: {
          link: [
            "hover:text-highlighted hover:before:bg-elevated/50",
            options.theme?.transitions &&
              "transition-colors before:transition-colors",
          ],
        },
      },
    },
  });
