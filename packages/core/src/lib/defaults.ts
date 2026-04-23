const dts = {
  autoImport: false,
  components: false,
  output: "./node_modules/.veehance",
  prefix: "u",
};

const tailwind = {
  baseColor: "zinc" as const,
  css: undefined,
  cssVariables: true,
  inlines: [],
  plugins: [],
  sources: [],
  strategy: "merge" as const,
};

const theme = {
  defaultVariants: { color: undefined, size: undefined },
  colors: undefined,
  iconset: "lucide" as const,
  preset: "vega" as const,
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
  components: { icon: { dynamic: false, size: 24 } },
  tw: { merge: true, options: { prefix: "" } },
};

export default {
  dts,
  colorMode: true,
  content: false,
  fonts: true,
  image: true,
  locale: false,
  prose: false,
  tailwind,
  theme,
  ui,
};
