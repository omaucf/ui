import { generateUI } from "@veehance/ui/functions";
import { getTemplates as getRawTemplates } from "@veehance/ui/template";
import type { Options, Router, Template } from "@veehance/ui/types";

import { defu } from "defu";

export function getTemplates(
  opts: Options,
  ui: Record<string, Record<string, any>>,
  router?: Router
) {
  const options = defu({ ui }, opts) as Options;
  const templates: Template[] = getRawTemplates(options);

  templates.push(
    {
      filename: "app.config.ts",
      write: true,
      getContents: () =>
        `export default ${JSON.stringify({ colorMode: options.colorMode, ui: options.ui }, null, 2)}\n`,
    },
    ...generateUI(options, router)
  );

  return templates;
}
