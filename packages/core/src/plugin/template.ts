import type { UnpluginOptions } from "unplugin";

import type { Template } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

import { createAliases, createTemplates } from "../create.js";

export default function templatePlugin(config: Config, templates: Template[]) {
  const templateKeys = new Set(templates.map((t) => `#build/${t.filename}`));
  return {
    enforce: "pre",
    async load(id) {
      const _id = id.replace("virtual:ui-template/", "#build/");
      return await templates
        .find((t) => `#build/${t.filename}` === _id)
        ?.getContents({} as any);
    },
    loadInclude(id) {
      return templateKeys.has(id.replace("virtual:ui-template/", "#build/"));
    },
    name: "ui:template",
    resolveId(id) {
      if (templateKeys.has(`${id}.ts`))
        return `${id.replace("#build/", "virtual:ui-template/")}.ts`;
    },
    vite: {
      async config(c) {
        const root = c.root || process.cwd();
        await createTemplates(templates, root, config.dts?.output);
        return {
          resolve: {
            alias: createAliases(templates, root, config.dts?.output),
          },
        };
      },
    },
  } satisfies UnpluginOptions;
}
