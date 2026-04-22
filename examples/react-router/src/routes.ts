import { index, type RouteConfig, route } from "@react-router/dev/routes";

export default [
  index("app/index.tsx"),
  route("playground", "app/playground.tsx"),
] satisfies RouteConfig;
