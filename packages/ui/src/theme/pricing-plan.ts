import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative grid gap-6 rounded-lg p-6 lg:p-8 xl:p-10",
    header: "",
    body: "flex min-w-0 flex-col",
    footer: "flex flex-col items-center gap-6",
    titleWrapper: "flex items-center gap-3",
    title:
      "truncate text-pretty font-semibold text-2xl text-highlighted sm:text-3xl",
    description: "mt-2 text-pretty text-base text-muted",
    priceWrapper: "flex items-center gap-1",
    price: "font-semibold text-3xl text-highlighted sm:text-4xl",
    discount: "text-muted text-xl line-through sm:text-2xl",
    billing: "flex min-w-0 flex-col justify-between",
    billingPeriod: "truncate font-medium text-toned text-xs",
    billingCycle: "truncate font-medium text-muted text-xs",
    features: "mt-6 flex flex-1 grow-0 flex-col gap-3",
    feature: "flex min-w-0 items-center gap-2",
    featureIcon: "size-5 shrink-0 text-primary",
    featureTitle: "truncate text-muted text-sm",
    badge: "",
    button: "",
    tagline: "font-semibold text-base text-default",
    terms: "text-balance text-center text-muted text-xs/5",
  },
  variants: {
    orientation: {
      horizontal: {
        root: "grid-cols-1 justify-between divide-y divide-default lg:grid-cols-3 lg:divide-x lg:divide-y-0",
        body: "justify-center pb-6 lg:col-span-2 lg:pr-6 lg:pb-0",
        footer:
          "lg:mx-auto lg:w-full lg:max-w-xs lg:items-center lg:justify-center lg:p-6",
        features: "lg:mt-12 lg:grid lg:grid-cols-2",
      },
      vertical: {
        footer: "justify-end",
        priceWrapper: "mt-6",
      },
    },
    variant: {
      solid: {
        root: "bg-inverted",
        title: "text-inverted",
        description: "text-dimmed",
        price: "text-inverted",
        discount: "text-dimmed",
        billingCycle: "text-dimmed",
        billingPeriod: "text-dimmed",
        featureTitle: "text-dimmed",
      },
      outline: {
        root: "bg-default ring ring-default",
      },
      soft: {
        root: "bg-elevated/50",
      },
      subtle: {
        root: "bg-elevated/50 ring ring-default",
      },
    },
    highlight: {
      true: {
        root: "ring-2 ring-primary ring-inset",
      },
    },
    scale: {
      true: {
        root: "lg:z-[1] lg:scale-[1.1]",
      },
    },
  },
  compoundVariants: [
    {
      orientation: "horizontal",
      variant: "soft",
      class: {
        root: "divide-accented",
      },
    },
    {
      orientation: "horizontal",
      variant: "subtle",
      class: {
        root: "divide-accented",
      },
    },
  ],
  defaultVariants: {
    variant: "outline",
  },
});
