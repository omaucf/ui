export default /*ui*/ {
  card: {
    slots: {
      footer: "rounded-b-xl",
      header: "rounded-t-xl",
      root: "rounded-xl has-data-[slot=footer]:pb-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl",
      title: "leading-snug",
    },
    variants: {
      size: {
        md: {
          body: "px-4",
          footer: "border-t px-4",
          header: "px-4 [.border-b]:pb-4",
          root: "gap-4 py-4",
        },
        sm: {
          body: "px-3",
          footer: "border-t px-3",
          header: "px-3 [.border-b]:pb-3",
          root: "gap-3 py-3",
        },
      },
    },
  },
};
