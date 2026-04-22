import {
  Comment,
  cloneVNode,
  defineComponent,
  Fragment,
  type VNode,
} from "vue";

import { mergeProps } from "@zag-js/vue";

export const Dynamic = defineComponent({
  inheritAttrs: false,
  name: "Dynamic",
  setup(_, { attrs, slots }) {
    return () => {
      if (!slots.default) return null;
      const children = renderSlotFragments(slots.default());
      const index = children.findIndex((child) => child.type !== Comment);
      if (index === -1) return children;

      const firstChildren = children[index];

      if (Object.keys(attrs).length > 0) {
        // biome-ignore lint/performance/noDelete: safe_to_set
        delete firstChildren.props?.ref;
        // props are cleared below so `cloneVNode` doesn't merge the child's own props a second time
        const mergedProps = mergeProps(attrs, firstChildren.props ?? {});
        const cloned = cloneVNode({ ...firstChildren, props: {} }, mergedProps);

        if (children.length === 1) return cloned;
        children[index] = cloned;
        return children;
      }

      return children;
    };
  },
});

function renderSlotFragments(children?: VNode[]): VNode[] {
  if (!children) return [];
  return children.flatMap((child) => {
    if (child.type === Fragment)
      return renderSlotFragments(child.children as VNode[]);
    return [child];
  });
}
