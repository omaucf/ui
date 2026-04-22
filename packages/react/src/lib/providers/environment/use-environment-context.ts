"use client";

import { createContext } from "@/utils/context.js";

import type { EnvironmentContext } from "./environment.types.js";

export const DEFAULT_ENVIRONMENT = {
  getDocument: () => document,
  getRootNode: () => document,
  getWindow: () => window,
};

export const [EnvironmentContextProvider, useEnvironmentContext] =
  createContext<EnvironmentContext>({
    defaultValue: DEFAULT_ENVIRONMENT,
    hookName: "useEnvironmentContext",
    name: "EnvironmentContext",
    providerName: "<EnvironmentProvider />",
    strict: false,
  });
