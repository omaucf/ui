import type { Options } from "@veehance/core/types";

import { genSafeVariableName } from "knitwork";
import MagicString from "magic-string";
import { resolvePathSync } from "mlly";
import type { UnpluginOptions } from "unplugin";

const resolveOptions = { extensions: [".ts", ".js"], url: import.meta.url };

export function pluginPlugin(options: Options): UnpluginOptions {
  const plugins: string[] = [
    resolvePathSync("../base/plugins/color-mode", resolveOptions),
    resolvePathSync("../base/plugins/head", resolveOptions),
  ];

  if (!options?.tailwind?.cssVariables) {
    plugins.push(resolvePathSync("../lib/plugins/color", resolveOptions));
  }

  return {
    name: "ui:plugin",
    enforce: "pre",
    resolveId(id) {
      if (id === "@veehance/vue/plugin") return "virtual:ui-plugin";
    },
    transform(code, id) {
      if (
        plugins.some((p) => id.startsWith(p)) &&
        code.includes("import.meta.client")
      ) {
        const s = new MagicString(code);
        s.replaceAll("import.meta.client", "true");
        if (s.hasChanged())
          return { code: s.toString(), map: s.generateMap({ hires: true }) };
      }
    },
    loadInclude: (id) => id === "virtual:ui-plugin",
    load() {
      return `${plugins.map((p) => `import ${genSafeVariableName(p)} from "${p}"`).join("\n")}\nexport default {\n    install (app) {\n    ${plugins.map((p) => `    app.use(${genSafeVariableName(p)})`).join("\n")}\n    }\n}`;
    },
  };
}
