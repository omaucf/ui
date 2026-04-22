import { UContainer, ULink } from "#build/ui/components";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/playground")({
  component: Page,
  head: () => ({
    meta: [{ title: "Playground | Veehance UI" }],
  }),
});

function Page() {
  return (
    <UContainer className="flex flex-col items-center justify-center gap-8 lg:grow">
      <div className="flex gap-2">
        <ULink to="/">Go Back</ULink>
      </div>
    </UContainer>
  );
}
