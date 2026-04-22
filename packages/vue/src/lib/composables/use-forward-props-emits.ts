import { computed } from "vue";

import { useEmitAsProps } from "./use-emit-as-props.js";
import { useForwardProps } from "./use-forward-props.js";

export function useForwardPropsEmits<
  T extends Parameters<typeof useForwardProps>[0],
  Name extends string,
>(props: T, emit?: (name: Name, ...args: any[]) => void) {
  const parsedProps = useForwardProps(props);
  const emitsAsProps = emit ? useEmitAsProps(emit) : {};

  return computed(() => ({
    // @ts-expect-error
    ...parsedProps.value,
    ...emitsAsProps,
  }));
}
