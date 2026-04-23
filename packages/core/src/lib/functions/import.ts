import { reactBase, reactColorMode } from "../../plugin/react/imports.js";
import { svelteBase } from "../../plugin/svelte/imports.js";
import {
  vueBase,
  vueNuxtColorMode,
  vueNuxtCore,
  vueNuxtExtras,
} from "../../plugin/vue/imports.js";
import type { ImportEntry, ImportResolver } from "../types/template.js";
import type { Options } from "../types/ui.js";

export function generateImports(options: Options) {
  if (options.target === "react") return resolveReactImports(options);
  if (options.target === "svelte") return resolveSvelteImports(options);
  return resolveVueImports(options);
}

export function renderImportsFile(entries: ImportEntry[]) {
  return entries
    .map((e) => `export { ${e.names.join(", ")} } from '${e.from}'`)
    .join("\n");
}

function resolveReactImports(options: Options) {
  const entries = resolve([reactBase, reactColorMode], options);
  return renderImportsFile(entries);
}

function resolveSvelteImports(options: Options) {
  const entries = resolve([svelteBase], options);
  return renderImportsFile(entries);
}

function resolveVueImports(options: Options) {
  const entries =
    options.router === null
      ? resolve([vueNuxtCore, vueNuxtColorMode, vueNuxtExtras], options)
      : resolve([vueBase], options);
  return renderImportsFile(entries);
}

function resolve(resolvers: ImportResolver[], options: Options) {
  return resolvers.flatMap((r) => r(options));
}
