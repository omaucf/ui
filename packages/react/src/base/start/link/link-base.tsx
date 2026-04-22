import { forwardRef, type MouseEvent, useCallback } from "react";

import { Link as RawLink } from "@tanstack/react-router";
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
    // biome-ignore lint/complexity/noExcessiveCognitiveComplexity: safe_to_set
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

    if (href && !isExternal && !disabled) {
      return (
        <RawLink
          data-active={active ? "true" : undefined}
          data-scope={raw ? undefined : "link"}
          onClick={onClickWrapper as any}
          ref={ref as any}
          rel={rel as string}
          target={target as string}
          to={href}
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
