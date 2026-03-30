import { replaceIDs, iconToSVG as toSVG } from "@iconify/utils";
import { camelCase } from "scule";

import appConfig from "#build/app.config";
import icons from "#build/ui/icons";

export const iconToSVG = /* @__PURE__ */ (icon: string) => {
  const [collectionRaw, name] = icon.split(":");
  if (!(collectionRaw && name)) return null;

  const collectionKey = camelCase(collectionRaw);
  const iconSet = icons[collectionKey];
  if (!iconSet) return null;

  const iconData = iconSet.icons?.[name];
  if (!iconData) return null;

  const defaultSize = appConfig.ui?.components?.icon?.size ?? 24;
  const { attributes, body } = toSVG(
    { ...iconSet, ...iconData },
    { height: defaultSize, width: defaultSize }
  );

  return { attributes, body: replaceIDs(body) };
};
