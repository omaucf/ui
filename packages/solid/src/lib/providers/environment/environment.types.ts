import type { JSX } from "solid-js";

import type { Accessor, MaybeAccessor } from "#build/ui/types";

export type RootNode = ShadowRoot | Document | Node;

export interface EnvironmentContext {
  getDocument: Accessor<Document>;
  getRootNode: Accessor<RootNode>;
  getWindow: Accessor<Window & typeof globalThis>;
}

export type EnvironmentValue = MaybeAccessor<RootNode>;

export interface EnvironmentProviderProps {
  children?: JSX.Element;
  value?: EnvironmentValue;
}
