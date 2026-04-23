import { camelCase } from "scule";

import { default as defaults } from "../defaults.js";
import type { Icons } from "../types/icon.js";
import type { Options } from "../types/ui.js";

export function detectIcons(icons?: Icons<any>) {
  if (!icons) return [defaults.theme.iconset];

  const collections = Object.values(icons)
    .map((value) => value.split(":"))
    .filter((parts) => parts.length > 1)
    .map((parts) => parts[0]);

  return collections.length
    ? [...new Set(collections)]
    : [defaults.theme.iconset];
}

export function generateIcons(options: Options = {}) {
  const sets = detectIcons(options.ui?.icons);

  const entries = sets.map((name) => ({ name, identifier: camelCase(name) }));
  const imports = entries
    .map(({ name, identifier }) => writeImport(name, identifier))
    .join("\n");

  const iconsObject = entries.map((e) => e.identifier).join(", ");
  return `${imports}\n\nexport default { ${iconsObject} }\n`;
}

function writeImport(name: string, identifier: string) {
  return `import ${identifier} from '@iconify-json/${name}/icons.json' with { type: 'json' }`;
}
