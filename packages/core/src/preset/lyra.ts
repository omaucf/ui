export default /*ui*/ {
  card: {
    slots: {
      description: "text-xs/relaxed",
      footer: "rounded-none",
      header: "rounded-none",
      root: "rounded-none text-xs/relaxed has-data-[slot=footer]:pb-0 *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
      title: "text-sm",
    },
    variants: {
      size: {
        md: {
          body: "px-4",
          footer: "border-t px-4",
          header: "px-4 [.border-t]:pb-4",
          root: "gap-4 py-4",
        },
        sm: {
          body: "px-3",
          footer: "border-t px-3",
          header: "px-3 [.border-t]:pb-3",
          root: "gap-3 py-3",
        },
      },
    },
  },
};
