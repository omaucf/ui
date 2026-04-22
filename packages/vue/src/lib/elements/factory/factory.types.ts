import type {
  AllowedComponentProps,
  ComponentCustomProps,
  ExtractPropTypes,
  IntrinsicElementAttributes,
  VNodeProps,
} from "vue";

import type {
  DOMElements,
  ElementType,
  PolymorphicProps,
} from "@/types/element.js";

export type FactoryProps = { [E in DOMElements]: AsChild<E> };

interface AsChild<
  E extends ElementType,
  P extends Record<string, unknown> = Record<never, never>,
> {
  new (): {
    $props: AllowedComponentProps &
      ComponentCustomProps &
      VNodeProps &
      ExtractPropTypes<E> &
      (E extends keyof IntrinsicElementAttributes
        ? IntrinsicElementAttributes[E]
        : Record<never, never>) &
      P &
      PolymorphicProps;
  };
}
