import appConfig from "#build/app.config";
import type { Icon } from "#build/ui/types";
import { toIconify, toSVG } from "#build/ui/utils";

import { isString } from "radashi";

export const useIcon = (name: Icon, raw?: boolean) => {
  const icon = (() => {
    if (toIconify(name)) return name;
    return appConfig.ui.icons[name as Icon] || appConfig.ui.icons.warning;
  })() as string;

  const isDynamic =
    raw || appConfig.ui.icons?.mode === "svg"
      ? false
      : toIconify(icon) !== null;
  const svg = isDynamic || !isString(icon) ? null : toSVG(icon);

  return { icon, isDynamic, svg };
};
