import type { Snippet } from "svelte";
import type { SvelteHTMLElements } from "svelte/elements";

import type { Assign } from "#build/ui/types";

export type DOMElements = keyof SvelteHTMLElements;

export type AsChild<T extends DOMElements> = Snippet<[PropsFn<T>]>;

export type HTMLProps<T extends DOMElements> = Assign<
  Omit<SvelteHTMLElements[T], "class" | "color">,
  PolymorphicProps<T>
>;

export interface PolymorphicProps<T extends DOMElements> {
  as?: T;
  asChild?: AsChild<T>;
  children?: Snippet;
  class?: any;
}

export type PropsFn<T extends DOMElements> = (
  props?: Partial<SvelteHTMLElements[T]>
) => SvelteHTMLElements[T];

export interface RefAttribute<T extends Element = Element> {
  ref?: T | null;
}
