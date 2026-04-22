import type {
  DOMElements,
  ElementType,
  PropsWithRef,
} from "@/types/element.js";

type ForwardRefComponent<E extends ElementType> =
  React.ForwardRefExoticComponent<PropsWithRef<E>>;

export type FactoryProps = { [E in DOMElements]: ForwardRefComponent<E> };
