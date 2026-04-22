import {
  Children,
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  memo,
} from "react";

import { useComposedRefs } from "#build/ui/imports";

import { mergeProps } from "@zag-js/core";
import { isObject, isString } from "radashi";

import type { ElementType, PropsWithRef } from "@/types/element";

import type { FactoryProps } from "./factory.types";

function getRef(element: React.ReactElement) {
  // React <=18 in DEV
  let getter = Object.getOwnPropertyDescriptor(element.props, "ref")?.get;
  let mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn) return (element as any).ref;

  // React 19 in DEV
  getter = Object.getOwnPropertyDescriptor(element, "ref")?.get;
  mayWarn = getter && "isReactWarning" in getter && getter.isReactWarning;
  if (mayWarn)
    return (element.props as { ref?: React.Ref<unknown> | undefined }).ref;
  return (
    (element.props as { ref?: React.Ref<unknown> | undefined }).ref ||
    (element as any).ref
  );
}

const REACT_LAZY_TYPE = Symbol.for("react.lazy");

function isLazyElement(children: React.ReactNode) {
  return (
    isObject(children) &&
    children !== null &&
    "$$typeof" in children &&
    children.$$typeof === REACT_LAZY_TYPE
  );
}

function getAsChild(children: React.ReactNode) {
  if (isValidElement<Record<string, unknown>>(children)) return children;
  if (isLazyElement(children))
    return Children.toArray(children).find(
      isValidElement<Record<string, unknown>>
    );
}

const withAsChild = <T extends ElementType>(as: T) => {
  const Comp = memo(
    forwardRef<unknown, PropsWithRef<T>>((props, ref) => {
      const { asChild, children, ...restProps } = props;
      const onlyChild = asChild ? getAsChild(children) : undefined;
      const childRef = onlyChild ? getRef(onlyChild) : undefined;
      const composedRef = useComposedRefs(ref, childRef);

      if (!asChild) return createElement(as, { ...restProps, ref }, children);
      if (!onlyChild) return null;

      return cloneElement(onlyChild, {
        ...mergeProps(restProps, onlyChild.props),
        ref: ref ? composedRef : childRef,
      });
    })
  );

  Comp.displayName = isString(as) ? as : (as.displayName ?? as.name);
  return Comp;
};

const createFactory = () => {
  const cache = new Map();

  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0]);
    },
    get(_, element) {
      if (!cache.has(element)) {
        cache.set(element, withAsChild(element as ElementType));
      }

      return cache.get(element);
    },
  }) as unknown as FactoryProps;
};

export default createFactory();
