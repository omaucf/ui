import { forwardRef } from "react";

import { Factory } from "#build/ui/components";
import { useAppConfig } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import type { ProseH1Props } from "./h1.types";

const ProseH1 = forwardRef<HTMLHeadingElement, ProseH1Props>(
  ({ anchor, children, className, id, ...attrs }, ref) => {
    const appConfig = useAppConfig() as {
      prose?: { headings?: { anchorLinks?: { h1?: boolean } } };
    };

    const generate =
      id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h1 ?? false);

    return (
      <Factory.h1 {...attrs} className={cx(className)} id={id} ref={ref}>
        {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
        {generate ? <a href={`#${id}`}>{children}</a> : children}
      </Factory.h1>
    );
  }
);

ProseH1.displayName = "ProseH1";

export default ProseH1;
