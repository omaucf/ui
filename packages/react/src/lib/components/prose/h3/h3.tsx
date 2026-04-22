import { forwardRef } from "react";

import { Factory } from "#build/ui/components";
import { useAppConfig } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import type { ProseH3Props } from "./h3.types";

const ProseH3 = forwardRef<HTMLHeadingElement, ProseH3Props>(
  ({ anchor, children, className, id, ...attrs }, ref) => {
    const appConfig = useAppConfig() as {
      prose?: { headings?: { anchorLinks?: { h3?: boolean } } };
    };

    const generate =
      id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h3 ?? false);

    return (
      <Factory.h3 {...attrs} className={cx(className)} id={id} ref={ref}>
        {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
        {generate ? <a href={`#${id}`}>{children}</a> : children}
      </Factory.h3>
    );
  }
);

ProseH3.displayName = "ProseH3";

export default ProseH3;
