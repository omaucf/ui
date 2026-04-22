export const CONFIG_DEFAULTS = {
  colorMode: true,
  dts: {
    app: undefined,
    autoImport: false,
    components: false,
    detection: false,
    detectionPatterns: undefined,
    output: "./node_modules/.veehance",
    prefix: "u",
    prefixNamespaces: true,
    workspace: false,
  },
  fonts: true,
  icons: true,
  image: true,
  style: {
    baseColor: "zinc" as const,
    css: undefined,
    cssVariables: true,
    engine: "tailwind" as const,
    prefix: "",
    safelist: undefined,
    sources: undefined,
  },
  theme: {
    colors: undefined,
    iconset: "lucide" as const,
    preset: "vega" as const,
    transitions: true,
    unstyled: false,
  },
  ui: {
    colors: {
      error: "red",
      info: "blue",
      primary: "emerald",
      secondary: "cyan",
      success: "green",
      warning: "yellow",
    },
    strategy: {
      merge: true,
      options: { prefix: "" },
    },
  },
};

export const FEATURE_DEFAULTS = {
  colorMode: {
    enableColorScheme: false,
    enableSystem: true,
    fallback: "light" as const,
    preference: "system" as const,
    storageKey: "ui-theme",
  },
  fonts: {
    family: undefined,
    provider: "none" as const,
  },
  icons: {
    collections: undefined,
    collectionsNames: undefined,
    mode: "auto" as const,
    prefix: "iconify",
    scale: 1,
    unit: "em",
  },
  image: {
    provider: "none" as const,
  },
  locale: {
    dir: "ltr" as const,
    lang: "en-US",
  },
  prose: {
    headings: {
      anchorLinks: {
        h2: true,
        h3: true,
        h4: true,
      },
    },
  },
};
