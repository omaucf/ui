import type { JSX } from "solid-js";

import type { DOMElements, HTMLProps } from "@/types/element.js";

export type ComponentRef<E extends DOMElements> = (
  props: HTMLProps<E>
) => JSX.Element;

export type FactoryProps = { [E in DOMElements]: ComponentRef<E> };
