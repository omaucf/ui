import { type Component, type JSX, splitProps } from "solid-js";

import { isArray } from "radashi";

import { Factory } from "@/elements/factory";

import type { LinkBaseProps } from "./link.types";

const LinkBase: Component<LinkBaseProps & { children: JSX.Element }> = (
  props
) => {
  const [{ children, href, raw, ...rootProps }, attrs] = splitProps(props, [
    "active",
    "children",
    "disabled",
    "href",
    "isExternal",
    "onClick",
    "raw",
    "rel",
    "target",
    "type",
  ]);

  const onClickWrapper = (e: MouseEvent) => {
    if (rootProps.disabled) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    if (rootProps.onClick) {
      for (const handler of isArray(rootProps.onClick)
        ? rootProps.onClick
        : [rootProps.onClick]) {
        handler(e as any);
      }
    }
  };

  if (href) {
    return (
      <Factory.a
        aria-disabled={rootProps.disabled ? true : undefined}
        data-active={rootProps.active ? "true" : undefined}
        data-scope={raw ? undefined : "link"}
        href={rootProps.disabled ? undefined : href}
        onClick={onClickWrapper}
        rel={rootProps.rel as string}
        role={rootProps.disabled ? "link" : undefined}
        tabIndex={rootProps.disabled ? -1 : undefined}
        target={rootProps.target as string}
        {...attrs}
      >
        {children}
      </Factory.a>
    );
  }

  return (
    <Factory.button
      data-active={rootProps.active ? "true" : undefined}
      data-scope={raw ? undefined : "link"}
      disabled={rootProps.disabled}
      onClick={onClickWrapper}
      type={rootProps.type ?? "button"}
      {...(attrs as any)}
    >
      {children}
    </Factory.button>
  );
};

export default LinkBase;
