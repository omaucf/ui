import { type CnOptions, cnMerge, createTV } from "tailwind-variants";

export const cn = (...classes: CnOptions) =>
  cnMerge(classes)({ twMerge: true });

export const cv = createTV({ twMerge: true });

export { cx } from "tailwind-variants";
