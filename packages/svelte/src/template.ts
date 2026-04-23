import { generateIcons, generateImports } from "@veehance/core/functions";
import { getTemplates as getRawTemplates } from "@veehance/core/template";
import type { Options, Template } from "@veehance/core/types";

export function getTemplates(options: Options) {
  const templates: Template[] = getRawTemplates(options);

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

  return templates;
}
