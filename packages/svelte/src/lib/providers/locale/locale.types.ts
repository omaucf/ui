import type { Snippet } from "svelte";

import type { Locale, Messages } from "#build/ui/types";

export interface LocaleContext<M = Messages> extends Locale<M> {}

export interface LocaleValue extends Locale<Messages> {}

export interface LocaleProviderProps {
  children?: Snippet;
  value?: LocaleValue;
}
