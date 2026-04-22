import { useLocale } from "#build/ui/imports";
import type { Accessor } from "#build/ui/types";

import { DateFormatter } from "@internationalized/date";

export interface UseDateFormatterProps extends Intl.DateTimeFormatOptions {
  locale?: string;
}

export interface UseDateFormatterReturn extends Accessor<DateFormatter> {}

export function useDateFormatter(
  props: UseDateFormatterProps = {}
): UseDateFormatterReturn {
  const { code } = useLocale();
  const locale = $derived(props.locale ?? code());

  const formatter = $derived.by(() => {
    const { locale: _, ...options } = props;
    return new DateFormatter(locale, options);
  });

  return () => formatter;
}
