import { UContainer, ULink } from "#build/ui/components";

import { createFileRoute } from "@tanstack/solid-router";

export const Route = createFileRoute("/playground")({
  component: Home,
  head: () => ({
    meta: [{ title: "Veehance UI" }],
  }),
});

function Home() {
  return (
    <UContainer class="flex flex-col items-center justify-center gap-8 lg:grow">
      <div class="flex gap-2">
        <ULink to="/">Go Back</ULink>
      </div>
    </UContainer>
  );
}
