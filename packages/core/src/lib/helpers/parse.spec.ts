import { describe, expect, it } from "vitest";

import { parseFramework, parseRouter } from "./parse.js";

describe("#parseFramework", () => {
  it.each([
    ["react:next", { runtime: "react", adapter: "next" }],
    ["svelte:kit", { runtime: "svelte", adapter: "kit" }],
    ["vue:nuxt", { runtime: "vue", adapter: "nuxt" }],
  ] as const)("parse %s framework", (adapter, router) => {
    expect(parseFramework(adapter)).toStrictEqual({ ...router, features: {} });
  });
});

describe("#parseRouter", () => {
  it.each([
    ["core", false],
    ["inertia", "inertia"],
    ["kit", null],
    ["next", null],
    ["nuxt", null],
    ["router", true],
    ["start", "start"],
  ] as const)("parse %s router", (adapter, router) => {
    expect(parseRouter(adapter)).toBe(router);
  });
});
