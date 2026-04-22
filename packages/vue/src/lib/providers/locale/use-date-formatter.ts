import { type ComputedRef, computed, type MaybeRef, toValue } from "vue";

import { useLocale } from "#build/ui/imports";

import { DateFormatter } from "@internationalized/date";

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string;
}

export interface UseDateFormatterReturn extends ComputedRef<DateFormatter> {}

export function useDateFormatter(
  propsOrFn: MaybeRef<UseDateFormatterProps> = {}
): UseDateFormatterReturn {
  const { code } = useLocale();

  return computed(() => {
    const props = toValue(propsOrFn);
    const locale = props.locale ?? code.value;
    const { locale: _, ...options } = props;
    return new DateFormatter(locale, options);
  });
}
