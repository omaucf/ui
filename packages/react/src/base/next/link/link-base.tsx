import { forwardRef } from "react";

import RawLink from "next/link";

import { Factory } from "@/elements/factory";

import type { LinkBaseProps } from "./link.types";

const LinkBase = forwardRef<
  HTMLAnchorElement | HTMLButtonElement,
  LinkBaseProps & { children: React.ReactNode }
>(
  (
    {
      active,
      children,
      disabled,
      href,
      isExternal,
      raw,
      rel,
      target,
      type = "button",
      ...attrs
    },
    ref
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity:safe_to_set
  ) => {
    if (href && !isExternal && !disabled) {
      return (
        <RawLink
          data-active={active ? "true" : undefined}
          data-scope={raw ? undefined : "link"}
          href={href}
          ref={ref as any}
          rel={rel as string}
          target={target as string}
          {...attrs}
        >
          {children}
        </RawLink>
      );
    }

    if (href) {
      return (
        <Factory.a
          aria-disabled={disabled ? true : undefined}
          data-active={active ? "true" : undefined}
          data-scope={raw ? undefined : "link"}
          href={disabled ? undefined : href}
          ref={ref as any}
          rel={rel as string}
          role={disabled ? "link" : undefined}
          tabIndex={disabled ? -1 : undefined}
          target={target as string}
          {...attrs}
        >
          {children}
        </Factory.a>
      );
    }

    return (
      <Factory.button
        {...attrs}
        data-active={active ? "true" : undefined}
        data-scope={raw ? undefined : "link"}
        disabled={disabled}
        ref={ref as any}
        type={type}
      >
        {children}
      </Factory.button>
    );
  }
);

LinkBase.displayName = "LinkBase";

export default LinkBase;
