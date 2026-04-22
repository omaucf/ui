"use client";

import { useMemo } from "react";

import { useLocale } from "#build/ui/imports";

import {
  createFilter,
  type FilterOptions,
  type FilterReturn,
} from "@zag-js/i18n-utils";

export interface UseFilterProps extends FilterOptions {}

export interface UseFilterReturn extends FilterReturn {}

export function useFilter(props: UseFilterProps): UseFilterReturn {
  const { code } = useLocale();
  const locale = props.locale ?? code;
  return useMemo(() => createFilter({ ...props, locale }), [locale, props]);
}
