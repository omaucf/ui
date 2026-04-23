import { generateIcons, generateImports } from "@veehance/core/functions";
import { extractUI } from "@veehance/core/helpers";
import { getTemplates as getRawTemplates } from "@veehance/core/template";
import type { Options, Template } from "@veehance/core/types";

import { addTemplate, addTypeTemplate, type Resolver } from "@nuxt/kit";
import type { Nuxt, NuxtTemplate, NuxtTypeTemplate } from "@nuxt/schema";

export function addTemplates(
  options: Options,
  nuxt: Nuxt,
  resolve: Resolver["resolve"]
) {
  const templates = getTemplates({
    ...options,
    router: null,
    ui: nuxt.options.appConfig.ui,
  });

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

export function getTemplates(options: Options) {
  const templates: Template[] = getRawTemplates(options);
  const isNuxt = options.router === null;

  templates.push(
    {
      filename: "ui/imports.ts",
      write: true,
      getContents: () => generateImports(options),
    },
    {
      filename: "ui/icons.ts",
      write: true,
      getContents: () => generateIcons(options),
    }
  );

  if (isNuxt) {
    templates.push({
      filename: "types/ui.d.ts",
      getContents: () => {
        const [colors, icons] = extractUI(
          options.theme?.colors,
          options?.ui?.icons
        );

        return `import type { UI } from '@veehance/ui/types'
import type * as theme from '#build/theme/index'

declare module '@nuxt/schema' {
  interface AppConfigInput {
    ui?: UI<
      typeof theme,
      ${colors},
      ${icons}
    >
  }
}

export {}\n`;
      },
    });
  }

  return templates;
}
