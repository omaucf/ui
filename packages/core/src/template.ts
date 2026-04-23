import { kebabCase } from "scule";

import {
  generateAppConfig,
  generateCSS,
  generateTheme,
} from "./lib/functions/index.js";
import type { Options, Template } from "./lib/types/index.js";
import ui from "./theme/index.js";

export function getTemplates(options: Options): Template[] {
  const templates: Template[] = [];
  const isNuxt = options.target === "vue" && options.router === null;

  if (!isNuxt) {
    templates.push({
      filename: "app.config.ts",
      write: true,
      getContents: () => generateAppConfig(options),
    });
  }

  templates.push({
    filename: "ui.css",
    write: true,
    getContents: () => generateCSS(options),
  });

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

      for (const component of Object.keys(ui)) {
        lines.push(
          `export { default as ${component} } from './${kebabCase(component)}.js'`
        );
      }

      return lines.join("\n");
    },
  });

  return templates;
}
