import "virtual:uno.css";
import "./styles.css";

import { render } from "solid-js/web";

import { UColorMode, UIcon, ULink, UMain } from "#build/ui/components";

import Routes from "./routes";

const rootElement = window.document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

render(
  () => (
    <UColorMode>
      <header class="sticky top-0 z-50 h-[var(--ui-header-height)] border-default border-b bg-default/75 backdrop-blur">
        <div class="mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <ULink class="font-semibold text-highlighted text-lg hover:text-primary" to="/">
            Veehance UI
          </ULink>

          <UIcon class="size-6" name="menu" />
        </div>
      </header>

      <UMain class="flex flex-col items-center justify-center">
        <Routes />
      </UMain>
    </UColorMode>
  ),
  rootElement
);
