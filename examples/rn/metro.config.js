const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const { withUniwindConfig } = require("uniwind/metro");

// biome-ignore lint/correctness/noGlobalDirnameFilename: safe_to_set
const config = mergeConfig(getDefaultConfig(__dirname), {});

module.exports = withUniwindConfig(config, {
  cssEntryFile: "./src/global.css",
  dtsFile: "./uniwind-env.d.ts",
});
