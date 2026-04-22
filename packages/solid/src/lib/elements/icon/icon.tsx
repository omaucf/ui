import { type Component, splitProps } from "solid-js";

import { useIcon } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import { Factory } from "@/elements/factory";

import type { IconProps } from "./icon.types";

const Icon: Component<IconProps> = (props) => {
  const [{ name, raw, ui }, attrs] = splitProps(props, ["name", "raw", "ui"]);
  const { icon, isDynamic, svg } = useIcon(name, raw);

  const ariaProps = {
    "aria-hidden":
      props["aria-label"] || props["aria-labelledby"] ? undefined : true,
    role:
      props["aria-label"] || props["aria-labelledby"]
        ? ("img" as const)
        : undefined,
  };

  if (!isDynamic && svg)
    return (
      <Factory.svg
        {...(attrs as any)}
        {...ariaProps}
        class={cx(ui?.base, attrs.class)}
        data-scope="icon"
        innerHTML={svg.body}
      />
    );

  return (
    <Factory.span
      {...attrs}
      {...ariaProps}
      class={cx(icon, ui?.base, attrs.class)}
      data-scope="icon"
    />
  );
};

export default Icon;
