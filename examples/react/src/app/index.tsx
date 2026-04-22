import { UContainer, UIcon, UImage, ULink } from "#build/ui/components";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Page,
  head: () => ({
    meta: [{ title: "Veehance UI" }],
  }),
});

function Page() {
  return (
    <UContainer className="flex flex-col items-center justify-center gap-8 lg:grow">
      <div className="flex gap-2">
        <UImage alt="Framework" height={64} src="/favicon.png" width={64} />
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
      <div className="flex gap-2">
        <UIcon className="size-5" name="dark" />
        <UIcon className="size-5" name="light" />
        <UIcon className="size-5" name="system" />
        <UIcon className="size-5" name="iconify lucide--user" />
      </div>
      <div className="flex gap-2">
        <ULink to="/playground">Go to Playground</ULink>
      </div>
    </UContainer>
  );
}
