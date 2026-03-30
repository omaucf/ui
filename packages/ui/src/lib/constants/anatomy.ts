export const UI_PKG_ANATOMY = Object.freeze({
  NAME: "@veehance/ui",
  SHARED: [
    "@iconify/utils",
    "defu",
    "radash",
    "scule",
    "tailwind-variants",
    "zod",
  ],
});

export const REACT_PKG_ANATOMY = Object.freeze({
  NAME: "@veehance/react",
  OPTIMIZE: ["@unhead/react/client"],
  SHARED: ["@unhead/react"],
  VITE: [],
});

export const VUE_PKG_ANATOMY = Object.freeze({
  NAME: "@veehance/vue",
  OPTIMIZE: ["@unhead/vue/client"],
  SHARED: ["@unhead/vue"],
  VITE: ["hookable"],
});
