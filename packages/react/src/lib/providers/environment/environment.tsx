"use client";

import { useMemo, useState } from "react";

import { getDocument, getWindow } from "@zag-js/dom-query";

import { runIfFn } from "@/utils/fn";

import type { EnvironmentProviderProps } from "./environment.types";
import { EnvironmentContextProvider } from "./use-environment-context";

function EnvironmentProvider(props: EnvironmentProviderProps) {
  const { value, children } = props;
  const [spanRef, setSpanRef] = useState<HTMLSpanElement | null>();

  const getRootNode = useMemo(
    () => () => runIfFn(value) ?? spanRef?.getRootNode() ?? document,
    [value, spanRef]
  );

  const environment = useMemo(
    () => ({
      getDocument: () => getDocument(getRootNode()),
      getRootNode,
      getWindow: () => getWindow(getRootNode()),
    }),
    [getRootNode]
  );

  return (
    <EnvironmentContextProvider value={environment}>
      {children}
      {!value && <span hidden ref={setSpanRef} />}
    </EnvironmentContextProvider>
  );
}

export default EnvironmentProvider;
