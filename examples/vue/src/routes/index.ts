import { createFileRoute } from "@tanstack/vue-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [{ title: "Veehance UI" }],
  }),
});
