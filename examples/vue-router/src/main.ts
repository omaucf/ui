import "virtual:uno.css";
import "./styles.css";

import { createApp } from "vue";

import ui from "@veehance/vue/plugin";

import { createRouter, createWebHistory } from "vue-router";

import App from "./app.vue";
import HomePage from "./pages/index.vue";
import PlaygroundPage from "./pages/playground.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { component: HomePage, path: "/" },
    { component: PlaygroundPage, path: "/playground" },
  ],
});

const app = createApp(App);

app.use(router);
app.use(ui);

app.mount("#app");
