export default /*ui*/ {
  card: {
    slots: {
      footer: "rounded-b-4xl",
      header: "gap-1.5 rounded-t-4xl",
      root: "rounded-4xl shadow-sm *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl",
      title: "font-medium",
    },
    variants: {
      size: {
        md: {
          body: "px-5",
          footer: "px-5 [.border-t]:pt-5",
          header: "px-5 [.border-b]:pb-5",
          root: "gap-5 py-5",
        },
        sm: {
          body: "px-4",
          footer: "px-4 [.border-t]:pt-4",
          header: "px-4 [.border-b]:pb-4",
          root: "gap-4 py-4",
        },
      },
    },
  },
};
