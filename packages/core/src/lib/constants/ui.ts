export const COLOR_KEYS = [
  "primary",
  "secondary",
  "success",
  "info",
  "warning",
  "error",
] as const;

export const COMPONENT_KEYS = new Set([
  "base",
  "compoundSlots",
  "compoundVariants",
  "defaultVariants",
  "extend",
  "slots",
  "variants",
]);

export const ICON_KEYS = [
  "arrowDown",
  "arrowLeft",
  "arrowRight",
  "arrowUp",
  "chevronDoubleLeft",
  "chevronDoubleRight",
  "chevronDown",
  "chevronLeft",
  "chevronRight",
  "chevronUp",
  "close",
  "dark",
  "image",
  "light",
  "loading",
  "menu",
  "search",
  "system",
  "warning",
] as const;
