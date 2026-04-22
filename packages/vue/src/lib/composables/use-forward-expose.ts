import {
  type ComponentPublicInstance,
  computed,
  getCurrentInstance,
  ref,
} from "vue";

import { isString } from "radashi";

import { unrefElement } from "@/utils/unref.js";

export function useForwardExpose() {
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

  // biome-ignore lint/suspicious/useGuardForIn: safe_to_set
  for (const key in instance.props) {
    Object.defineProperty(ret, key, {
      configurable: true,
      enumerable: true,
      get: () => instance.props[key],
    });
  }

  if (Object.keys(localExpose).length > 0) {
    // biome-ignore lint/suspicious/useGuardForIn: safe_to_set
    for (const key in localExpose) {
      Object.defineProperty(ret, key, {
        configurable: true,
        enumerable: true,
        get: () => localExpose![key],
      });
    }
  }

  Object.defineProperty(ret, "$el", {
    configurable: true,
    enumerable: true,
    get: () => instance.vnode.el,
  });

  instance.exposed = ret;

  function forwardRef(reference: Element | ComponentPublicInstance | null) {
    currentRef.value = reference;

    if (!reference) return;

    Object.defineProperty(ret, "$el", {
      configurable: true,
      enumerable: true,
      get: () => (isElement(reference) ? reference : reference.$el),
    });

    instance.exposed = ret;
  }

  return { currentElement, currentRef, forwardRef };
}

function isElement(el: any): el is Element {
  // biome-ignore lint/suspicious/noPrototypeBuiltins: safe_to_set
  return (
    Object.prototype.hasOwnProperty.call(el, "nodeName") &&
    isString(el.nodeName)
  );
}
