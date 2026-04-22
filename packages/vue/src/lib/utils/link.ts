import { reactivePick } from "@vueuse/core";
import { diff, isEqual } from "ohash/utils";

const linkKeys = [
  "active",
  "activeClass",
  "ariaCurrentValue",
  "disabled",
  "download",
  "exact",
  "exactActiveClass",
  "exactHash",
  "exactQuery",
  "external",
  "form",
  "formaction",
  "formenctype",
  "formmethod",
  "formnovalidate",
  "formtarget",
  "href",
  "hreflang",
  "inactiveClass",
  "locale",
  "media",
  "noPrefetch",
  "noRel",
  "onClick",
  "ping",
  "prefetch",
  "prefetchedClass",
  "prefetchOn",
  "referrerpolicy",
  "rel",
  "replace",
  "target",
  "title",
  "to",
  "trailingSlash",
  "type",
  "viewTransition",
] as const;

export function isPartiallyEqual(item1: any, item2: any) {
  const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
    if (q.type === "added") filtered.add(q.key);
    return filtered;
  }, new Set<string>());

  return isEqual(
    Object.fromEntries(
      Object.entries(item1).filter(([key]) => !diffedKeys.has(key))
    ),
    Object.fromEntries(
      Object.entries(item2).filter(([key]) => !diffedKeys.has(key))
    )
  );
}

export function pickLinkProps(link: { [key: string]: any }) {
  const keys = Object.keys(link);
  const ariaKeys = keys.filter((key) => key.startsWith("aria-"));
  const dataKeys = keys.filter((key) => key.startsWith("data-"));
  return reactivePick(link, ...[...linkKeys, ...ariaKeys, ...dataKeys]);
}
