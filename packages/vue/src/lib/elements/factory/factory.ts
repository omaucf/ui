import { defineComponent, h } from "vue";

import { isString } from "radashi";

import type { ElementType } from "@/types/element.js";
import { Dynamic } from "@/utils/dynamic.js";

import type { FactoryProps } from "./factory.types.js";

const SELF_CLOSING_TAGS = "area, br, hr, img, input, textarea".split(", ");
const isSelfClosingTag = (tag: unknown) =>
  isString(tag) && SELF_CLOSING_TAGS.includes(tag);

function withAsChild<T extends ElementType>(as: T) {
  return defineComponent({
    inheritAttrs: false,
    name: "Polymorphic",
    props: { asChild: { default: false, type: Boolean } },
    setup(props, { attrs, slots }) {
      if (props.asChild) return () => h(Dynamic, attrs, slots);
      return () =>
        h(as, attrs, isSelfClosingTag(as) ? undefined : slots.default?.());
    },
  });
}

function createFactory() {
  const cache = new Map();

  const factory = new Proxy(withAsChild, {
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

  return factory;
}

export default createFactory();
