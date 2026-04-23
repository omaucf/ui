import ui from "@veehance/react/vite";

import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [reactRouter(), ui()],
  server: {
    host: process.env.HOST,
    port: Number(process.env.PORT),
  },
});
