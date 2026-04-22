import type { DeepReadonly, ShallowRef } from "vue";

import { useEnvironment } from "#build/ui/imports";

import {
  getInteractionModality,
  trackInteractionModality,
} from "@zag-js/focus-visible";
import { useSyncExternalStore } from "@zag-js/vue";

export type Modality = import("@zag-js/focus-visible").Modality;

export function useInteractionModality(): DeepReadonly<
  ShallowRef<Modality | null>
> {
  const { getRootNode } = useEnvironment();

  return useSyncExternalStore(
    (listener) =>
      trackInteractionModality({
        onChange: listener,
        root: getRootNode(),
      }),
    getInteractionModality,
    () => null
  );
}
