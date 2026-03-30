import { cc } from "../lib/utils/tailwind.js";

export const fieldGroupVariant = cc({
  fieldGroup: {
    horizontal:
      "not-last:not-first:rounded-none not-only:first:rounded-e-none not-only:last:rounded-s-none focus-visible:z-1",
    vertical:
      "not-last:not-first:rounded-none not-only:first:rounded-b-none not-only:last:rounded-t-none focus-visible:z-1",
  },
});

export const fieldGroupVariantWithRoot = cc({
  fieldGroup: {
    horizontal: {
      root: "group has-focus-visible:z-1",
      base: "group-not-last:group-not-first:rounded-none group-not-only:group-last:rounded-s-none group-not-only:group-first:rounded-e-none",
    },
    vertical: {
      root: "group has-focus-visible:z-1",
      base: "group-not-last:group-not-first:rounded-none group-not-only:group-last:rounded-t-none group-not-only:group-first:rounded-b-none",
    },
  },
});

export default cc({
  base: "relative",
  variants: {
    size: {
      xs: "",
      sm: "",
      md: "",
      lg: "",
      xl: "",
    },
    orientation: {
      horizontal: "inline-flex -space-x-px",
      vertical: "flex flex-col -space-y-px",
    },
  },
});
