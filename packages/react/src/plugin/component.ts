/** biome-ignore-all lint/performance/useTopLevelRegex: safe_to_set */
import { createComponents } from "@veehance/core/create";
import { setupExclude, setupReact } from "@veehance/core/dev";
import { parseLocalDir } from "@veehance/core/helpers";
import type { Config } from "@veehance/core/types";

import { isBoolean } from "radashi";
import type { UnpluginContextMeta, UnpluginOptions } from "unplugin";
import components, { generateDts, searchGlob } from "unplugin-react-components";

let dtsGenerated = false;

export default function componentsPlugin(
  config: Config,
  meta: UnpluginContextMeta
): UnpluginOptions {
  const entries = createComponents(config);
  const resolver = setupReact(entries);

  if (!dtsGenerated) {
    const rootPath = process.cwd();

    const defaults = config?.dts?.components;
    const local = parseLocalDir(
      defaults && !isBoolean(defaults) ? defaults.local : false,
      "src/components"
    );

    generateDts({
      components: searchGlob({ rootPath: `${rootPath}/${local}` }),
      filename: "components",
      local: !!local,
      resolvers: [resolver],
      rootPath,
    });

    dtsGenerated = true;
  }

  return components.raw(
    {
      dts: false,
      exclude: setupExclude({
        extra: [/[\\/]\.react-router[\\/]/, /[\\/]\.tanstack[\\/]/],
      }),
      resolvers: [resolver],
    },
    meta as any
  ) as UnpluginOptions;
}
