import { pathToFileURL } from "node:url";

import { dash, isNullish, isObject, sift } from "radashi";

import { THEME_MAP } from "@/constants/theme.js";
import { dedupeComponents, resolveComponents } from "@/functions/component.js";
import { deriveIcons } from "@/functions/icon.js";
import { resolveNamespaces, resolveOverrides } from "@/functions/theme.js";
import { deriveWorkspaces } from "@/functions/workspace.js";
import { mergeThemes } from "@/helpers/merge.js";
import { generateComponentsFile } from "@/templates/component.js";
import { generateAppFile, generateUnoFile } from "@/templates/config.js";
import { generateCSSFile } from "@/templates/css.js";
import { generateIconFile, generateIconsFile } from "@/templates/icon.js";
import { generateImportsFile, generateUtilsFile } from "@/templates/import.js";
import { generateThemeCSSFile, generateThemeFile } from "@/templates/theme.js";
import { generateTypesFile, generateTypesNuxt } from "@/templates/types.js";
import type { Resolver, Template } from "@/types/registry.js";
import type { Config } from "@/types/schema.js";

import { detectComponents, detectThemeEntries } from "./detection.js";

export function getTemplates(
  config: Config,
  meta = false,
  cwd = process.cwd()
) {
  const resolver = deriveWorkspaces(pathToFileURL(cwd).href, config);

  const entries = dedupeComponents([
    ...resolveComponents(config),
    ...(config.registry?.components ?? []),
  ]);

  const detected = detectComponents(
    omitRaw(entries).map((entry) => entry.name),
    config
  );

  return [
    ...createFiles(config, cwd),
    ...createThemes(config, detected),
    ...createUI(config, meta, detected, resolver),
  ];
}

function createFiles(config: Config, cwd: string) {
  return [
    template(
      "types/ui.d.ts",
      () => generateTypesNuxt(config),
      config.router === "nuxt"
    ),
    template(
      "app.config.ts",
      () => generateAppFile(config, cwd),
      config.router !== "nuxt"
    ),
    template(
      "uno.config.ts",
      () => generateUnoFile(config),
      config.style?.engine === "unocss"
    ),
  ];
}

function createThemes(config: Config, detected: Promise<string[]>) {
  const entries = resolveEntries(detected, config);
  return [
    ...resolveNamespaces(config).flatMap((namespace) =>
      themeFiles(namespace.source, config, {
        baseDir: `theme/${namespace.name}`,
        overrides: config.ui?.components?.[namespace.name],
      })
    ),
    ...themeFiles(THEME_MAP.ui, config, {
      baseDir: "theme",
      overrides: resolveOverrides(config),
    }),
    template(
      "theme/index.css",
      async () => createCSSIndex(entries),
      config.style?.engine !== "unocss"
    ),
    template("theme/index.ts", async () => createTSIndex(entries)),
  ];
}

function createUI(
  config: Config,
  meta: boolean,
  detected: Promise<string[]>,
  resolve?: Resolver
) {
  return [
    ...deriveIcons(config).map((icon) =>
      template(`ui/icons/${icon.name}.json`, () =>
        generateIconFile(icon.raw, icon.name)
      )
    ),
    template(
      "ui/components.ts",
      async () => generateComponentsFile(config, detected, resolve),
      meta
    ),
    template("ui/icons.ts", () => generateIconsFile(config)),
    template(
      "ui/imports.ts",
      async () => generateImportsFile(config, resolve),
      meta
    ),
    template("ui/types.ts", async () => generateTypesFile(config, resolve)),
    template(
      "ui/utils.ts",
      async () => generateUtilsFile(config, resolve),
      meta
    ),
    template("ui.css", () => generateCSSFile(config)),
  ];
}

async function createCSSIndex(entries: ReturnType<typeof resolveEntries>) {
  const { namespaces, themeEntries } = await entries;
  const namespaceImports = namespaces.flatMap((namespace) =>
    namespace.entries.map(
      (entry) => `@import "./${namespace.name}/${dash(entry)}.css";`
    )
  );

  const themeImports = themeEntries.map(
    (entry) => `@import "./${dash(entry)}.css";`
  );
  return [...namespaceImports, ...themeImports].join("\n");
}

async function createTSIndex(entries: ReturnType<typeof resolveEntries>) {
  const { namespaces, themeEntries } = await entries;

  const namespaceImports: string[] = [];
  const namespaceExports: string[] = [];

  for (const ns of namespaces) {
    const properties: string[] = [];

    for (const entry of ns.entries) {
      const alias = `${ns.name}${entry[0].toUpperCase()}${entry.slice(1)}`;
      namespaceImports.push(
        `import ${alias} from "./${ns.name}/${dash(entry)}.js";`
      );
      properties.push(`${entry}: ${alias}`);
    }

    namespaceExports.push(
      `export const ${ns.name} = { ${properties.join(", ")} };`
    );
  }

  const themeExports = themeEntries.map(
    (entry) => `export { default as ${entry} } from "./${dash(entry)}.js";`
  );

  return sift([
    ...namespaceImports,
    "",
    ...namespaceExports,
    "",
    ...themeExports,
  ])
    .join("\n")
    .trim();
}

function omitRaw<T>(entries: readonly T[]) {
  return entries.filter(
    (entry): entry is Exclude<T, { raw: string }> =>
      !(isObject(entry) && !isNullish(entry) && "raw" in entry)
  );
}

async function resolveEntries(detected: Promise<string[]>, config: Config) {
  const namespaces = resolveNamespaces(config);
  const namespaceEntries = await Promise.all(
    namespaces.map(async (namespace) => ({
      ...namespace,
      entries: await detectThemeEntries(namespace.source, detected, {
        namespace: namespace.name,
        prefix: config.dts?.prefix,
        prefixNamespaces: config.dts?.prefixNamespaces,
      }),
    }))
  );

  return {
    namespaces: namespaceEntries.filter(
      (namespace) => namespace.entries.length > 0
    ),
    themeEntries: await detectThemeEntries(THEME_MAP.ui, detected),
  };
}

function template(
  filename: string,
  getContents: Template["getContents"],
  write = true
) {
  return { filename, getContents, write };
}

function themeFiles(
  source: Record<string, unknown>,
  config: Config,
  options: {
    baseDir: string;
    overrides?: Record<string, unknown>;
    write?: boolean;
  }
) {
  const themes = mergeThemes(source, options.overrides ?? {});
  return Object.keys(themes).flatMap((component) => [
    template(
      `${options.baseDir}/${dash(component)}.css`,
      () => generateThemeCSSFile(themes, component, config),
      config.style?.engine === "unocss" ? false : options.write
    ),
    template(
      `${options.baseDir}/${dash(component)}.ts`,
      () => generateThemeFile(themes, component, config),
      options.write
    ),
  ]);
}
