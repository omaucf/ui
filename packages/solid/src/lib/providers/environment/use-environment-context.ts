import type { Accessor } from "#build/ui/types";

import { createContext } from "@/utils/context.js";

import type { EnvironmentContext } from "./environment.types.js";

export const DEFAULT_ENVIRONMENT = () => ({
  getDocument: () => document,
  getRootNode: () => document,
  getWindow: () => window,
});

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<Accessor<EnvironmentContext>>({
    defaultValue: DEFAULT_ENVIRONMENT,
    hookName: "useEnvironmentContext",
    providerName: "<EnvironmentProvider />",
    strict: false,
  });
