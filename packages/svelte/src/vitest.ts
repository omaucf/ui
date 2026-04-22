import "@testing-library/svelte/vitest";
import { expect } from "vitest";

// biome-ignore lint/performance/noNamespaceImport: safe_to_set
import * as axeMatchers from "vitest-axe/matchers";

expect.extend(axeMatchers);
