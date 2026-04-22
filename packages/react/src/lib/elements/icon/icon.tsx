import { forwardRef } from "react";

import { useIcon } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import { Factory } from "@/elements/factory";

import type { IconProps } from "./icon.types";

const Icon = forwardRef<HTMLElement | SVGSVGElement, IconProps>(
  ({ className, name, raw, ui, ...attrs }, ref) => {
    const { icon, isDynamic, svg } = useIcon(name, raw);

    const ariaProps = {
      "aria-hidden":
        attrs["aria-label"] || attrs["aria-labelledby"] ? undefined : true,
      role: attrs["aria-label"] || attrs["aria-labelledby"] ? "img" : undefined,
    };

    if (!isDynamic && svg)
      return (
        <Factory.svg
          {...attrs}
          {...ariaProps}
          className={cx(ui?.base, className)}
          // biome-ignore lint/security/noDangerouslySetInnerHtml:safe_to_set
          dangerouslySetInnerHTML={{ __html: svg.body }}
          data-scope="icon"
          ref={ref as React.Ref<SVGSVGElement>}
        />
      );

    return (
      <Factory.span
        {...(attrs as any)}
        {...ariaProps}
        className={cx(icon, ui?.base, className)}
        data-scope="icon"
        ref={ref}
      />
    );
  }
);

Icon.displayName = "Icon";

export default Icon;
