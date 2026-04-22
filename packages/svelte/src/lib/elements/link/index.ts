import { default as Default } from "./link.svelte";
import { default as Base } from "./link-base.svelte";

export const Link = Object.assign(Default, { Base });

export type {
  LinkBaseProps,
  LinkProps,
  LinkPropsKeys,
  LinkTheme,
} from "./link.types.js";
export { default as LinkBase } from "./link-base.svelte";
