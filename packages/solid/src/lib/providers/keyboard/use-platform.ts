import { createSignal, onMount } from "solid-js";

import type { Accessor } from "#build/ui/types";

import { getPlatform, isAndroid, isApple } from "@zag-js/dom-query";

export type Platform = "mac" | "windows" | "linux";

// biome-ignore lint/performance/useTopLevelRegex: safe_to_set
const isLinux = () => /^Linux|^CrOS/i.test(getPlatform()) && !isAndroid();

const detect = (): Platform => {
  if (isApple()) return "mac";
  if (isLinux()) return "linux";
  return "windows";
};

export const usePlatform = (): Accessor<Platform> => {
  const [platform, setPlatform] = createSignal<Platform>("windows");

  onMount(() => {
    setPlatform(detect());
  });

  return platform;
};
