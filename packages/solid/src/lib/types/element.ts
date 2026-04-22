import type { ComponentProps, JSX } from "solid-js";

import type { Assign, Id } from "#build/ui/types";

export type DOMElements = keyof JSX.IntrinsicElements;

type ParentProps<T extends DOMElements> = (
  userProps?: JSX.IntrinsicElements[T]
) => JSX.HTMLAttributes<any>;

export type PolymorphicProps<T extends DOMElements> = Id<{
  asChild?: (props: ParentProps<T>) => JSX.Element;
  class?: any;
  children?: JSX.Element;
}>;

export type HTMLProps<T extends DOMElements> = Assign<
  ComponentProps<T>,
  PolymorphicProps<T>
>;

export type SlotFn<T = void> = JSX.Element | ((props: T) => JSX.Element);
