import type { Snippet } from "svelte";

import type { Accessor, MaybeAccessor } from "#build/ui/types";

export type RootNode = ShadowRoot | Document | Node;

export interface EnvironmentContext {
  getDocument: Accessor<Document>;
  getRootNode: Accessor<RootNode>;
  getWindow: Accessor<Window & typeof globalThis>;
}

export type EnvironmentValue = MaybeAccessor<RootNode>;

export interface EnvironmentProviderProps {
  children?: Snippet;
  value?: EnvironmentValue;
}
