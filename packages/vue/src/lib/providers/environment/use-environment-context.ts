import { type ComputedRef, computed } from "vue";

import { createContext } from "@/utils/context.js";

import type { EnvironmentContext } from "./environment.types.js";

export const DEFAULT_ENVIRONMENT = computed(() => ({
  getDocument: () => document,
  getRootNode: () => document,
  getWindow: () => window,
}));

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<ComputedRef<EnvironmentContext>>({
    defaultValue: DEFAULT_ENVIRONMENT,
    name: "EnvironmentContext",
    strict: false,
  });
