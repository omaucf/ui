import { forwardRef, type MouseEvent, useCallback } from "react";

import { isArray } from "radashi";

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
      onClick,
      raw,
      rel,
      target,
      type = "button",
      ...attrs
    },
    ref
  ) => {
    const onClickWrapper = useCallback(
      (e: MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
        if (disabled) {
          e.preventDefault();
          e.stopPropagation();
          return;
        }

        if (onClick) {
          for (const handler of isArray(onClick) ? onClick : [onClick]) {
            handler(e as any);
          }
        }
      },
      [disabled, onClick]
    );

    if (href) {
      return (
        <Factory.a
          aria-disabled={disabled ? true : undefined}
          data-active={active ? "true" : undefined}
          data-scope={raw ? undefined : "link"}
          href={disabled ? undefined : href}
          onClick={onClickWrapper}
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
        data-active={active ? "true" : undefined}
        data-scope={raw ? undefined : "link"}
        disabled={disabled}
        onClick={onClickWrapper}
        ref={ref as any}
        type={type}
        {...attrs}
      >
        {children}
      </Factory.button>
    );
  }
);

LinkBase.displayName = "LinkBase";

export default LinkBase;
