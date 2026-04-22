import type { MaybeAccessor } from "#build/ui/types";

export type RootNode = ShadowRoot | Document | Node;

export interface EnvironmentContext {
  getDocument: () => Document;
  getRootNode: () => RootNode;
  getWindow: () => Window & typeof globalThis;
}

export type EnvironmentValue = MaybeAccessor<RootNode>;

export interface EnvironmentProviderProps {
  value?: EnvironmentValue;
}
