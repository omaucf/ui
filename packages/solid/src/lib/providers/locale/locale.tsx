import { createMemo } from "solid-js";

import type { LocaleProviderProps } from "./locale.types";
import { LocaleContextProvider } from "./use-locale-context";

function LocaleProvider(props: LocaleProviderProps) {
  const context = createMemo(() => props.value!);
  return (
    <LocaleContextProvider value={context}>
      {props.children}
    </LocaleContextProvider>
  );
}

export default LocaleProvider;
