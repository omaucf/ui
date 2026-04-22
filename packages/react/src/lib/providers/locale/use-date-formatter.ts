"use client";

import { useMemo } from "react";

import { useLocale } from "#build/ui/imports";

import { DateFormatter } from "@internationalized/date";

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string;
}

export interface UseDateFormatterReturn extends DateFormatter {}

export function useDateFormatter(
  props: UseDateFormatterProps = {}
): UseDateFormatterReturn {
  const { code } = useLocale();
  const locale = props.locale ?? code;
  return useMemo(() => {
    const { locale: _, ...options } = props;
    return new DateFormatter(locale, options);
  }, [locale, props]);
}
