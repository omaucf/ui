import { kebabCase } from "scule";

import { generateCSS } from "./lib/functions/css.js";
import { generateTheme } from "./lib/functions/theme.js";
import type { Options, Template } from "./lib/types/ui.js";
import content from "./theme/content/index.js";
import ui from "./theme/index.js";
import prose from "./theme/prose/index.js";

export function getTemplates(options: Options): Template[] {
  const templates: Template[] = [];

  for (const cfg of [
    {
      source: content,
      dir: "theme/content",
      enabled: !!options.content,
    },
    {
      source: prose,
      dir: "theme/prose",
      enabled: !!(options.content || options.prose),
    },
  ]) {
    pushTemplates(templates, cfg, options);
  }

  for (const component of Object.keys(ui)) {
    templates.push({
      filename: `theme/${kebabCase(component)}.ts`,
      write: true,
      getContents: () => generateTheme(ui, component, options),
    });
  }

  templates.push({
    filename: "theme/index.ts",
    write: true,
    getContents: () => {
      const lines: string[] = [];

      if (options.content) {
        lines.push("export content from './content/index.js'");
      }

      if (options.content || options.prose) {
        lines.push("export prose from './prose/index.js'");
      }

      for (const component of Object.keys(ui)) {
        lines.push(writeExport(component));
      }

      return lines.join("\n");
    },
  });

  templates.push({
    filename: "ui.css",
    write: true,
    getContents: () => generateCSS(options),
  });

  return templates;
}

function pushTemplates(
  templates: Template[],
  {
    source,
    dir,
    enabled,
  }: {
    dir: string;
    enabled: boolean;
    source: Record<string, any>;
  },
  options: Options
) {
  if (!enabled) return;

  for (const template of Object.keys(source)) {
    templates.push({
      filename: `${dir}/${kebabCase(template)}.ts`,
      write: true,
      getContents: () => generateTheme(source, template, options),
    });
  }

  templates.push({
    filename: `${dir}/index.ts`,
    write: true,
    getContents: () => writeIndex(Object.keys(source)),
  });
}

function writeExport(item: string) {
  return `export { default as ${item} } from './${kebabCase(item)}.js'`;
}

function writeIndex(items: string[]) {
  return items.map((c) => writeExport(c)).join("\n");
}
