import { cc } from "../lib/utils/tailwind.js";

export default cc({
  slots: {
    root: "relative w-full",
    table:
      "hidden w-full table-fixed border-separate border-spacing-x-0 md:table",
    list: "flex w-full flex-col gap-6 md:hidden",
    item: "flex flex-col rounded-lg border border-default p-6",
    caption: "sr-only",
    thead: "",
    tbody: "",
    tr: "",
    th: "border-default border-b py-4 text-left font-normal",
    td: "border-default border-b px-6 py-4 text-center",
    tier: "p-6 text-left font-normal",
    tierTitleWrapper: "flex items-center gap-3",
    tierTitle: "font-semibold text-highlighted text-lg",
    tierDescription: "mt-1 font-normal text-muted text-sm",
    tierBadge: "truncate",
    tierPriceWrapper: "mt-4 flex items-center gap-1",
    tierPrice: "font-semibold text-3xl text-highlighted sm:text-4xl",
    tierDiscount: "text-muted text-xl line-through sm:text-2xl",
    tierBilling: "flex min-w-0 flex-col justify-between",
    tierBillingPeriod: "truncate font-medium text-toned text-xs",
    tierBillingCycle: "truncate font-medium text-muted text-xs",
    tierButton: "mt-6",
    tierFeatureIcon: "size-5 shrink-0",
    section: "mt-6 flex flex-col gap-2",
    sectionTitle: "font-semibold text-highlighted text-sm",
    feature: "flex items-center justify-between gap-1",
    featureTitle: "text-default text-sm",
    featureValue: "flex min-w-5 justify-center text-muted text-sm",
  },
  variants: {
    section: {
      true: {
        tr: "*:pt-8",
      },
    },
    active: {
      true: {
        tierFeatureIcon: "text-primary",
      },
    },
    highlight: {
      true: {
        tier: "rounded-t-lg border-default border-x border-t bg-elevated/50",
        td: "border-default border-x bg-elevated/50",
        item: "bg-elevated/50",
      },
    },
  },
});
