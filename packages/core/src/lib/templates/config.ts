import { join } from "pathe";
import { isObject, pick } from "radashi";

import { CONFIG_DEFAULTS, FEATURE_DEFAULTS } from "@/defaults.js";
import { extractClasses, extractThemeIcons } from "@/functions/theme.js";
import { parseAppConfig, parsePkg as pkg } from "@/helpers/parse.js";
import type { Config } from "@/types/schema.js";

export function generateAppFile(
  { colorMode, icons, image, locale, prose, ui, ...config }: Config,
  root = process.cwd()
) {
  const isUno = config.style?.engine === "unocss";

  const appConfigPath = parseAppConfig(config.router, config.dts?.app);
  const appConfig = {
    colorMode: isObject(colorMode) ? colorMode : undefined,
    icons: isObject(icons)
      ? pick(icons, ["mode", "prefix"])
      : { mode: "svg", prefix: isUno ? "i-" : FEATURE_DEFAULTS.icons.prefix },
    image:
      isObject(image) && image.provider !== "none"
        ? pick(image, ["provider"])
        : undefined,
    locale: isObject(locale) ? locale : { dir: "ltr", lang: "en-US" },
    prose: isObject(prose) ? prose : undefined,
    ui,
  };

  if (appConfigPath === false)
    return `export default ${JSON.stringify(appConfig, null, 2)}\n`;
  return `import { defuFn } from 'defu'\nimport cfg0 from '${join(root, appConfigPath)}'\n\nexport default /*@__PURE__*/ defuFn(cfg0, ${JSON.stringify(appConfig, null, 2)})\n`;
}

export function generateUnoFile({ icons, fonts, ...config }: Config) {
  const style = pick(config.style || {}, ["baseColor", "prefix", "safelist"]);
  const theme = pick(config.theme || {}, ["colors", "preset", "transitions"]);

  const presets = [
    {
      content: { filesystem: config.style?.sources ?? [] },
      safelist: extractThemeIcons(config).flatMap(({ value }) =>
        extractClasses(value)
      ),
    },
  ];

  const options = {
    fonts: isObject(fonts) ? diff(fonts, { ...FEATURE_DEFAULTS.fonts }) : false,
    icons: isObject(icons)
      ? diff(icons, { ...FEATURE_DEFAULTS.icons, prefix: "i-" })
      : false,
    style: diff(style, { ...CONFIG_DEFAULTS.style, engine: "unocss" }),
    theme: diff(theme, { ...CONFIG_DEFAULTS.theme }),
  };

  return [
    `import { createConfig } from '${pkg("core", "unocss")}'`,
    "",
    "export default createConfig(",
    `${indent(presets)},`,
    `${indent(options)}`,
    ")",
  ].join("\n");
}

function diff(value: any, defaults: any) {
  if (value === false) return false;
  if (value === true) return {};

  const out: Record<string, any> = {};
  for (const key in value) {
    if (value[key] !== defaults[key]) {
      out[key] = value[key];
    }
  }

  return out;
}

function indent(value: unknown, spaces = 2) {
  return JSON.stringify(value, null, 2)
    .split("\n")
    .map((line) => `${" ".repeat(spaces)}${line}`)
    .join("\n");
}
