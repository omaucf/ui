import { getPlatform, isAndroid, isApple } from "@zag-js/dom-query";

export type Platform = "mac" | "windows" | "linux";

// biome-ignore lint/performance/useTopLevelRegex: safe_to_set
const isLinux = () => /^Linux|^CrOS/i.test(getPlatform()) && !isAndroid();

const detect = (): Platform => {
  if (isApple()) return "mac";
  if (isLinux()) return "linux";
  return "windows";
};

export function usePlatform(): () => Platform {
  let platform = $state<Platform>("windows");

  $effect(() => {
    platform = detect();
  });

  return () => platform;
}
