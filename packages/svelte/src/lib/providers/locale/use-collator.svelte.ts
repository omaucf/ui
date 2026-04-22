import { useLocale } from "#build/ui/imports";
import type { Accessor } from "#build/ui/types";

import { createCollator } from "@zag-js/i18n-utils";

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string;
}

export interface UseCollatorReturn extends Accessor<Intl.Collator> {}

export function useCollator(props: UseCollatorProps = {}): UseCollatorReturn {
  const { code } = useLocale();
  const locale = $derived(props.locale ?? code());

  const collator = $derived.by(() => {
    const { locale: _, ...options } = props;
    return createCollator(locale, options);
  });

  return () => collator;
}
