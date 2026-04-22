import { onMounted, type Ref, ref } from "vue";

import { getPlatform, isAndroid, isApple } from "@zag-js/dom-query";

export type Platform = import("@zag-js/hotkeys").Platform;

// biome-ignore lint/performance/useTopLevelRegex: safe_to_Set
const isLinux = () => /^Linux|^CrOS/i.test(getPlatform()) && !isAndroid();

const detect = (): Platform => {
  if (isApple()) return "mac";
  if (isLinux()) return "linux";
  return "windows";
};

export const usePlatform = (): Ref<Platform> => {
  const platform = ref<Platform>("windows");

  onMounted(() => {
    platform.value = detect();
  });

  return platform;
};
