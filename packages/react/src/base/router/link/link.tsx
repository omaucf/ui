import { forwardRef } from "react";

import { cx } from "#build/ui/utils";

import { hasProtocol } from "ufo";

import { Dynamic } from "@/utils/dynamic";

import type { LinkProps } from "./link.types";
import LinkBase from "./link-base";

const Link = forwardRef<HTMLAnchorElement | HTMLButtonElement, LinkProps>(
  (
    {
      active,
      activeClass,
      ariaCurrentValue = "page",
      children,
      className,
      custom,
      disabled,
      external,
      href,
      inactiveClass,
      noRel,
      raw,
      rel,
      target,
      to,
      type = "button",
      ui,
      ...attrs
    },
    ref
  ) => {
    const resolvedHref = to ?? href;

    const isExternal =
      target === "_blank" ||
      external ||
      (!!resolvedHref && hasProtocol(resolvedHref, { acceptRelative: true }));

    const resolvedRel = noRel
      ? undefined
      : (rel ?? (isExternal ? "noopener noreferrer" : undefined));

    const isActive = active ?? false;

    const linkClass = raw
      ? cx(className, isActive ? activeClass : inactiveClass)
      : cx(ui?.base, className, isActive ? activeClass : inactiveClass);

    if (custom) {
      return (
        <Dynamic
          active={isActive}
          disabled={disabled}
          href={resolvedHref}
          isExternal={isExternal}
          raw={raw}
          ref={ref}
          rel={resolvedRel}
          target={target ?? (isExternal ? "_blank" : undefined)}
          type={type}
          {...attrs}
        >
          {children}
        </Dynamic>
      );
    }

    return (
      <LinkBase
        className={linkClass}
        disabled={disabled}
        href={resolvedHref}
        isExternal={isExternal}
        raw={raw}
        ref={ref}
        rel={resolvedRel}
        target={target ?? (isExternal ? "_blank" : undefined)}
        type={type}
        {...attrs}
      >
        <Dynamic {...attrs} active={isActive}>
          {children}
        </Dynamic>
      </LinkBase>
    );
  }
);

Link.displayName = "Link";

export default Link;
