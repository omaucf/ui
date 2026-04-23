export type Accessor<T> = () => T;

export type AnyFunction = (...args: any[]) => any;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};

type Primitve = string | number | symbol;

export type Dict<K extends Primitve, V = any> = Record<K, V>;

export type MaybeFunction<T> = T | Accessor<T>;

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type RootNode = ShadowRoot | Document | Node;

export type Stringify<T> = T | (string & {});
