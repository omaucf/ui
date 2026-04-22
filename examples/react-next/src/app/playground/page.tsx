import { UContainer, ULink } from "#build/ui/components";

import type { Metadata } from "next";

export function generateMetadata(): Metadata {
  return { title: "Playground | Veehance UI" };
}

function Page() {
  return (
    <UContainer className="flex flex-col items-center justify-center gap-8 lg:grow">
      <div className="flex gap-2">
        <ULink to="/">Go Back</ULink>
      </div>
    </UContainer>
  );
}

export default Page;
