"use client";

import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

import { hasProp, isFunction } from "@veehance/core/utils";

interface CreateContextOptions<T> {
  defaultValue?: T | undefined;
  errorMessage?: string | undefined;
  hookName?: string | undefined;
  name?: string | undefined;
  providerName?: string | undefined;
  strict?: boolean | undefined;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

export function createContext<T>(options: CreateContextOptions<T> = {}) {
  const {
    name,
    strict = true,
    hookName = "useContext",
    providerName = "Provider",
    errorMessage,
    defaultValue,
  } = options;

  const Context = createReactContext<T | undefined>(defaultValue);
  Context.displayName = name;

  function useContext() {
    const context = useReactContext(Context);

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

  return [Context.Provider, useContext, Context] as CreateContextReturn<T>;
}

function getErrorMessage(hook: string, provider: string) {
  return `${hook} returned \`undefined\`. Seems you forgot to wrap component within ${provider}`;
}
