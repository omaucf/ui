import { cc } from "../../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "group relative my-5",
    header:
      "relative flex items-center gap-1.5 rounded-t-md border border-muted border-b-0 bg-default px-4 py-3",
    filename: "text-default text-sm/6",
    icon: "size-4 shrink-0",
    copy: "absolute top-[11px] right-[11px] transition lg:opacity-0 lg:group-hover:opacity-100",
    base: "group wrap-break-word overflow-x-auto whitespace-pre-wrap rounded-md border border-muted bg-muted px-4 py-3 font-mono text-sm/6 focus:outline-none **:[.line.highlight]:-mx-4 **:[.line.highlight]:bg-accented/50! **:[.line.highlight]:px-4 **:[.line]:block",
  },
  variants: {
    filename: {
      true: {
        root: "my-5 [&>pre]:my-0 [&>pre]:rounded-t-none",
      },
    },
  },
});
