import type { Accessor, RootNode } from "@veehance/core/types";

import { createContext } from "../../utils/create-context.js";

export interface UseEnvironmentContext
  extends Accessor<{
    getRootNode(): RootNode;
    getDocument(): Document;
    getWindow(): Window & typeof globalThis;
  }> {}

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<UseEnvironmentContext>({
    name: "EnvironmentContext",
    strict: false,
    defaultValue: () => ({
      getRootNode: () => document,
      getDocument: () => document,
      getWindow: () => window as Window & typeof globalThis,
    }),
  });
