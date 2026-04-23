import type {
  ClassValue,
  TVCompoundVariants as CompoundVariants,
  TVDefaultVariants as DefaultVariants,
  TVVariants as Variants,
} from "tailwind-variants";

import type { Dict, Prettify } from "./abstract.js";
import type { Schema } from "./schema.js";

export type Components<T extends Dict<string>> = Prettify<
  Schema["ui"]["components"] & {
    [P in keyof T]?: {
      [K in keyof T[P] as K extends
        | "base"
        | "slots"
        | "variants"
        | "defaultVariants"
        ? K
        : never]?: K extends "base"
        ? ClassValue
        : K extends "slots"
          ? {
              [S in keyof T[P]["slots"]]?: ClassValue;
            }
          : K extends "variants"
            ? Variants<
                T[P]["slots"],
                ClassValue,
                WidenVariantsValues<T[P]["variants"]>
              >
            : K extends "defaultVariants"
              ? DefaultVariants<
                  WidenVariantsValues<T[P]["variants"]>,
                  T[P]["slots"],
                  object,
                  undefined
                >
              : never;
    };
  } & {
    [P in keyof T]?: {
      compoundVariants?: CompoundVariants<
        WidenVariantsValues<T[P]["variants"]>,
        T[P]["slots"],
        ClassValue,
        object,
        undefined
      >;
    };
  }
>;

export interface Component<
  T extends Dict<string>,
  K extends string,
  U extends ComponentScope = "ui",
> {
  config: ComponentConfig<NormalizedTheme<T>, K, U>;
  slots: ComponentSlots<T>;
  ui: ComponentUI<T>;
  variants: ComponentVariants<NormalizedTheme<T>>;
}

type ComponentConfig<
  T extends Dict<string>,
  K extends string,
  Scope extends ComponentScope,
> = ComponentPath<Scope, ComponentLeaf<T, K>>;

interface ComponentLeaf<T extends Dict<string>, K extends string> {
  components?: {
    [P in K]?: Partial<T>;
  };
}

type ComponentPath<
  Scope extends string,
  Value,
> = Scope extends `${infer Root}:${infer Key}`
  ? { [R in Root]?: { [K in Key]?: Value } }
  : { [R in Scope]?: Value };

type ComponentScope = "ui" | `ui:${string}`;

type ComponentSlots<T extends Dict<string>> = Prettify<{
  [K in keyof NormalizedTheme<T>["slots"]]?: ClassValue;
}>;

type ComponentVariants<T extends Dict<string>> = T extends {
  variants: infer V extends Dict<string>;
}
  ? {
      [K in keyof V]: keyof V[K];
    }
  : // biome-ignore lint/complexity/noBannedTypes: safe_to_set
    {};

type ComponentUI<T extends Dict<string>> = Prettify<{
  [K in keyof NormalizedTheme<T>["slots"]]: (props?: Dict<string>) => string;
}>;

type NormalizeBase<T> = T extends { base: infer B }
  ? B extends ClassValue
    ? B
    : never
  : undefined;

type NormalizeSlots<T> = T extends {
  slots: infer S extends Dict<string>;
}
  ? S
  : { root: ClassValue };

interface NormalizedTheme<T extends Dict<string>> {
  base?: NormalizeBase<T>;
  slots?: NormalizeSlots<T>;
  variants?: NormalizeVariants<T["variants"], NormalizeSlots<T>>;
}

type NormalizeVariants<V, S extends Dict<string>> =
  V extends Dict<string>
    ? {
        [K in keyof V]: V[K] extends Dict<string>
          ? {
              [P in keyof V[K]]: {
                [Slot in keyof S]?: ClassValue;
              };
            }
          : never;
      }
    : undefined;

type WidenVariantsValues<V extends Dict<string> | undefined> =
  V extends Dict<string>
    ? V & {
        [K in keyof V]: V[K] extends Dict<string>
          ? V[K] & Dict<string & {}, any>
          : V[K];
      }
    : V;
