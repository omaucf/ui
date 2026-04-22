import { isArray, isBoolean, isNullish, isObject, isString } from "radashi";

export interface CSSRule {
  atRules?: string[];
  selector: string;
  utilities: string[];
}

export interface CSSCompileOptions {
  engine: "tailwind" | "unocss";
}

interface VariantCondition {
  name: string;
  value: string | boolean;
}

interface UtilityRule {
  atRules?: string[];
  selector?: string;
  utility: string;
}

type SelectorModifierType =
  | "attached"
  | "child"
  | "descendant"
  | "replace"
  | "selector";

interface UtilityModifier {
  atRules?: string[];
  selector?: string;
  selectorType?: SelectorModifierType;
}

const BREAKPOINTS: Record<string, string> = {
  "2xl": "1536px",
  lg: "1024px",
  md: "768px",
  sm: "640px",
  xl: "1280px",
};

const ELEMENT_MODIFIERS = new Set([
  "a",
  "abbr",
  "article",
  "aside",
  "audio",
  "b",
  "blockquote",
  "button",
  "canvas",
  "code",
  "dd",
  "div",
  "dl",
  "dt",
  "em",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "header",
  "hr",
  "i",
  "img",
  "input",
  "label",
  "li",
  "main",
  "nav",
  "ol",
  "option",
  "p",
  "path",
  "pre",
  "section",
  "select",
  "small",
  "span",
  "strong",
  "svg",
  "table",
  "tbody",
  "td",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "tr",
  "ul",
  "video",
]);

const INTRINSIC_VARIANTS: Record<string, { true: string; false: string }> = {
  disabled: {
    false: ':not(:is(:disabled, [aria-disabled="true"]))',
    true: ':is(:disabled, [aria-disabled="true"])',
  },
};

const PSEUDO_MODIFIERS: Record<string, string> = {
  active: ":active",
  checked: ":checked",
  disabled: ":disabled",
  empty: ":empty",
  enabled: ":enabled",
  even: ":nth-child(even)",
  first: ":first-child",
  "first-letter": "::first-letter",
  "first-line": "::first-line",
  "first-of-type": ":first-of-type",
  focus: ":focus",
  "focus-visible": ":focus-visible",
  "focus-within": ":focus-within",
  hover: ":hover",
  indeterminate: ":indeterminate",
  invalid: ":invalid",
  last: ":last-child",
  "last-of-type": ":last-of-type",
  odd: ":nth-child(odd)",
  only: ":only-child",
  "only-of-type": ":only-of-type",
  optional: ":optional",
  placeholder: "::placeholder",
  required: ":required",
  root: ":root",
  valid: ":valid",
  visited: ":visited",
};

export function compileThemeCSS(
  theme: Record<string, any>,
  component: string
): CSSRule[] {
  const selector = scopeSelector(component);
  const slots = isObject(theme.slots)
    ? (theme.slots as Record<string, unknown>)
    : undefined;
  return [
    ...compileBase(theme.base, selector, slots),
    ...compileSlots(theme.slots, selector),
    ...compileVariants(theme.variants, selector, slots),
    ...compileCompoundVariants(theme.compoundVariants, selector, slots),
  ];
}

export function emitCSS(rules: CSSRule[], options: CSSCompileOptions) {
  const grouped = groupRules(rules);
  return grouped.map((rule) => emitRule(rule, options)).join("\n\n");
}

export function emitThemeCSS(rules: CSSRule[], options: CSSCompileOptions) {
  const body = emitCSS(rules, options);
  if (!body) return "";
  return ["@layer components {", indent(body, 1), "}"].join("\n");
}

function compileBase(
  value: unknown,
  selector: string,
  slots?: Record<string, unknown>
): CSSRule[] {
  if (isNullish(value)) return [];
  return expandStyles(
    partSelector(selector, resolveRootPart(slots)),
    value,
    slots
  );
}

function compileSlots(slots: unknown, selector: string): CSSRule[] {
  if (!isObject(slots)) return [];
  return Object.entries(slots).flatMap(([slot, styles]) =>
    expandStyles(partSelector(selector, slot), styles)
  );
}

function compileVariants(
  variants: Record<string, Record<string, unknown>> | undefined,
  selector: string,
  slots?: Record<string, unknown>
): CSSRule[] {
  if (!variants) return [];
  return Object.entries(variants).flatMap(([name, values]) =>
    Object.entries(values).flatMap(([value, styles]) =>
      compileVariantValue(
        selector,
        [{ name, value: resolveVariantValue(value) }],
        styles,
        slots
      )
    )
  );
}

function compileVariantValue(
  selector: string,
  conditions: VariantCondition[],
  styles: unknown,
  slots?: Record<string, unknown>
): CSSRule[] {
  if (!isSlotMap(styles, slots)) {
    return expandStyles(
      resolveVariantSelector(
        selector,
        conditions,
        resolveRootPart(slots),
        slots
      ),
      styles,
      slots
    );
  }

  return Object.entries(styles).flatMap(([part, partStyles]) =>
    expandStyles(
      resolveVariantSelector(selector, conditions, part, slots),
      partStyles,
      slots
    )
  );
}

function compileCompoundVariants(
  variants: unknown,
  selector: string,
  slots?: Record<string, unknown>
): CSSRule[] {
  if (!isArray(variants)) return [];

  return variants.flatMap((variant) => {
    if (!isObject(variant)) return [];

    const { class: styles, ...conditions } = variant as Record<string, unknown>;
    if (isNullish(styles)) return [];

    return compileVariantValue(
      selector,
      Object.entries(conditions).map(([name, value]) => ({
        name,
        value: resolveVariantValue(value),
      })),
      styles,
      slots
    );
  });
}

function expandStyles(
  selector: string,
  styles: unknown,
  slots?: Record<string, unknown>
): CSSRule[] {
  if (isNullish(styles)) return [];

  if (isSlotMap(styles, slots)) {
    return Object.entries(styles).flatMap(([part, partStyles]) =>
      expandStyles(partSelector(selector, part), partStyles, slots)
    );
  }

  return compileUtilities(styles).map(
    ({ utility, selector: modifier, atRules }) => {
      const rule: CSSRule = {
        selector: resolveSelector(selector, modifier),
        utilities: [utility],
      };
      if (atRules?.length) rule.atRules = atRules;
      return rule;
    }
  );
}

function compileUtilities(value: unknown): UtilityRule[] {
  return flattenUtilities(value).map(resolveUtility);
}

function applyConditions(
  selector: string,
  conditions: VariantCondition[]
): string {
  return conditions.reduce(
    (result, condition) => `${result}${resolveCondition(condition)}`,
    selector
  );
}

function isSlotMap(
  styles: unknown,
  slots?: Record<string, unknown>
): styles is Record<string, unknown> {
  if (!isObject(styles) || isArray(styles)) return false;
  if (slots) return Object.keys(styles).every((key) => key in slots);
  return Object.values(styles).every(
    (value) =>
      isString(value) || isArray(value) || isNullish(value) || value === false
  );
}

function partSelector(selector: string, part?: string): string {
  if (!part) return selector;
  return `${selector}[data-part="${escapeAttribute(part)}"]`;
}

function resolveRootPart(slots?: Record<string, unknown>): string | undefined {
  if (!slots) return;
  if ("root" in slots) return "root";
  if ("base" in slots) return "base";
}

function scopeSelector(component: string): string {
  return `[data-scope="${escapeAttribute(component)}"]`;
}

function resolveCondition(condition: VariantCondition): string {
  const intrinsic = INTRINSIC_VARIANTS[condition.name];
  if (intrinsic && isBoolean(condition.value))
    return condition.value ? intrinsic.true : intrinsic.false;
  if (isBoolean(condition.value))
    return condition.value
      ? `[data-${condition.name}]`
      : `:not([data-${condition.name}])`;
  return `[data-${condition.name}="${escapeAttribute(condition.value)}"]`;
}

function resolveVariantValue(value: unknown): string | boolean {
  if (value === true || value === "true") return true;
  if (value === false || value === "false") return false;
  return String(value);
}

function flattenUtilities(value: unknown): string[] {
  // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
  if (isString(value)) return value.split(/\s+/).filter(Boolean);
  if (isArray(value)) return value.flatMap(flattenUtilities);
  return [];
}

function resolveUtility(utility: string): UtilityRule {
  const parts = splitUtility(utility);
  if (parts.length === 1) return { utility };

  const value = parts.pop()!;
  const modifiers = parts;

  let selector: string | undefined;

  const atRules: string[] = [];
  const preserved: string[] = [];

  for (const modifier of modifiers) {
    const resolved = resolveUtilityModifier(modifier);

    if (resolved.selector) {
      selector = resolveSelector(
        selector ?? "&",
        resolved.selector,
        resolved.selectorType
      );
      continue;
    }

    if (resolved.atRules) {
      atRules.push(...resolved.atRules);
      continue;
    }

    preserved.push(modifier);
  }

  return {
    atRules: atRules.length ? atRules : undefined,
    selector: selector === "&" ? undefined : selector,
    utility: [...preserved, value].join(":"),
  };
}

function resolveUtilityModifier(modifier: string): UtilityModifier {
  const selector = resolveSelectorModifier(modifier);
  if (selector) return selector;

  const responsive = resolveResponsiveModifier(modifier);
  if (responsive) return { atRules: [responsive] };

  return {};
}

function resolveSelectorModifier(
  modifier: string
): UtilityModifier | undefined {
  return (
    resolveHasModifier(modifier) ??
    resolveArbitraryModifier(modifier) ??
    resolvePseudoModifier(modifier) ??
    resolveUniversalModifier(modifier) ??
    resolveElementModifier(modifier)
  );
}

function resolveHasModifier(modifier: string): UtilityModifier | undefined {
  if (modifier.startsWith("has-[") && modifier.endsWith("]")) {
    const value = modifier.slice("has-[".length, -1);
    if (!value) return;
    return {
      selector: `&:has(${normalizeArbitrarySelector(value)})`,
      selectorType: "selector",
    };
  }

  if (modifier.startsWith("has-data-[") && modifier.endsWith("]")) {
    const value = modifier.slice("has-data-[".length, -1);
    if (!value) return;
    return { selector: `&:has([data-${value}])`, selectorType: "selector" };
  }
}

function resolveArbitraryModifier(
  modifier: string
): UtilityModifier | undefined {
  if (!(modifier.startsWith("[") && modifier.endsWith("]"))) return;

  const value = modifier.slice(1, -1);
  if (!value) return;

  const selector = normalizeArbitrarySelector(value);
  if (selector.includes("&")) return { selector, selectorType: "replace" };

  if (isAttachedSelector(selector))
    return { selector, selectorType: "attached" };
  return { selector, selectorType: "descendant" };
}

function isAttachedSelector(selector: string): boolean {
  // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
  return /^[.#:[[]/.test(selector);
}

function normalizeArbitrarySelector(value: string): string {
  return value.replaceAll("_", " ");
}

function resolvePseudoModifier(modifier: string): UtilityModifier | undefined {
  const pseudo = PSEUDO_MODIFIERS[modifier];
  if (!pseudo) return;
  return { selector: `&${pseudo}`, selectorType: "selector" };
}

function resolveElementModifier(modifier: string): UtilityModifier | undefined {
  if (!ELEMENT_MODIFIERS.has(modifier)) return;
  return { selector: modifier, selectorType: "descendant" };
}

function resolveUniversalModifier(
  modifier: string
): UtilityModifier | undefined {
  if (modifier !== "*") return;
  return { selector: "& > *", selectorType: "child" };
}

function resolveResponsiveModifier(modifier: string): string | undefined {
  const value = BREAKPOINTS[modifier];
  if (!value) return;
  return `@media (min-width: ${value})`;
}

function resolveSelector(
  selector: string,
  modifier?: string,
  type?: SelectorModifierType
): string {
  if (!modifier) return selector;
  if (type === "replace") return modifier.replaceAll("&", selector);
  if (type === "child") return `${selector} > *`;
  if (type === "attached") return `${selector}${modifier}`;
  if (type === "descendant" && selector.endsWith(" > *"))
    return `${selector.slice(0, -4)} > ${modifier}`;
  // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
  if (type === "descendant") return `${selector} ${modifier.replace(/^&/, "")}`;
  return modifier.replaceAll("&", selector);
}

function resolveVariantSelector(
  selector: string,
  conditions: VariantCondition[],
  part?: string,
  slots?: Record<string, unknown>
): string {
  const rootPart = resolveRootPart(slots);
  const conditionSelector = applyConditions(selector, conditions);
  if (!rootPart) return conditionSelector;
  if (!part || part === rootPart)
    return partSelector(conditionSelector, rootPart);
  return `${conditionSelector} ${partSelector(selector, part)}`;
}

function splitUtility(value: string): string[] {
  const result: string[] = [];

  let current = "";
  let bracketDepth = 0;
  let parenDepth = 0;

  for (const char of value) {
    if (char === "[") {
      bracketDepth++;
    } else if (char === "]") {
      bracketDepth--;
    } else if (char === "(") {
      parenDepth++;
    } else if (char === ")") {
      parenDepth--;
    }

    if (char === ":" && bracketDepth === 0 && parenDepth === 0) {
      result.push(current);

      current = "";
      continue;
    }

    current += char;
  }

  if (current) result.push(current);
  return result;
}

function groupRules(rules: CSSRule[]): CSSRule[] {
  const groups = new Map<string, CSSRule>();

  for (const rule of rules) {
    if (!rule.utilities.length) continue;

    const atRules = rule.atRules ?? [];
    const key = JSON.stringify({ atRules, selector: rule.selector });

    const existing = groups.get(key);
    if (existing) {
      existing.utilities.push(...rule.utilities);
      continue;
    }

    groups.set(key, {
      atRules: atRules.length ? [...atRules] : undefined,
      selector: rule.selector,
      utilities: [...rule.utilities],
    });
  }

  return [...groups.values()].map((rule) => ({
    ...rule,
    utilities: [...new Set(rule.utilities)],
  }));
}

function emitApply(
  utilities: string[],
  engine: CSSCompileOptions["engine"]
): string {
  if (!utilities.length) return "";
  const value = utilities.join(" ");
  if (engine === "unocss") return `--at-apply: '${value}';`;
  return `@apply ${value};`;
}

function emitRule(rule: CSSRule, options: CSSCompileOptions): string {
  const apply = emitApply(rule.utilities, options.engine);
  if (!apply) return "";

  let result = [`${rule.selector} {`, indent(apply, 1), "}"].join("\n");
  for (const atRule of [...(rule.atRules ?? [])].reverse()) {
    result = [`${atRule} {`, indent(result, 1), "}"].join("\n");
  }

  return result;
}

function escapeAttribute(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function indent(value: string, level: number): string {
  const prefix = "  ".repeat(level);
  return value
    .split("\n")
    .map((line) => (line ? `${prefix}${line}` : ""))
    .join("\n");
}
