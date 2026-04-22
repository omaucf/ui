import { splitProps } from "solid-js";
import { Dynamic } from "solid-js/web";

import { mergeProps } from "@zag-js/solid";

import type { DOMElements } from "@/types/element";

import type { ComponentRef, FactoryProps } from "./factory.types";

const withAsChild = <T extends DOMElements>(as: T) => {
  const Component: ComponentRef<T> = (props) => {
    const [localProps, parentProps] = splitProps(props, ["asChild"]);

    if (localProps.asChild) {
      // @ts-expect-error
      const propsFn = (userProps) => {
        const [, restProps] = splitProps(parentProps, ["ref"]);
        return mergeProps(restProps, userProps);
      };

      return localProps.asChild(propsFn);
    }
    // @ts-expect-error
    return <Dynamic component={as} {...parentProps} />;
  };

  return Component;
};

function createFactory() {
  const cache = new Map();

  return new Proxy(withAsChild, {
    apply(_target, _thisArg, argArray) {
      return withAsChild(argArray[0]);
    },
    get(_, element) {
      const asElement = element as DOMElements;
      if (!cache.has(asElement)) {
        cache.set(asElement, withAsChild(asElement));
      }
      return cache.get(asElement);
    },
  }) as unknown as FactoryProps;
}

export default createFactory();
