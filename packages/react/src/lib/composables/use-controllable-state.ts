"use client";

import { useCallback, useState } from "react";

export interface UseControllableStateProps<T> {
  defaultValue?: T | undefined;
  onChange?: ((value: T) => void) | undefined;
  value?: T | undefined;
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const { value, onChange, defaultValue } = props;

  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);

  const controlled = value !== undefined;
  const currentValue = controlled ? value : uncontrolledValue;

  const setValue = useCallback(
    (v: T) => {
      if (controlled) return onChange?.(v);
      setUncontrolledValue(v);
      return onChange?.(v);
    },
    [controlled, onChange]
  );

  return [currentValue as T, setValue] as const;
}
