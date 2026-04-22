import { type Component, splitProps } from "solid-js";

import { useAppConfig } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import { Factory } from "@/elements/factory";

import type { ProseH4Props } from "./h4.types";

const ProseH1: Component<ProseH4Props> = (props) => {
  const [{ children, id, anchor }, attrs] = splitProps(props, [
    "anchor",
    "children",
    "id",
  ]);

  const appConfig = useAppConfig() as {
    prose?: { headings?: { anchorLinks?: { h4?: boolean } } };
  };

  const generate =
    id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h4 ?? false);

  return (
    <Factory.h4 {...attrs} class={cx(attrs.class)} id={id}>
      {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
      {generate ? <a href={`#${id}`}>{children}</a> : children}
    </Factory.h4>
  );
};

export default ProseH1;
