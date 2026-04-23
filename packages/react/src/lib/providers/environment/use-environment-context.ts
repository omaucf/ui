"use client";

import type { RootNode } from "@veehance/core/types";

import { createContext } from "../../utils/create-context";

export interface UseEnvironmentContext {
  getDocument(): Document;
  getRootNode(): RootNode;
  getWindow(): Window & typeof globalThis;
}

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<UseEnvironmentContext>({
    name: "EnvironmentContext",
    hookName: "useEnvironmentContext",
    providerName: "<EnvironmentProvider />",
    strict: false,
    defaultValue: {
      getRootNode: () => document,
      getDocument: () => document,
      getWindow: () => window,
    },
  });
