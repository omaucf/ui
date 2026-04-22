import type { Assign, Id } from "#build/ui/types";

export type ElementType = React.ElementType;

export type DOMElements = keyof React.JSX.IntrinsicElements;

export type PolymorphicProps = Id<{
  asChild?: boolean;
  className?: any;
  children?: React.ReactNode;
}>;

export type PropsWithRef<E extends ElementType> = Assign<
  React.ComponentPropsWithRef<E>,
  PolymorphicProps
>;

export type HTMLProps<T extends DOMElements> = Assign<
  React.ComponentPropsWithoutRef<T>,
  PolymorphicProps
>;

export type SlotFn<T = void> =
  | React.ReactNode
  | ((props: T) => React.ReactNode);
