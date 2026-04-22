import { cloneElement, forwardRef, isValidElement } from "react";

import { mergeProps } from "@zag-js/core";
import { isFunction } from "@zag-js/utils";

import type { SlotFn } from "@/types/element";

const Dynamic = forwardRef<
  HTMLElement,
  { children?: SlotFn<{ [x: string]: any }>; [x: string]: any }
>(({ children, ...props }, ref) => {
  if (isFunction(children)) return children(props);
  if (!isValidElement(children)) return children;
  const child = children as React.ReactElement<Record<string, unknown>>;
  return cloneElement(child, mergeProps(child.props, { ...props, ref }));
});

Dynamic.displayName = "Dynamic";

export { Dynamic };
