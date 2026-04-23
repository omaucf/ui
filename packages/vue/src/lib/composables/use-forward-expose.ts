import {
  type ComponentPublicInstance,
  computed,
  getCurrentInstance,
  ref,
} from "vue";

import { isString } from "@veehance/core/utils";

import { unrefElement } from "../utils/unref-element.js";

const isElement = (el: any): el is Element =>
  // biome-ignore lint/suspicious/noPrototypeBuiltins: safe_to_set
  Object.prototype.hasOwnProperty.call(el, "nodeName") && isString(el.nodeName);

export function useForwardExpose() {
  // biome-ignore lint/style/noNonNullAssertion: safe_to_set
  const instance = getCurrentInstance()!;
  const currentRef = ref<Element | ComponentPublicInstance | null>();

  const currentElement = computed<HTMLElement>(() => {
    // @ts-expect-error ignore ts error
    return ["#text", "#comment"].includes(currentRef.value?.$el.nodeName)
      ? // @ts-expect-error ignore ts error
        currentRef.value?.$el.nextElementSibling
      : // @ts-expect-error ignore ts error
        unrefElement(currentRef);
  });

  const localExpose: Record<string, any> | null = { ...instance.exposed };
  const ret: Record<string, any> = {};

  for (const key in instance.props) {
    if (Object.hasOwn(instance.props, key)) {
      Object.defineProperty(ret, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
      });
    }
  }

  if (localExpose && Object.keys(localExpose).length > 0) {
    for (const key in localExpose) {
      if (Object.hasOwn(localExpose, key)) {
        Object.defineProperty(ret, key, {
          enumerable: true,
          configurable: true,
          get: () => localExpose[key],
        });
      }
    }
  }

  Object.defineProperty(ret, "$el", {
    enumerable: true,
    configurable: true,
    get: () => instance.vnode.el,
  });

  instance.exposed = ret;

  function forwardRef(ref: Element | ComponentPublicInstance | null) {
    currentRef.value = ref;

    if (!ref) return;

    Object.defineProperty(ret, "$el", {
      enumerable: true,
      configurable: true,
      get: () => (isElement(ref) ? ref : ref.$el),
    });

    instance.exposed = ret;
  }

  return { forwardRef, currentRef, currentElement };
}
