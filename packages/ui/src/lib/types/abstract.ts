export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P] | undefined;
};

export type Prettify<T> = { [K in keyof T]: T[K] } & {};

export type Stringify<T> = T | (string & {});
