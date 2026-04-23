import "./styles.css";

import { mount } from "svelte";

import App from "./app.svelte";

mount(App, {
  // biome-ignore lint/style/noNonNullAssertion: safe_to_set
  target: document.getElementById("app")!,
});
