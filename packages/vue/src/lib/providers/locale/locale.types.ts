import type { Locale, Messages } from "#build/ui/types";

export interface LocaleContext<M = Messages> extends Locale<M> {}

export interface LocaleValue extends LocaleContext<Messages> {}

export interface LocaleProviderProps {
  value?: LocaleValue;
}
