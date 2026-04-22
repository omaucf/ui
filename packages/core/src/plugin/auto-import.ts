import { isBoolean } from "radashi";
import type { UnpluginContextMeta, UnpluginOptions } from "unplugin";
import { default as autoImport } from "unplugin-auto-import";

import { parseLocalDir } from "@/helpers/parse.js";
import type { Config } from "@/types/schema.js";

import { createImports } from "../create.js";

export default function autoImportPlugin(
  config: Config,
  meta: UnpluginContextMeta
) {
  const defaults = config?.dts?.autoImport;
  const local = parseLocalDir(
    defaults && !isBoolean(defaults) ? defaults.local : false,
    "src/composables"
  );

  return autoImport.raw(
    { dirs: local ? local : [], dts: true, imports: createImports(config) },
    meta as any
  ) as UnpluginOptions;
}
