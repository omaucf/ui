import { type ComputedRef, computed } from "vue";

import { useLocale } from "#build/ui/imports";

import {
  createFilter,
  type FilterOptions,
  type FilterReturn,
} from "@zag-js/i18n-utils";

export interface UseFilterProps extends FilterOptions {}

export interface UseFilterReturn extends ComputedRef<FilterReturn> {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const { code } = useLocale();
  const locale = computed(() => props.locale ?? code.value);
  return computed(() => createFilter({ ...props, locale: locale.value }));
}
