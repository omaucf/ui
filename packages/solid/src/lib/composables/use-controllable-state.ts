/** biome-ignore-all lint/complexity/noBannedTypes: safe_to_set */
import { type Accessor, createMemo, createSignal, untrack } from "solid-js";

import { runIfFn } from "@/utils/fn.js";

export interface UseControllableStateProps<T> {
  defaultValue?: Accessor<T | undefined> | T;
  onChange?: (value: T) => void;
  value?: Accessor<T | undefined>;
}

export function useControllableState<T>(props: UseControllableStateProps<T>) {
  const [uncontrolledValue, setUncontrolledValue] = createSignal(
    runIfFn(props.defaultValue)
  );
  const controlled = createMemo(() => props.value?.() !== undefined);

  const currentValue = createMemo(() =>
    controlled() ? props.value?.() : uncontrolledValue()
  );

  const setValue = (next: Exclude<T, Function> | ((prev: T) => T)) => {
    untrack(() => {
      const nextValue = runIfFn(next, currentValue() as T);
      if (controlled()) return props.onChange?.(nextValue);

      setUncontrolledValue(nextValue as Exclude<T, Function>);
      return props.onChange?.(nextValue);
    });
  };

  return [currentValue as Accessor<T>, setValue] as const;
}
