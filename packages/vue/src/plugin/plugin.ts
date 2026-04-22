import { VUE_ANATOMY } from "@veehance/core/constants";
import type { Config } from "@veehance/core/types";

import { genSafeVariableName } from "knitwork";
import { resolvePathSync } from "mlly";
import type { UnpluginContextMeta, UnpluginOptions } from "unplugin";

const resolveConfig = { extensions: [".ts", ".js"], url: import.meta.url };

export default function pluginPlugin(
  _config: Config,
  _meta: UnpluginContextMeta
) {
  const plugins = [
    resolvePathSync("../base/plugins/head", resolveConfig),
    resolvePathSync("../base/plugins/router", resolveConfig),
  ];

  return {
    enforce: "pre",
    load() {
      const imports = plugins.map((plugin) => ({
        name: genSafeVariableName(plugin),
        path: plugin,
      }));

      return [
        ...imports.map(({ name, path }) => `import ${name} from "${path}";`),
        "",
        "export default {",
        "  install(app) {",
        ...imports.map(({ name }) => `    app.use(${name});`),
        "  },",
        "};",
      ].join("\n");
    },
    loadInclude: (id) => id === "virtual:ui-plugin",
    name: "ui:plugin",
    resolveId(id) {
      if (id === `${VUE_ANATOMY.NAME}/plugin`) return "virtual:ui-plugin";
    },
  } as UnpluginOptions;
}
