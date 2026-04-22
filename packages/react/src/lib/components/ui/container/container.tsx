import { forwardRef } from "react";

import { Factory } from "#build/ui/components";
import { cx } from "#build/ui/utils";

import type { ContainerProps } from "./container.types";

const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, children, ui, ...attrs }, ref) => (
    <Factory.div
      {...attrs}
      className={cx(ui?.base, className)}
      data-scope="container"
      ref={ref}
    >
      {children}
    </Factory.div>
  )
);

Container.displayName = "Container";

export default Container;
