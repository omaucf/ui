export const COMMON_ADAPTERS = ["core", "router", "inertia"] as const;

export const CUSTOM_ADAPTERS = {
  react: ["next", "start"],
  svelte: ["kit"],
  vue: ["nuxt", "start"],
} as const;

export const ADAPTER_KEYS = [
  ...COMMON_ADAPTERS,
  "kit",
  "next",
  "nuxt",
  "start",
] as const;

export const RUNTIME_KEYS = ["react", "svelte", "vue"] as const;
