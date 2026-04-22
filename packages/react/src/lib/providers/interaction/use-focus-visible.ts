"use client";

import { useCallback, useSyncExternalStore } from "react";

import { useEnvironment } from "#build/ui/imports";

import { isFocusVisible, trackFocusVisible } from "@zag-js/focus-visible";

export interface UseFocusVisibleProps {
  autoFocus?: boolean;
  isTextInput?: boolean;
}

export function useFocusVisible(props: UseFocusVisibleProps = {}) {
  const { isTextInput, autoFocus } = props;
  const { getRootNode } = useEnvironment();

  const subscribe = useCallback(
    (onStoreChange: () => void) =>
      trackFocusVisible({
        autoFocus,
        isTextInput,
        onChange: onStoreChange,
        root: getRootNode(),
      }),
    [getRootNode, isTextInput, autoFocus]
  );

  const getSnapshot = useCallback(
    () => autoFocus || isFocusVisible(),
    [autoFocus]
  );
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}
