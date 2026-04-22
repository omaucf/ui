const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

// biome-ignore lint/correctness/noGlobalDirnameFilename: safe_to_set
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config);
