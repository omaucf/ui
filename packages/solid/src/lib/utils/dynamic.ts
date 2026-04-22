import type { Component } from "solid-js";
import { splitProps } from "solid-js";

import { isFunction } from "radashi";

import type { SlotFn } from "@/types/element";

const Dynamic: Component<{
  children?: SlotFn<{ [x: string]: any }>;
  [x: string]: any;
}> = (props) => {
  const [dynamicProps, attrs] = splitProps(props, ["children"]);
  if (isFunction(dynamicProps.children)) return dynamicProps.children(attrs);
  return dynamicProps.children;
};

export { Dynamic };
