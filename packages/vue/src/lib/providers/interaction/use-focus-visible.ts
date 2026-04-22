import type { ShallowRef } from "vue";

import { useEnvironment } from "#build/ui/imports";

import { isFocusVisible, trackFocusVisible } from "@zag-js/focus-visible";
import { useSyncExternalStore } from "@zag-js/vue";

export interface UseFocusVisibleProps {
  autoFocus?: boolean;
  isTextInput?: boolean;
}

export function useFocusVisible(
  props: UseFocusVisibleProps = {}
): Readonly<ShallowRef<boolean>> {
  const { isTextInput, autoFocus } = props;
  const { getRootNode } = useEnvironment();

  return useSyncExternalStore(
    (listener) =>
      trackFocusVisible({
        autoFocus,
        isTextInput,
        onChange: listener,
        root: getRootNode(),
      }),
    () => autoFocus || isFocusVisible(),
    () => false
  );
}
