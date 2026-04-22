import { omit } from "radashi";
import {
  presetIcons,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  type UserConfig,
} from "unocss";

import { resolveConfig } from "@/functions/config.js";
import {
  definePreflights,
  defineRules,
  defineSafelist,
  defineShortcuts,
  defineTheme,
} from "@/functions/theme.js";
import { mergeConfigs } from "@/helpers/merge.js";
import type { Options } from "@/types/ui.js";

import { getConfig } from "./config.js";

export function createConfig(
  userConfigs: UserConfig[],
  options: Options = {},
  cwd = process.cwd()
) {
  const { icons, fonts, style, theme, ui } = resolveConfig(
    { style: { engine: "unocss" } },
    getConfig(cwd),
    options
  );

  return mergeConfigs<UserConfig>(
    [
      fonts !== false && {
        presets: [
          presetWebFonts({
            fonts: fonts?.family,
            ...omit(fonts || {}, ["family"]),
          }),
        ],
      },
      icons !== false && {
        presets: [
          presetIcons({
            iconifyCollectionsNames: icons?.collectionsNames,
            ...omit(icons || {}, ["collectionsNames"]),
          }),
        ],
      },
      ...userConfigs,
    ],
    {
      layers: { components: 0 },
      outputToCssLayers: { allLayers: true },
      preflights: definePreflights({ style, theme, ui }),
      presets: [
        presetWind4({ prefix: style?.prefix, preflights: { reset: true } }),
      ],
      rules: defineRules(),
      safelist: defineSafelist({ style, ui }),
      shortcuts: defineShortcuts(),
      theme: defineTheme(theme?.colors),
      transformers: [transformerDirectives({ applyVariable: ["--at-apply"] })],
      variants: [
        (matcher) => {
          if (!matcher.startsWith("light:")) return matcher;
          return { matcher: matcher.slice(6), selector: (s) => `.light ${s}` };
        },
      ],
    }
  );
}

export { mergeConfigs } from "./lib/helpers/merge.js";
