import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import { getConfig } from "./config.js";
import defaults from "./lib/defaults.js";
import {
  resolveColors,
  resolveOptions,
  resolveUI,
} from "./lib/helpers/index.js";
import type { Dict, Options, Template } from "./lib/types/index.js";
import { getTemplates } from "./template.js";

export function createAliases(
  root: string,
  templates: Template[],
  output?: string
) {
  const dir = join(root, output ?? defaults.dts.output);
  const map: Dict<string, string> = {};

  for (const template of templates) {
    if (!(template.write && template.filename)) continue;
    const filePath = join(dir, template.filename);
    map[`#build/${template.filename}`] = filePath;
  }

  return map;
}

export function createTemplates(
  root: string,
  templates: Template[],
  output?: string
) {
  const dir = join(root, output ?? defaults.dts.output);
  for (const template of templates) {
    if (!(template.write && template.filename)) continue;

    const filePath = join(dir, template.filename);

    if (!existsSync(dirname(filePath))) {
      mkdirSync(dirname(filePath), { recursive: true });
    }

    writeFileSync(filePath, template.getContents({} as any));
  }
}

export function writeTemplates(root: string, options: Options) {
  const opts = resolveOptions(getConfig(process.cwd()), options);

  opts.theme ??= {};
  opts.theme.colors = resolveColors(opts.theme.colors);

  const ui = resolveUI({
    tailwind: opts.tailwind,
    theme: opts.theme,
    ui: opts.ui,
  });

  opts.tailwind?.inlines?.push(`${ui?.tw?.options?.prefix ?? ""}isolate`);

  const templates = getTemplates({ ...opts, ui });
  createTemplates(root, templates, opts.dts?.output);
}
