import { type Component, splitProps } from "solid-js";

import { cx } from "#build/ui/utils";

import { hasProtocol } from "ufo";

import { Dynamic } from "@/utils/dynamic";

import type { LinkProps } from "./link.types";
import LinkBase from "./link-base";

const Link: Component<LinkProps> = (props) => {
  const [
    {
      ariaCurrentValue = "page",
      children,
      custom,
      href,
      raw,
      to,
      type = "button",
      ui,
      ...rootProps
    },
    attrs,
  ] = splitProps(props, [
    "active",
    "activeClass",
    "ariaCurrentValue",
    "children",
    "custom",
    "disabled",
    "external",
    "href",
    "inactiveClass",
    "noRel",
    "raw",
    "rel",
    "target",
    "to",
    "type",
    "ui",
  ]);

  const resolvedHref = to ?? href;

  const isExternal =
    rootProps.target === "_blank" ||
    rootProps.external ||
    (!!resolvedHref && hasProtocol(resolvedHref, { acceptRelative: true }));

  const resolvedRel = rootProps.noRel
    ? undefined
    : (rootProps.rel ?? (isExternal ? "noopener noreferrer" : undefined));

  const isActive = rootProps.active ?? false;

  const linkClass = raw
    ? cx(
        attrs.class,
        isActive ? rootProps.activeClass : rootProps.inactiveClass
      )
    : cx(
        ui?.base,
        attrs.class,
        isActive ? rootProps.activeClass : rootProps.inactiveClass
      );

  if (custom) {
    return (
      <Dynamic
        active={isActive}
        ariaCurrentValue={ariaCurrentValue}
        disabled={rootProps.disabled}
        href={resolvedHref}
        isExternal={isExternal}
        raw={raw}
        rel={resolvedRel}
        target={rootProps.target ?? (isExternal ? "_blank" : undefined)}
        type={type}
        {...attrs}
      >
        {children}
      </Dynamic>
    );
  }

  return (
    <LinkBase
      class={linkClass}
      disabled={rootProps.disabled}
      href={resolvedHref}
      isExternal={isExternal}
      raw={raw}
      rel={resolvedRel}
      target={rootProps.target ?? (isExternal ? "_blank" : undefined)}
      type={type}
      {...attrs}
    >
      <Dynamic active={isActive}>{children}</Dynamic>
    </LinkBase>
  );
};

export default Link;
