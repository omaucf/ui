import { forwardRef } from "react";

import { Icon } from "#build/ui/components";
import { cx } from "#build/ui/utils";

import type { ProseIconProps } from "./icon.types";

const ProseIcon = forwardRef<HTMLElement, ProseIconProps>(
  ({ className, name, raw, ui, ...attrs }, ref) => (
    <Icon
      {...attrs}
      className={cx(ui?.base, className)}
      name={name}
      raw={raw}
      ref={ref}
    />
  )
);

ProseIcon.displayName = "ProseIcon";

export default ProseIcon;
