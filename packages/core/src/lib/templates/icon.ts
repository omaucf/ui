/** biome-ignore-all lint/performance/useTopLevelRegex: safe_to_set */
import { camel } from "radashi";

import { resolveIcons } from "@/functions/icon.js";
import type { Config } from "@/types/schema.js";

export function generateIconsFile(config: Config) {
  const icons = resolveIcons(config);

  const imports: string[] = [];
  const exports: string[] = [];

  for (const icon of icons) {
    const identifier = camel(icon.name);
    exports.push(identifier);

    if (icon.type === "external") {
      imports.push(
        `import ${identifier} from '${icon.from ?? `@iconify-json/${icon.name}/icons.json`}' with { type: 'json' }`
      );

      continue;
    }

    imports.push(
      `import ${identifier} from './icons/${icon.name}.json' with { type: 'json' }`
    );
  }

  return [...imports, "", `export default { ${exports.join(", ")} }`].join(
    "\n"
  );
}

export function generateIconFile(
  collection: Record<string, string>,
  prefix: string
) {
  const icons = Object.fromEntries(
    Object.entries(collection).map(([name, svg]) => [name, svgToIconify(svg)])
  );

  return JSON.stringify({ icons, prefix }, null, 2);
}

function svgToIconify(svg: string) {
  const viewBox = svg.match(/viewBox=["']([^"']+)["']/)?.[1] ?? "0 0 24 24";

  const [, , width, height] = viewBox.split(/\s+/).map(Number);
  const body = svg
    .replace(/^<svg\b[^>]*>/i, "")
    .replace(/<\/svg>\s*$/i, "")
    .trim();

  return { body, height, width };
}
