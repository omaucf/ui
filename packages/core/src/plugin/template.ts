import type { UnpluginOptions } from "unplugin";

import { createAliases, createTemplates } from "../factory.js";
import type { Template } from "../lib/types/index.js";

export function templatePlugin(
  templates: Template[],
  output?: string
): UnpluginOptions {
  const templateKeys = new Set(templates.map((t) => `#build/${t.filename}`));
  return {
    name: "ui:template",
    enforce: "pre",
    vite: {
      config(config) {
        const root = config.root || process.cwd();
        createTemplates(root, templates, output);
        return { resolve: { alias: createAliases(root, templates, output) } };
      },
    },
    resolveId(id) {
      if (templateKeys.has(`${id}.ts`))
        return `${id.replace("#build/", "virtual:ui-template/")}.ts`;
    },
    loadInclude(id) {
      return templateKeys.has(id.replace("virtual:ui-template/", "#build/"));
    },
    load(id) {
      const _id = id.replace("virtual:ui-template/", "#build/");
      return templates
        .find((t) => `#build/${t.filename}` === _id)
        ?.getContents({} as any);
    },
  };
}
