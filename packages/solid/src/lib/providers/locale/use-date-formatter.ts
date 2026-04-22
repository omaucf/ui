import { type Accessor, createMemo } from "solid-js";

import { useLocale } from "#build/ui/imports";
import type { MaybeAccessor } from "#build/ui/types";

import { DateFormatter } from "@internationalized/date";

import { runIfFn } from "@/utils/fn";

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string;
}

export interface UseDateFormatterReturn extends Accessor<DateFormatter> {}

export function useDateFormatter(
  props: MaybeAccessor<UseDateFormatterProps> = {}
): UseDateFormatterReturn {
  const { code } = useLocale();
  return createMemo(() => {
    const resolvedProps = runIfFn(props);
    const locale = resolvedProps.locale ?? code();
    const { locale: _, ...options } = resolvedProps;
    return new DateFormatter(locale, options);
  });
}
