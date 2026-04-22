import { type ComputedRef, computed, type MaybeRef, toValue } from "vue";

import { useLocale } from "#build/ui/imports";

import { createCollator } from "@zag-js/i18n-utils";

export interface UseCollatorProps extends Intl.CollatorOptions {
  locale?: string;
}

export interface UseCollatorReturn extends ComputedRef<Intl.Collator> {}

export function useCollator(
  propsOrFn: MaybeRef<UseCollatorProps> = {}
): UseCollatorReturn {
  const { code } = useLocale();

  return computed(() => {
    const props = toValue(propsOrFn);
    const locale = props.locale ?? code.value;
    const { locale: _, ...options } = props;
    return createCollator(locale, options);
  });
}
