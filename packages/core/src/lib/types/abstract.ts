export type Accessor<T> = () => T;

export type AnyFunction<T = any> = (...args: any[]) => T;

export type Assign<T, U> = Omit<T, keyof U> & U;

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};

export type Id<T> = { [K in keyof T]: T[K] } & {};

export type MaybeAccessor<T> = Accessor<T> | T;

export type MaybeBoolean<T> = T extends "true" | "false" ? boolean : T;

export type MaybePromise<T> = T | Promise<T>;

export type MaybeString<T> = T | (string & {});
