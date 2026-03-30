import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

import defaults from "@veehance/ui/defaults";
import type { Options, UI } from "@veehance/ui/types";

import type { UnpluginOptions } from "unplugin";

import { getTemplates } from "../template";

export default (options: Options, ui: UI) => {
  const templates = getTemplates(options, ui, options.router);
  const templateKeys = new Set(templates.map((t) => `#build/${t.filename}`));

  function writeTemplates(root: string) {
    const map: Record<string, string> = {};
    const dir = join(root, options.dts?.output ?? defaults.dts.output);

    for (const template of templates) {
      if (!(template.write && template.filename)) {
        continue;
      }

      const filePath = join(dir, template.filename);
      if (!existsSync(dirname(filePath))) {
        mkdirSync(dirname(filePath), { recursive: true });
      }

      writeFileSync(filePath, template.getContents({} as any));
      map[`#build/${template.filename}`] = filePath;
    }

    return map;
  }

  return {
    name: "vee:ui:templates",
    enforce: "pre",
    vite: {
      config(config) {
        return {
          resolve: { alias: writeTemplates(config.root || process.cwd()) },
        };
      },
    },
    resolveId(id) {
      if (templateKeys.has(`${id}.ts`))
        return `${id.replace("#build/", "virtual:ui-templates/")}.ts`;
    },
    loadInclude: (id) =>
      templateKeys.has(id.replace("virtual:ui-templates/", "#build/")),
    load(id) {
      const _id = id.replace("virtual:ui-templates/", "#build/");
      return templates
        .find((t) => `#build/${t.filename}` === _id)
        ?.getContents({} as any);
    },
  } satisfies UnpluginOptions;
};
