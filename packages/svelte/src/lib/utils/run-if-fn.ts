import { isFunction } from "@veehance/core/utils";

export const runIfFn = <MaybeReturnValue, FunctionArgs>(
  valueOrFn:
    | MaybeReturnValue
    | ((...fnArgs: FunctionArgs[]) => MaybeReturnValue),
  ...args: FunctionArgs[]
) =>
  isFunction(valueOrFn)
    ? valueOrFn(...args)
    : (valueOrFn as unknown as MaybeReturnValue);
