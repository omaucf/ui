import "../styles.css";

import { UColorMode, UIcon, ULink, UMain } from "#build/ui/components";
import { cx } from "#build/ui/utils";

import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next/types";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const mono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html dir="ltr" lang="en" suppressHydrationWarning>
      <body className={cx("isolate", sans.variable, mono.variable)}>
        <UColorMode>
          <header className="sticky top-0 z-50 h-[var(--ui-header-height)] border-default border-b bg-default/75 backdrop-blur">
            <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
              <ULink className="font-semibold text-highlighted text-lg hover:text-primary" to="/">
                Veehance UI
              </ULink>

              <UIcon className="size-6" name="menu" />
            </div>
          </header>

          <UMain className="flex flex-col items-center justify-center">{children}</UMain>
        </UColorMode>
      </body>
    </html>
  );
}

export default Layout;
