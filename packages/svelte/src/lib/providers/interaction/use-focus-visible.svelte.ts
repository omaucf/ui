import { useEnvironment } from "#build/ui/imports";
import type { Accessor } from "#build/ui/types";

import { isFocusVisible, trackFocusVisible } from "@zag-js/focus-visible";

export interface UseFocusVisibleProps {
  autoFocus?: boolean;
  isTextInput?: boolean;
}

export function useFocusVisible(
  props: UseFocusVisibleProps = {}
): Accessor<boolean> {
  const { isTextInput, autoFocus } = props;
  const { getRootNode } = useEnvironment();

  let focusVisible = $state(autoFocus || isFocusVisible());

  $effect(() =>
    trackFocusVisible({
      autoFocus,
      isTextInput,
      onChange(details) {
        focusVisible = details.isFocusVisible;
      },
      root: getRootNode(),
    })
  );

  return () => focusVisible;
}
