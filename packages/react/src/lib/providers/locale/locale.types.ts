import type { Locale, Messages } from "@veehance/core/types";

export interface LocaleContext<M = Messages> extends Locale<M> {}

export interface LocaleValue extends Locale<Messages> {}

export interface LocaleProviderProps {
  children?: React.ReactNode;
  value?: LocaleValue;
}
