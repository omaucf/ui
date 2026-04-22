export default /*ui*/ {
  card: {
    slots: {
      header: "gap-1.5 rounded-t-4xl",
      root: "rounded-4xl shadow-md *:[img:first-child]:rounded-t-4xl *:[img:last-child]:rounded-b-4xl",
    },
    variants: {
      size: {
        md: { footer: "border-none px-0" },
        sm: { footer: "border-none px-0" },
      },
    },
  },
};
