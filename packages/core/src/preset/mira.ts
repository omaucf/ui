export default /*ui*/ {
  card: {
    slots: {
      description: "text-xs/relaxed",
      footer: "rounded-b-lg",
      header: "rounded-t-lg",
      root: "rounded-lg text-xs/relaxed *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
      title: "text-sm",
    },
    variants: {
      size: {
        md: {
          body: "px-4",
          footer: "px-4 [.border-t]:pt-4",
          header: "px-4 [.border-b]:pb-4",
          root: "gap-4 py-4",
        },
        sm: {
          body: "px-3",
          footer: "px-3 [.border-t]:pt-3",
          header: "px-3 [.border-b]:pb-3",
          root: "gap-3 py-3",
        },
      },
    },
  },
};
