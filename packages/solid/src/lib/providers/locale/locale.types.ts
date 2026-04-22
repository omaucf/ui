import type { ParentProps } from "solid-js";

import type { Locale, Messages } from "#build/ui/types";

export interface LocaleContext<T = Messages> extends Locale<T> {}

export interface LocaleValue extends Locale<Messages> {}

export interface LocaleProviderProps extends ParentProps {
  value?: LocaleValue;
}
