export default (options: { theme?: { transitions?: boolean } }) => /*ui*/ ({
  _id: "link",
  base: "ring-primary/25 focus:ring-2",
  compoundVariants: [
    {
      active: false,
      class: [
        "hover:text-default",
        options.theme?.transitions && "transition-colors",
      ],
      disabled: false,
    },
  ],
  variants: {
    active: {
      false: "text-muted",
      true: "text-primary",
    },
    disabled: {
      true: "cursor-not-allowed opacity-75",
    },
  },
});
