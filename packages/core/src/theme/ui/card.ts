export default /*ui*/ {
  defaultVariants: {
    size: "md",
    variant: "outline",
  },
  slots: {
    action: "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
    body: "",
    description: "text-muted text-sm",
    footer: "flex items-center",
    header:
      "grid auto-rows-min items-start gap-1 has-data-[part=action]:grid-cols-[1fr_auto] has-data-[part=description]:grid-rows-[auto_auto]",
    root: "flex flex-col overflow-hidden text-sm ring-1 has-[>img:first-child]:pt-0",
    title: "font-heading font-medium text-base text-highlighted",
  },
  variants: {
    size: {
      md: {
        body: "px-6",
        footer: "px-6 [.border-t]:pt-6",
        header: "px-6 [.border-t]:pb-6",
        root: "gap-6 py-6",
      },
      sm: {
        body: "px-4",
        footer: "px-4 [.border-t]:pt-4",
        header: "px-4 [.border-b]:pb-4",
        root: "gap-4 py-4",
      },
    },
    variant: {
      outline: {
        root: "bg-default ring ring-default",
      },
      soft: {
        root: "bg-elevated/50",
      },
      solid: {
        description: "text-dimmed",
        root: "bg-inverted text-inverted",
        title: "text-inverted",
      },
      subtle: {
        root: "bg-elevated/50 ring ring-default",
      },
    },
  },
};
