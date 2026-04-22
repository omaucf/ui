"use client";

import { useMemo } from "react";

import { useLocale } from "#build/ui/imports";

import { createCollator } from "@zag-js/i18n-utils";

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string;
}

export interface UseCollatorReturn extends Intl.Collator {}

export function useCollator(props: UseCollatorProps = {}): UseCollatorReturn {
  const { code } = useLocale();
  const locale = props.locale ?? code;
  return useMemo(() => {
    const { locale: _, ...options } = props;
    return createCollator(locale, options);
  }, [locale, props]);
}
