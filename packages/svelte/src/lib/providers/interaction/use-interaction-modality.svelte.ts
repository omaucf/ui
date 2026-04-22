import { useEnvironment } from "#build/ui/imports";
import type { Accessor } from "#build/ui/types";

import {
  getInteractionModality,
  trackInteractionModality,
} from "@zag-js/focus-visible";

export type Modality = import("@zag-js/focus-visible").Modality;

export function useInteractionModality(): Accessor<Modality | null> {
  const { getRootNode } = useEnvironment();

  let modality = $state<Modality | null>(getInteractionModality());

  $effect(() =>
    trackInteractionModality({
      onChange(details) {
        modality = details.modality;
      },
      root: getRootNode(),
    })
  );

  return () => modality;
}
