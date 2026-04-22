import type { JSX } from "solid-js";
import { HydrationScript } from "solid-js/web";

import { UColorMode, UIcon, ULink, UMain } from "#build/ui/components";

import { createRootRouteWithContext, HeadContent, Outlet, Scripts } from "@tanstack/solid-router";
import { TanStackRouterDevtools } from "@tanstack/solid-router-devtools";

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
        <header class="sticky top-0 z-50 h-(--ui-header-height) border-default border-b bg-default/75 backdrop-blur">
          <div class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <ULink class="font-semibold text-highlighted text-lg hover:text-primary" to="/">
              Veehance UI
            </ULink>

            <UIcon class="size-6" name="menu" />
          </div>
        </header>

        <UMain class="flex flex-col items-center justify-center">
          <Outlet />
        </UMain>
      </UColorMode>
    </RootDocument>
  ),
});

function RootDocument(props: { children: JSX.Element }) {
  return (
    <html dir="ltr" lang="en">
      <head>
        <HeadContent />
        <HydrationScript />
      </head>
      <body class="isolate">
        {props.children}

        <TanStackRouterDevtools position="bottom-left" />

        <Scripts />
      </body>
    </html>
  );
}
