import {
  type ComponentPublicInstance,
  type MaybeRef,
  type MaybeRefOrGetter,
  toValue,
} from "vue";

export type MaybeComputedElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRefOrGetter<T>;

export type MaybeElement =
  | HTMLElement
  | SVGElement
  | VueInstance
  | undefined
  | null;

export type MaybeElementRef<T extends MaybeElement = MaybeElement> =
  MaybeRef<T>;

export type UnRefElementReturn<T extends MaybeElement = MaybeElement> =
  T extends VueInstance ? Exclude<MaybeElement, VueInstance> : T | undefined;

export type VueInstance = ComponentPublicInstance;

export function unrefElement<T extends MaybeElement>(
  elRef: MaybeComputedElementRef<T>
): UnRefElementReturn<T> {
  const plain = toValue(elRef);
  return (plain as VueInstance)?.$el ?? plain;
}
