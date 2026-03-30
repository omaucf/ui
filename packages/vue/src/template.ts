import { generateUI, extractUI } from "@veehance/ui/functions";
import { getTemplates as getRawTemplates } from "@veehance/ui/template";
import type { Options, Router, Template } from "@veehance/ui/types";

import { addTemplate, addTypeTemplate, type Resolver } from "@nuxt/kit";
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "@nuxt/schema";
import { defu } from "defu";

export function addTemplates(
  options: Options,
  nuxt: Nuxt,
  resolve: Resolver["resolve"]
) {
  const templates = getTemplates(options, nuxt.options.appConfig.ui, null);

  for (const template of templates) {
    if (template.filename?.endsWith(".d.ts")) {
      addTypeTemplate(template as NuxtTypeTemplate);
    } else {
      addTemplate(template as NuxtTemplate);
    }
  }

  nuxt.hook("prepare:types", ({ references }) => {
    references.push({ path: resolve("./lib/types/build.d.ts") });
  });
}

export function getTemplates(
  opts: Options,
  ui: Record<string, Record<string, any>>,
  router?: Router
) {
  const options = defu({ ui }, opts) as Options;
  const templates: Template[] = getRawTemplates(options);
  const isNuxt = router === null;

  if (!isNuxt) {
    templates.push({
      filename: "app.config.ts",
      write: true,
      getContents: () =>
        `export default ${JSON.stringify({ colorMode: options.colorMode, ui: options.ui }, null, 2)}\n`,
    });
  }

  templates.push(...generateUI(options, router));

  if (isNuxt) {
    templates.push({
      filename: "types/ui.d.ts",
      getContents: () => {
        const [colors, icons] = extractUI(
          options.theme?.colors,
          options.ui?.icons
        );

        return `import type { UI } from '@veehance/ui/types'

import type * as theme from '#build/theme/index'

type AppConfig = {
  ui: UI<
    typeof theme,
    ${colors},
    ${icons}
  >
}

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: AppConfig["ui"]
  }
}

export {}\n`;
      },
    });
  }

  return templates;
}
