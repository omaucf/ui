import "../styles.css";

import type { ReactNode } from "react";

import { cn } from "@veehance/core/utils";
import { App } from "@veehance/react/app";

import { GeistMono as mono } from "geist/font/mono";
import { GeistSans as sans } from "geist/font/sans";

function Layout({ children }: { children: ReactNode }) {
  return (
    <html
      className={cn(sans.variable, mono.variable)}
      dir="ltr"
      lang="en"
      suppressHydrationWarning
    >
      <body className="isolate">
        <App>{children}</App>
      </body>
    </html>
  );
}

export default Layout;
