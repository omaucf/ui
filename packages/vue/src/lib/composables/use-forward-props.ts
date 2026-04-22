import {
  camelize,
  computed,
  getCurrentInstance,
  type MaybeRefOrGetter,
  toRef,
  type UnwrapRef,
} from "vue";

interface PropOptions {
  default?: any;
  required?: boolean;
  type?: any;
}

export function useForwardProps<
  T extends MaybeRefOrGetter<Record<string, any>>,
  U extends UnwrapRef<T>,
>(props: T) {
  const vm = getCurrentInstance();
  // Default value for declared props
  const defaultProps = Object.keys(vm?.type.props ?? {}).reduce(
    (prev, curr) => {
      // biome-ignore lint/correctness/noUnsafeOptionalChaining: safe_to_set
      const defaultValue = (vm?.type.props[curr] as PropOptions).default;
      if (defaultValue !== undefined) prev[curr as keyof U] = defaultValue;
      return prev;
    },
    {} as U
  );

  const refProps = toRef(props);
  return computed(() => {
    const preservedProps = {} as U;
    const assignedProps = vm?.vnode.props ?? {};

    // biome-ignore lint/complexity/noForEach: safe_to_set
    Object.keys(assignedProps).forEach((key) => {
      preservedProps[camelize(key) as keyof U] = assignedProps[key];
    });

    // @ts-expect-error
    return Object.keys({ ...defaultProps, ...preservedProps }).reduce(
      (prev, curr) => {
        if (refProps.value[curr] !== undefined)
          prev[curr as keyof U] = refProps.value[curr];
        return prev;
      },
      {} as U
    );
  });
}
