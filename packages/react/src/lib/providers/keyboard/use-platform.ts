"use client";

import { useCallback, useSyncExternalStore } from "react";

import { getPlatform, isAndroid, isApple } from "@zag-js/dom-query";

export type Platform = "mac" | "windows" | "linux";

// biome-ignore lint/performance/useTopLevelRegex: safe_to_set
const isLinux = () => /^Linux|^CrOS/i.test(getPlatform()) && !isAndroid();

const subscribe = () => () => {};

const detect = (): Platform => {
  if (isApple()) return "mac";
  if (isLinux()) return "linux";
  return "windows";
};

export const usePlatform = (): Platform => {
  const getSnapshot = useCallback(detect, []);
  const getServerSnapshot = useCallback((): Platform => "windows", []);

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
};
