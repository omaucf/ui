import { forwardRef } from "react";

import { Factory } from "#build/ui/components";
import { useAppConfig } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import type { ProseH2Props } from "./h2.types";

const ProseH2 = forwardRef<HTMLHeadingElement, ProseH2Props>(
  ({ anchor, children, className, id, ...attrs }, ref) => {
    const appConfig = useAppConfig() as {
      prose?: { headings?: { anchorLinks?: { h2?: boolean } } };
    };

    const generate =
      id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h2 ?? false);

    return (
      <Factory.h2 {...attrs} className={cx(className)} id={id} ref={ref}>
        {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
        {generate ? <a href={`#${id}`}>{children}</a> : children}
      </Factory.h2>
    );
  }
);

ProseH2.displayName = "ProseH2";

export default ProseH2;
