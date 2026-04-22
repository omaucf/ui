import type { Accessor } from "solid-js";

import { useEnvironment } from "#build/ui/imports";

import {
  getInteractionModality,
  trackInteractionModality,
} from "@zag-js/focus-visible";
import { useSyncExternalStore } from "@zag-js/solid";

export type Modality = import("@zag-js/focus-visible").Modality;

export function useInteractionModality(): Accessor<Modality | null> {
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
