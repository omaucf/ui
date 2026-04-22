import ui, { type PluginOptions } from "./vite.js";

export type ModuleOptions = Omit<PluginOptions, "router">;

export default (options?: ModuleOptions) => ui({ ...options, router: "kit" });
