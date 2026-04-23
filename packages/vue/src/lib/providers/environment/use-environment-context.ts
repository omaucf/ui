import { type ComputedRef, computed } from "vue";

import type { RootNode } from "@veehance/core/types";

import { createContext } from "../../utils/create-context.js";

export interface UseEnvironmentContext {
  getDocument(): Document;
  getRootNode(): RootNode;
  getWindow(): Window & typeof globalThis;
}

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<ComputedRef<UseEnvironmentContext>>("EnvironmentContext");

export const DEFAULT_ENVIRONMENT: ComputedRef<UseEnvironmentContext> = computed(
  () => ({
    getRootNode: () => document,
    getDocument: () => document,
    getWindow: () => window,
  })
);
