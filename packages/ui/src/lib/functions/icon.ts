import { camelCase } from "scule";

import { default as defaults } from "../defaults.js";
import type { Icon, Icons } from "../types/icon.js";
import type { Options } from "../types/ui.js";

export function detectIcons<T extends Icon = Icon>(icons?: Icons<T>) {
  if (!icons) return [defaults.theme.iconset];

  const collections = Object.values(icons)
    .map((value) => value.split(":"))
    .filter((parts) => parts.length > 1)
    .map((parts) => parts[0]);

  return collections.length
    ? [...new Set(collections)]
    : [defaults.theme.iconset];
}

export function generateIcons(options?: Options) {
  const sets = detectIcons(options?.ui?.icons);
  const entries = sets.map((name) => ({
    name,
    identifier: camelCase(name),
    raw: false,
  }));

  if (options?.content || options?.prose) {
    entries.push({
      name: "vscode-icons",
      identifier: "vscodeIcons",
      raw: false,
    });
  }

  const imports = entries.map(({ name, identifier, raw }) =>
    writeImport(name, identifier, raw)
  );

  const iconsObject = entries.map((e) => e.identifier).join(", ");
  return `${imports}\nexport default { ${iconsObject} };\n`;
}

function writeImport(name: string, identifier: string, raw?: boolean) {
  if (raw) return writeRaw(name, identifier);
  return writeIconify(name, identifier);
}

function writeIconify(name: string, identifier: string) {
  return `import ${identifier} from '@iconify-json/${name}/icons.json' with { type: 'json' };\n`;
}

function writeRaw(name: string, identifier: string) {
  return `import ${identifier} from './${name}.json' with { type: 'json' };\n`;
}
