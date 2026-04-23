import { Container } from "@veehance/react/container";
import { Main } from "@veehance/react/main";

import type { Route } from "./+types/index";

export function meta(_args: Route.MetaArgs) {
  return [{ title: "Veehance UI" }];
}

export default function Home() {
  return (
    <Main className="flex min-h-screen flex-col items-center justify-center">
      <Container className="flex flex-col items-center justify-center gap-8 lg:grow">
        <div className="flex gap-2">
          <img
            alt="Framework"
            height={64}
            src="https://logo.svgcdn.com/logos/react.png"
            width={64}
          />
        </div>
        <h1 className="font-bold text-5xl md:text-7xl">Veehance UI</h1>
        <div className="flex gap-2">
          <div className="size-8 rounded-xs border border-default bg-primary" />
          <div className="size-8 rounded-xs border border-default bg-secondary" />
          <div className="size-8 rounded-xs border border-default bg-default" />
          <div className="size-8 rounded-xs border border-default bg-muted" />
          <div className="size-8 rounded-xs border border-default bg-elevated" />
          <div className="size-8 rounded-xs border border-default bg-accented" />
          <div className="size-8 rounded-xs border border-default bg-inverted" />
          <div className="size-8 rounded-xs border border-default bg-success" />
          <div className="size-8 rounded-xs border border-default bg-info" />
          <div className="size-8 rounded-xs border border-default bg-warning" />
          <div className="size-8 rounded-xs border border-default bg-error" />
        </div>
        <div className="flex gap-2">
          <span className="text-dimmed">Dimmed</span>
          <span className="text-muted">Muted</span>
          <span className="text-toned">Toned</span>
          <span className="text-default">Default</span>
          <span className="text-highlighted">Highlighted</span>
        </div>
      </Container>
    </Main>
  );
}
