import appConfig from "#build/app.config";
import icons from "#build/ui/icons";

import { iconToSVG, replaceIDs } from "@iconify/utils";
import { camel } from "radashi";

export const toIconify = (value: string) => {
  const input = value.trim();

  if (appConfig.uno || input.includes(":")) {
    const [left, name] = input.split(":", 2);
    const parts = left.split("-");
    if (parts.length > 1) parts.shift();
    const collection = parts.join("-");
    return collection && name ? { collection, name } : null;
  }

  // biome-ignore lint/performance/useTopLevelRegex: safe_to_set
  const [, raw] = input.split(/\s+/, 2);
  if (!raw) return null;

  const [collection, name] = raw.split("--", 2);
  return collection && name ? { collection, name } : null;
};

export const toSVG = (icon: string) => {
  const parsed = toIconify(icon);
  if (!parsed) return null;

  const { collection, name } = parsed;
  const collectionKey = camel(collection);

  const iconSet = icons[collectionKey];
  if (!iconSet) return null;

  const iconData = iconSet.icons?.[name];
  if (!iconData) return null;

  const { attributes, body } = iconToSVG({ ...iconSet, ...iconData });
  return { attributes, body: replaceIDs(body) };
};
