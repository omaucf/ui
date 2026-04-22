import type { TVReturnType, VariantProps } from "tailwind-variants";

import type { Id, MaybeBoolean } from "./abstract.js";

export type ClassValue = import("tailwind-variants").ClassValue;

export type Component<
  S extends Slots = Slots,
  V extends object = Variants<S>,
> = Id<{
  base?: ClassValue;
  compoundSlots?: ComponentCompoundSlots<V, S>;
  compoundVariants?: ComponentCompoundVariants<V, S>;
  defaultVariants?: DefaultVariants<V>;
  extend?: TVReturnType<any, any, any, any, any>;
  slots?: S;
  variants?: V;
}>;

export type ComponentApi<
  T,
  K extends string,
  U extends ComponentScope = "ui",
> = Id<{
  config: ComponentConfig<T, K, U>;
  slots: ComponentSlots<T>;
  ui: ComponentUI<T>;
  variants: ComponentVariants<T>;
}>;

export type Components<
  T extends Record<PropertyKey, ComponentLike> = Record<
    PropertyKey,
    ComponentLike
  >,
> = Id<{ [K in keyof T]?: Partial<T[K]> }>;

type BaseOf<T> = T extends { base: infer B } ? B : undefined;

type BaseSlot<T> = BaseOf<T> extends undefined ? object : { base?: string };

type ComponentCompoundSlots<V, S extends Slots> = V extends object
  ? readonly CompoundSlot<V, S>[]
  : never;

type ComponentCompoundVariants<V, S extends Slots> = V extends object
  ? readonly CompoundVariant<V, S>[]
  : never;

type ComponentConfig<
  T,
  K extends string,
  Scope extends ComponentScope,
> = Scope extends `ui:${infer Namespace}`
  ? Id<{
      ui?: { components?: { [N in Namespace]?: { [P in K]?: Partial<T> } } };
    }>
  : Id<{ ui?: { components?: { [P in K]?: Partial<T> } } }>;

type ComponentLike = Id<{
  base?: ClassValue;
  extend?: TVReturnType<any, any, any, any, any>;
  slots?: object;
  variants?: object;
}>;

type ComponentScope = "ui" | `ui:${string}`;

type ComponentSlots<T> = Id<SlotsOf<T> & BaseSlot<T>>;

type ComponentVariants<T> =
  ExtendOf<T> extends (...args: any[]) => any
    ? VariantProps<ExtendOf<T>>
    : VariantsOf<T> extends object
      ? Id<{
          [K in keyof VariantsOf<T>]?: MaybeBoolean<keyof VariantsOf<T>[K]>;
        }>
      : object;

type ComponentUI<T> = Id<{
  [K in keyof ComponentSlots<T>]: (
    props?: ComponentVariants<T> & { class?: ClassValue }
  ) => string;
}>;

type CompoundSlot<V, S extends Slots> = VariantSelector<V> & {
  slots: readonly (keyof S)[];
  class?: ClassValue;
};

type CompoundVariant<V, S extends Slots> = VariantSelector<V> & {
  class?: VariantValue<S>;
};

type DefaultVariants<V> = V extends object
  ? { [K in keyof V]?: MaybeBoolean<keyof V[K]> }
  : object;

type ExtendOf<T> = T extends { extend?: infer E } ? E : undefined;

type Slots = Record<PropertyKey, string>;

type SlotsOf<T> = T extends { slots?: infer S extends Slots }
  ? Partial<S>
  : object;

type VariantsOf<T> = T extends { variants?: infer V } ? V : object;

type Variants<S extends Slots> = Id<{
  [Variant: PropertyKey]: { [Value: PropertyKey]: VariantValue<S> };
}>;

type VariantSelector<V> = V extends object
  ? {
      [K in keyof V]?:
        | MaybeBoolean<keyof V[K]>
        | readonly MaybeBoolean<keyof V[K]>[];
    }
  : object;

type VariantValue<S extends Slots> = ClassValue | Partial<S>;
