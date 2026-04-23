import ui, { type Options } from "./vite";

export type ModuleOptions = Omit<Options, "router">;
export default (options?: ModuleOptions) =>
  ui({
    ...options,
    dts: { ...options?.dts, output: options?.dts?.output ?? "generated" },
    router: null,
  });
