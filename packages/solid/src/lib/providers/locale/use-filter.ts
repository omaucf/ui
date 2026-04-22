import { type Accessor, createMemo } from "solid-js";

import { useLocale } from "#build/ui/imports";

import {
  createFilter,
  type FilterOptions,
  type FilterReturn,
} from "@zag-js/i18n-utils";

export interface UseFilterProps extends FilterOptions {}

export interface UseFilterReturn extends Accessor<FilterReturn> {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const { code } = useLocale();
  const locale = createMemo(() => props.locale ?? code());
  return createMemo(() => createFilter({ ...props, locale: locale() }));
}
