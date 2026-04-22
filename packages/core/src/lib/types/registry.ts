import type { AnyFunction, Id, MaybePromise } from "./abstract.js";
import type { Config, Schema } from "./schema.js";

export type Registry = Id<{
  [K in keyof Schema["registry"]]-?: Schema["registry"][K];
}>;

export type ComponentEntry = Id<{
  as: string;
  from: string;
  isDefault: boolean;
  name: string;
}>;

export type IconEntry =
  | { type: "external"; name: string; from?: string }
  | { type: "virtual"; name: string; raw: Record<string, string> };

export type Namespace = Id<{
  enabled?: (config: Config) => boolean;
  name: string;
  source: Record<string, unknown>;
}>;

export type NamespaceOptions = Id<{
  namespace?: string;
  prefix?: string;
  prefixNamespaces?: boolean;
}>;

export type Resolver = (specifier: string) => MaybePromise<string>;

export type Template = Id<{
  filename: string;
  getContents: AnyFunction<MaybePromise<string>>;
  write?: boolean;
}>;
