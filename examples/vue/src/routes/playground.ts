import { createFileRoute } from "@tanstack/vue-router";

export const Route = createFileRoute("/playground")({
  head: () => ({
    meta: [{ title: "Playground | Veehance UI" }],
  }),
});
