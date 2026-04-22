"use client";

import { useCallback, useRef } from "react";

type AnyFunction = (...args: any[]) => any;

interface Options {
  sync?: boolean | undefined;
}

export function useEvent<T extends AnyFunction>(
  callback: T | undefined,
  opts: Options = {}
): T {
  const { sync = false } = opts;
  const callbackRef = useLatestRef(callback);

  return useCallback(
    (...args: any[]) => {
      if (sync) return queueMicrotask(() => callbackRef.current?.(...args));
      return callbackRef.current?.(...args);
    },
    [sync, callbackRef]
  ) as T;
}

function useLatestRef<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}
