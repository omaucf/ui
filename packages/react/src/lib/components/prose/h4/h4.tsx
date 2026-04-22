import { forwardRef } from "react";

import { Factory } from "#build/ui/components";
import { useAppConfig } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import type { ProseH4Props } from "./h4.types";

const ProseH4 = forwardRef<HTMLHeadingElement, ProseH4Props>(
  ({ anchor, children, className, id, ...attrs }, ref) => {
    const appConfig = useAppConfig() as {
      prose?: { headings?: { anchorLinks?: { h4?: boolean } } };
    };

    const generate =
      id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h4 ?? false);

    return (
      <Factory.h4 {...attrs} className={cx(className)} id={id} ref={ref}>
        {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
        {generate ? <a href={`#${id}`}>{children}</a> : children}
      </Factory.h4>
    );
  }
);

ProseH4.displayName = "ProseH4";

export default ProseH4;
