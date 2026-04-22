import type { Route } from "./+types/playground";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Playground | Veehance UI" }];
}

export default function Home() {
  return (
    <UContainer className="flex flex-col items-center justify-center gap-8 lg:grow">
      <div className="flex gap-2">
        <ULink to="/">Go Back</ULink>
      </div>
    </UContainer>
  );
}
