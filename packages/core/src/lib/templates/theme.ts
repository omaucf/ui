import { compileThemeCSS, emitThemeCSS } from "@/functions/css.js";
import { resolveTheme } from "@/functions/theme.js";
import type { Config } from "@/types/schema.js";

export function generateThemeCSSFile<T>(
  theme: T,
  component: string,
  config: Config
) {
  const result = resolveTheme((theme as any)[component], config);
  return emitThemeCSS(compileThemeCSS(result, component), {
    engine: config.style?.engine === "unocss" ? "unocss" : "tailwind",
  });
}

export function generateThemeFile<T>(
  theme: T,
  component: string,
  config: Config
) {
  const result = resolveTheme((theme as any)[component], config);

  const variants = Object.entries(result.variants || {})
    .filter(([_, values]) => {
      const keys = Object.keys(values as Record<string, unknown>);
      return keys.some((key) => key !== "true" && key !== "false");
    })
    .map(([key]) => key);

  let json = JSON.stringify(result, null, 2);
  for (const variant of variants) {
    json = json.replace(
      new RegExp(`("${variant}": "[^"]+")`, "g"),
      `$1 as typeof ${variant}[number]`
    );

    json = json.replace(
      new RegExp(`("${variant}": \\[\\s*)((?:"[^"]+",?\\s*)+)(\\])`, "g"),
      (_, before, match, after) => {
        const replaced = match.replace(
          /("[^"]+")/g,
          `$1 as typeof ${variant}[number]`
        );

        return `${before}${replaced}${after}`;
      }
    );
  }

  return [
    ...resolveVariantDeclarations(result, variants),
    `export default ${json}`,
  ].join("\n\n");
}

function resolveVariantDeclarations(
  result: Record<string, any>,
  variants: string[]
) {
  return variants.map((variant) => {
    const keys = Object.keys(result.variants[variant]);
    return `const ${variant} = ${JSON.stringify(keys, null, 2)} as const`;
  });
}
