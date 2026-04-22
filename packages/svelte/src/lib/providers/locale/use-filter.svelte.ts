import { useLocale } from "#build/ui/imports";
import type { Accessor } from "#build/ui/types";

import {
  createFilter,
  type FilterOptions,
  type FilterReturn,
} from "@zag-js/i18n-utils";
import { type MaybeFunction, runIfFn } from "@zag-js/utils";

export interface UseFilterProps extends FilterOptions {}

export interface UseFilterReturn extends Accessor<FilterReturn> {}

export function useFilter(
  inProps: MaybeFunction<UseFilterProps>
): UseFilterReturn {
  const props = $derived(runIfFn(inProps));
  const { code } = useLocale();

  const locale = $derived(props.locale ?? code());
  const filter = $derived(createFilter({ ...props, locale }));

  return () => filter;
}
