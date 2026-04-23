"use client";

import { type ReactNode, useMemo, useState } from "react";

import type { RootNode } from "@veehance/core/types";
import { getDocument, getWindow } from "@veehance/core/utils";

import { runIfFn } from "../../utils/run-if-fn.js";
import { EnvironmentContextProvider } from "./use-environment-context.js";

export interface EnvironmentProviderProps {
  children?: ReactNode | undefined;
  value?: RootNode | (() => RootNode) | undefined;
}

function EnvironmentProvider(props: EnvironmentProviderProps) {
  const { value, children } = props;
  const [spanRef, setSpanRef] = useState<HTMLSpanElement | null>();

  const getRootNode = useMemo(
    () => () => runIfFn(value) ?? spanRef?.getRootNode() ?? document,
    [value, spanRef]
  );

  const environment = useMemo(
    () => ({
      getRootNode,
      getWindow: () => getWindow(getRootNode()),
      getDocument: () => getDocument(getRootNode()),
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
