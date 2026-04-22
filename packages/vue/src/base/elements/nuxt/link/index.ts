import { default as Default } from "./link.vue";
import { default as Base } from "./link-base";

export const Link = Object.assign(Default, { Base });

export type {
  LinkBaseProps,
  LinkProps,
  LinkPropsKeys,
  LinkSlots,
  LinkTheme,
} from "./link.types.js";
export { default as LinkBase } from "./link-base";
