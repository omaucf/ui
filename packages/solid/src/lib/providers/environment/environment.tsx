import { createMemo, createSignal, Show } from "solid-js";

import { getDocument, getWindow } from "@zag-js/dom-query";

import { runIfFn } from "@/utils/fn";

import type { EnvironmentProviderProps } from "./environment.types";
import { EnvironmentContextProvider } from "./use-environment-context";

function EnvironmentProvider(props: EnvironmentProviderProps) {
  const [spanRef, setSpanRef] = createSignal<HTMLSpanElement>();
  const getRootNode = () =>
    runIfFn(props.value) ?? spanRef()?.getRootNode() ?? document;

  const environment = createMemo(() => ({
    getDocument: () => getDocument(getRootNode()),
    getRootNode,
    getWindow: () => getWindow(getRootNode()),
  }));

  return (
    <EnvironmentContextProvider value={environment}>
      {props.children}
      <Show when={!props.value}>
        <span hidden ref={setSpanRef} />
      </Show>
    </EnvironmentContextProvider>
  );
}

export default EnvironmentProvider;
