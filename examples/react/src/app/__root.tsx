import { UColorMode, UIcon, ULink, UMain } from "#build/ui/components";

import { TanStackDevtools } from "@tanstack/react-devtools";
import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";

import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext()({
  head: () => ({
    links: [
      { href: appCss, rel: "stylesheet" },
      { href: "/favicon.png", rel: "icon", type: "image/png" },
    ],
    meta: [
      { charSet: "utf-8" },
      { content: "width=device-width, initial-scale=1", name: "viewport" },
    ],
  }),
  shellComponent: () => (
    <RootDocument>
      <UColorMode>
        <header className="sticky top-0 z-50 h-(--ui-header-height) border-default border-b bg-default/75 backdrop-blur">
          <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <ULink className="font-semibold text-highlighted text-lg hover:text-primary" to="/">
              Veehance UI
            </ULink>

            <UIcon className="size-6" name="menu" />
          </div>
        </header>

        <UMain className="flex flex-col items-center justify-center">
          <Outlet />
        </UMain>
      </UColorMode>
    </RootDocument>
  ),
});

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body className="isolate">
        {children}

        <TanStackDevtools
          config={{ position: "bottom-left" }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />

        <Scripts />
      </body>
    </html>
  );
}
