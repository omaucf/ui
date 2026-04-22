import appConfig from "#build/app.config";

import { type CnOptions, cnMerge, createTV } from "tailwind-variants";

export const cc = (classes: string | string[]) => {
  const classString = Array.isArray(classes) ? classes.join(" ") : classes;
  const prefix = appConfig.ui.strategy.options?.prefix;
  if (!prefix || prefix === "" || !classString) return classString;
  return (
    classString
      // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
      .split(/\s+/)
      .filter(Boolean)
      .map((cls) => `${prefix}${cls}`)
      .join(" ")
  );
};

export const cn = (...classes: CnOptions) =>
  cnMerge(classes)({
    twMerge: appConfig.ui.strategy.merge ?? true,
    twMergeConfig: appConfig.ui.strategy.options,
  });

export const cv = createTV({
  twMerge: appConfig.ui.strategy.merge ?? true,
  twMergeConfig: appConfig.ui.strategy.options,
});

export { cx } from "tailwind-variants";
