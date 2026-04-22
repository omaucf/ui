import "virtual:uno.css";
import "./styles.css";

import { mount } from "svelte";

import App from "./app.svelte";

export default mount(App, {
  target: document.getElementById("app")!,
});
