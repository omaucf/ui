import { describe, expect, it } from "vitest";

import { parseFramework, parseRouter } from "./parse.js";

describe("#parseFramework", () => {
  it.each([
    ["react:next", { adapter: "next", runtime: "react" }],
    ["solid:start", { adapter: "start", runtime: "solid" }],
    ["svelte:kit", { adapter: "kit", runtime: "svelte" }],
    ["vue:nuxt", { adapter: "nuxt", runtime: "vue" }],
  ] as const)("parse %s framework", (adapter, router) => {
    expect(parseFramework(adapter)).toStrictEqual({ ...router, features: {} });
  });
});

describe("#parseRouter", () => {
  it.each([
    ["core", false],
    ["inertia", "inertia"],
    ["kit", "kit"],
    ["next", "next"],
    ["nuxt", "nuxt"],
    ["router", true],
    ["start", "start"],
  ] as const)("parse %s router", (adapter, router) => {
    expect(parseRouter(adapter)).toBe(router);
  });
});
