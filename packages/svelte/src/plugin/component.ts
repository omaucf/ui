/** biome-ignore-all lint/performance/useTopLevelRegex: safe_to_set */
import { createComponents } from "@veehance/core/create";
import { setupExclude, setupSvelte } from "@veehance/core/dev";
import { parseLocalDir } from "@veehance/core/helpers";
import type { Config } from "@veehance/core/types";

import { isBoolean } from "radashi";
import type { UnpluginContextMeta, UnpluginOptions } from "unplugin";
import components from "unplugin-svelte-components";

export default function componentsPlugin(
  config: Config,
  meta: UnpluginContextMeta
): UnpluginOptions {
  const entries = createComponents(config);
  const external = setupSvelte(entries);

  const defaults = config?.dts?.components;
  const local = parseLocalDir(
    defaults && !isBoolean(defaults) ? defaults.local : false,
    "src/lib/components"
  );

  return components.raw(
    {
      dirs: local ? local : [],
      dts: true,
      eslintrc: { enabled: false },
      exclude: setupExclude({
        extra: [/[\\/]\.router[\\/]/, /[\\/]\.svelte-kit[\\/]/],
      }),
      external,
    },
    meta as any
  ) as UnpluginOptions;
}
