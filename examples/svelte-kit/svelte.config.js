import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
  compilerOptions: { runes: true },
  kit: { adapter: adapter(), alias: { "#build/*": "./.veehance/*" } },
  preprocess: vitePreprocess(),
};
