/** biome-ignore-all lint/performance/useTopLevelRegex: safe_to_set */
import { createComponents } from "@veehance/core/create";
import { setupExclude, setupVue } from "@veehance/core/dev";
import { parseLocalDir } from "@veehance/core/helpers";
import type { Config } from "@veehance/core/types";

import { isBoolean } from "radashi";
import type { UnpluginContextMeta, UnpluginOptions } from "unplugin";
import components from "unplugin-vue-components";

export default function componentPlugin(
  config: Config,
  meta: UnpluginContextMeta
) {
  const entries = createComponents(config);
  const resolver = setupVue(entries, config?.dts?.prefix);

  const defaults = config?.dts?.components;
  const local = parseLocalDir(
    defaults && !isBoolean(defaults) ? defaults.local : false,
    "src/components"
  );

  return components.raw(
    {
      dirs: local ? local : [],
      dts: true,
      exclude: setupExclude({ extra: [/[\\/]\.tanstack[\\/]/] }),
      resolvers: [resolver],
    },
    meta as any
  ) as UnpluginOptions;
}
