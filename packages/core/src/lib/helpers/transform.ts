import { isArray, isObject, isString, mapValues } from "radashi";

export function applyArbitraryVars(theme: any): any {
  if (isString(theme)) return transformString(theme);
  if (isArray(theme)) return theme.map(applyArbitraryVars);

  if (theme && isObject(theme)) {
    const out: any = {};

    for (const [key, value] of Object.entries(theme)) {
      out[key] = applyArbitraryVars(value);
    }

    return out;
  }

  return theme;
}

export function applyPrefixToObject(
  theme: any,
  prefix?: string,
  context: string[] = []
): any {
  if (!(theme && prefix)) return theme;

  const currentKey = context.at(-1);
  const compoundVariantsIndex = context.indexOf("compoundVariants");

  const isInCompoundVariant =
    compoundVariantsIndex !== -1 &&
    !context.slice(compoundVariantsIndex).includes("class");
  const isInDefaultVariants = context.includes("defaultVariants");
  const isComponentSizeValue =
    isString(theme) &&
    isString(currentKey) &&
    currentKey.endsWith("Size") &&
    isSizeValue(theme);

  if (
    isString(theme) &&
    (isInCompoundVariant || isInDefaultVariants || isComponentSizeValue)
  )
    return theme;

  if (isString(theme)) return prefixClasses(theme, prefix);
  if (isArray(theme))
    return theme.map((item, index) =>
      applyPrefixToObject(item, prefix, [...context, String(index)])
    );

  if (isObject(theme)) {
    const output: any = {};

    for (const [key, value] of Object.entries(theme)) {
      output[key] = applyPrefixToObject(value, prefix, [...context, key]);
    }

    return output;
  }

  return theme;
}

export function applyUnstyled(result: any): any {
  if (!result) return result;

  const blank = (value: unknown): unknown =>
    value && isObject(value) && !isArray(value)
      ? mapValues(value as Record<string, unknown>, () => "")
      : "";

  if (result.slots) {
    result.slots = mapValues(result.slots, () => "");
  }

  if (result.variants) {
    result.variants = mapValues(result.variants, (group) =>
      mapValues(group as Record<string, unknown>, blank)
    );
  }

  if (result.compoundVariants) {
    result.compoundVariants = result.compoundVariants.map(
      ({ class: cls, ...selectors }: Record<string, unknown>) => ({
        ...selectors,
        class: blank(cls),
      })
    );
  }

  return result;
}

function isSizeValue(value: string) {
  // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
  return /^(?:[23]x[sl]|xs|sm|md|lg|xl)$/.test(value.trim());
}

function prefixClasses(classString: string, prefix: string) {
  if (!(prefix && classString)) return classString;
  return classString
    .split(" ")
    .filter(Boolean)
    .map((cls) => `${prefix}${cls}`)
    .join(" ");
}

function transformString(input: string): string {
  return input.replace(
    /((?:[a-z0-9-]+:)*[a-z0-9-]+)-\(([^)]+)\)/g,
    (_, prop, value) => `${prop}-[${transformValue(value)}]`
  );
}

function transformValue(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith("--")) return `var(${trimmed})`;
  return trimmed;
}
