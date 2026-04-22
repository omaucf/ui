import "virtual:uno.css";
import "./styles.css";

import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";

export const links: Route.LinksFunction = () => [
  { href: "/favicon.png", rel: "icon", type: "image/png" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      {/** biome-ignore lint/style/noHeadElement: safe_to_set */}
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body className="isolate">
        <UColorMode>{children}</UColorMode>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function Root() {
  return (
    <>
      <header className="sticky top-0 z-50 h-[var(--ui-header-height)] border-default border-b bg-default/75 backdrop-blur">
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
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404 ? "The requested page could not be found." : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container mx-auto p-4 pt-16">
      <h1>{message}</h1>
      <p>{details}</p>
      {/** biome-ignore lint/suspicious/noLeakedRender: safe_to_set */}
      {stack && (
        <pre className="w-full overflow-x-auto p-4">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
