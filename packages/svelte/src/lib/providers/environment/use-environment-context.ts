import type { Accessor } from "#build/ui/types";

import { createContext } from "$lib/utils/context.js";

import type { EnvironmentContext } from "./environment.types.js";

export const DEFAULT_ENVIRONMENT = () => ({
  getDocument: () => document,
  getRootNode: () => document,
  getWindow: () => window as Window & typeof globalThis,
});

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<Accessor<EnvironmentContext>>({
    defaultValue: DEFAULT_ENVIRONMENT,
    hookName: "useEnvironmentContext",
    name: "EnvironmentContext",
    providerName: "EnvironmentProvider",
    strict: false,
  });
