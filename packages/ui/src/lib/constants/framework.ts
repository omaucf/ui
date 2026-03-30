import { ROUTER_KEYS } from "./ui.js";

export const RUNTIME_KEYS = ["react", "vue"] as const;

export const COMMON_ADAPTERS = ["core", ROUTER_KEYS[0], "router"] as const;

export const CUSTOM_ADAPTERS = {
  REACT: ["next", ROUTER_KEYS[1]],
  VUE: ["nuxt", ROUTER_KEYS[1]],
} as const;

export const ADAPTER_KEYS = [
  ...COMMON_ADAPTERS,
  CUSTOM_ADAPTERS.REACT[0],
  CUSTOM_ADAPTERS.VUE[0],
  ROUTER_KEYS[1],
] as const;
