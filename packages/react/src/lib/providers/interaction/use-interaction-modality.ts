"use client";

import { useCallback, useSyncExternalStore } from "react";

import { useEnvironment } from "#build/ui/imports";

import {
  getInteractionModality,
  trackInteractionModality,
} from "@zag-js/focus-visible";

export type Modality = import("@zag-js/focus-visible").Modality;

export function useInteractionModality(): Modality | null {
  const { getRootNode } = useEnvironment();
  return useSyncExternalStore(
    useCallback(
      (onChange) => trackInteractionModality({ onChange, root: getRootNode() }),
      [getRootNode]
    ),
    getInteractionModality,
    () => null
  );
}
