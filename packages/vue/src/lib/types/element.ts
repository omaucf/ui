import type { ExtractPropTypes, h, IntrinsicElementAttributes } from "vue";

import type { Assign } from "#build/ui/types";

export type ElementType = Parameters<typeof h>[0];

export type DOMElements = keyof IntrinsicElementAttributes;

export type HTMLProps<E extends DOMElements> = Assign<
  PropsWithRef<E>,
  PolymorphicProps
>;

export interface PolymorphicProps {
  asChild?: boolean;
  class?: any;
}

type PropsWithRef<E extends ElementType> = E extends DOMElements
  ? Omit<IntrinsicElementAttributes[E], "class" | "color">
  : Omit<ExtractPropTypes<E>, "class" | "color">;
