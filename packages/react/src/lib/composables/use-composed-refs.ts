import { type Ref, type RefCallback, useCallback } from "react";

import { composeRefs } from "@/utils/compose.js";

type PossibleRef<T> = Ref<T | null> | undefined;

export function useComposedRefs<T>(...refs: PossibleRef<T>[]): RefCallback<T> {
  // biome-ignore lint/correctness/useExhaustiveDependencies: refs is the dependency list for the composed callback
  return useCallback(composeRefs(...refs), refs);
}
