import { type Component, splitProps } from "solid-js";

import { useAppConfig } from "#build/ui/imports";
import { cx } from "#build/ui/utils";

import { Factory } from "@/elements/factory";

import type { ProseH3Props } from "./h3.types";

const ProseH1: Component<ProseH3Props> = (props) => {
  const [{ children, id, anchor }, attrs] = splitProps(props, [
    "anchor",
    "children",
    "id",
  ]);

  const appConfig = useAppConfig() as {
    prose?: { headings?: { anchorLinks?: { h3?: boolean } } };
  };

  const generate =
    id && (anchor ?? appConfig.prose?.headings?.anchorLinks?.h3 ?? false);

  return (
    <Factory.h3 {...attrs} class={cx(attrs.class)} id={id}>
      {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
      {generate ? <a href={`#${id}`}>{children}</a> : children}
    </Factory.h3>
  );
};

export default ProseH1;
