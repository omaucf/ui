export default /*ui*/ {
  card: {
    slots: {
      description: "leading-relaxed",
      header: "gap-1.5 rounded-none",
      root: "shadow-sm *:[img:first-child]:rounded-none *:[img:last-child]:rounded-none",
      title: "font-semibold text-lg uppercase tracking-wider",
    },
    variants: {
      size: {
        md: {
          body: "px-8",
          footer: "px-8 [.border-t]:pt-8",
          header: "px-8 [.border-b]:pb-8",
          root: "gap-8 py-8",
        },
        sm: {
          body: "px-5",
          footer: "px-5 [.border-t]:pt-5",
          header: "px-5 [.border-b]:pb-5",
          root: "gap-5 py-5",
        },
      },
    },
  },
};
