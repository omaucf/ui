const dts = {
  autoImport: false,
  components: false,
  output: "./generated",
  prefix: "u",
};

const tailwind = {
  strategy: "merge" as const,
  css: "./src/styles.css",
  cssVariables: true,
  inlines: [],
  plugins: [],
  sources: [],
};

const theme = {
  colors: undefined,
  defaultVariants: { color: "primary", size: "md" } as const,
  iconset: "lucide" as const,
  preset: "luna" as const,
  transitions: true,
};

const ui = {
  colors: {
    primary: "emerald",
    secondary: "cyan",
    success: "green",
    info: "blue",
    warning: "yellow",
    error: "red",
  },
};

export default {
  dts,
  colorMode: true,
  content: false,
  fonts: true,
  icon: true,
  image: true,
  locale: false,
  prose: false,
  router: false,
  tailwind,
  theme,
  ui,
};
