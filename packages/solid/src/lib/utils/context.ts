import {
  type Context,
  createContext as createSolidContext,
  useContext as useSolidContext,
} from "solid-js";

import { hasProp, isFunction } from "@zag-js/utils";

export interface CreateContextOptions<T> {
  defaultValue?: T;
  errorMessage?: string;
  hookName?: string;
  providerName?: string;
  strict?: boolean;
}

export type CreateContextReturn<T> = [
  Context<T>["Provider"],
  () => T,
  Context<T>,
];

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options;

  const Ctx = createSolidContext<T | undefined>(defaultValue);

  function useContext() {
    const context = useSolidContext(Ctx);

    if (!context && strict) {
      const error = new Error(
        errorMessage ?? getErrorMessage(hookName, providerName)
      );
      error.name = "ContextError";
      if (
        hasProp(Error, "captureStackTrace") &&
        isFunction(Error.captureStackTrace)
      ) {
        Error.captureStackTrace(error, useContext);
      }
      throw error;
    }

    return context;
  }

  return [Ctx.Provider, useContext, Ctx] as CreateContextReturn<T>;
}

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}
