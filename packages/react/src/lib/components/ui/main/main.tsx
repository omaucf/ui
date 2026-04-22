import { forwardRef } from "react";

import { Factory } from "#build/ui/components";
import { cx } from "#build/ui/utils";

import type { MainProps } from "./main.types";

const Main = forwardRef<HTMLElement, MainProps>(
  ({ className, children, ui, ...attrs }, ref) => (
    <Factory.main
      {...attrs}
      className={cx(ui?.base, className)}
      data-scope="main"
      ref={ref}
    >
      {children}
    </Factory.main>
  )
);

Main.displayName = "Main";

export default Main;
