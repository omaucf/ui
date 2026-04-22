export const COMMON_ADAPTERS = ["core", "router", "inertia"] as const;

export const CUSTOM_ADAPTERS = {
  react: ["next", "start"],
  solid: ["start"],
  svelte: ["kit"],
  vue: ["nuxt", "start"],
} as const;

export const ROUTER_KEYS = ["inertia", "kit", "next", "nuxt", "start"] as const;

export const ADAPTER_KEYS = ["core", "router", ...ROUTER_KEYS] as const;

export const RUNTIME_KEYS = ["react", "solid", "svelte", "vue"] as const;
