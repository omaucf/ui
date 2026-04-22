import { computed, type MaybeRefOrGetter, toValue } from "vue";

import appConfig from "#build/app.config";
import type { Icon } from "#build/ui/types";
import { toIconify, toSVG } from "#build/ui/utils";

import { isString } from "radashi";

export const useIcon = (
  name: MaybeRefOrGetter<Icon>,
  raw?: MaybeRefOrGetter<boolean | undefined>
) => {
  const iconName = computed(() => toValue(name));

  const icon = computed<string>(() => {
    if (toIconify(iconName.value)) return iconName.value;
    return (
      appConfig.ui.icons[iconName.value as Icon] || appConfig.ui.icons.warning
    );
  });

  const isDynamic = computed(() => {
    if (toValue(raw) || appConfig.ui.icons?.mode === "svg") return false;
    return toIconify(icon.value) !== null;
  });

  const svg = computed(() => {
    if (isDynamic.value || !isString(icon.value)) return null;
    return toSVG(icon.value);
  });

  return { icon, isDynamic, svg };
};
