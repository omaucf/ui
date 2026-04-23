import "@testing-library/svelte/vitest";

import { JSDOM } from "jsdom";

const { window } = new JSDOM();
Object.assign(global, { window, document: window.document });
