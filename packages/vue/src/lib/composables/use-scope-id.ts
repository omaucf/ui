import { type ComponentInternalInstance, getCurrentInstance } from "vue";

import { hasProp } from "@zag-js/utils";
import { isString } from "radashi";

export const useScopeId = () => {
  const instance = getCurrentInstance();
  if (!instance) return;

  let scopeId = getScopeIdFromInstance(instance);

  if (!scopeId && instance.parent) {
    let parent: ComponentInternalInstance | null = instance.parent;
    while (parent && !scopeId) {
      scopeId = getScopeIdFromInstance(parent);
      parent = parent.parent;
    }
  }

  return scopeId;
};

function getScopeIdFromInstance(
  instance: ComponentInternalInstance
): string | undefined {
  if (hasVnodeScopeId(instance.vnode)) return instance.vnode.scopeId;
  if (hasTypeScopeId(instance.type)) return instance.type.__scopeId;
}

function hasTypeScopeId(
  type: ComponentInternalInstance["type"]
): type is ComponentInternalInstance["type"] & { __scopeId: string } {
  if (type === null || typeof type !== "object") return false;
  const typeObj = type as unknown as Record<string, unknown>;
  return hasProp(typeObj, "__scopeId") && isString(typeObj.__scopeId);
}

function hasVnodeScopeId(
  vnode: ComponentInternalInstance["vnode"]
): vnode is ComponentInternalInstance["vnode"] & { scopeId: string } {
  if (vnode === null || typeof vnode !== "object") return false;
  const vnodeObj = vnode as unknown as Record<string, unknown>;
  return hasProp(vnodeObj, "scopeId") && isString(vnodeObj.scopeId);
}
