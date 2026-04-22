import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { join } from "node:path";

import { defineConfig } from "@/functions/config.js";
import { rawSchema } from "@/schemas/config.js";
import type { Config, Raw } from "@/types/schema.js";

export function getConfig(cwd: string = process.cwd()): Config | null {
  const raw = getRawConfig(cwd);
  if (!raw) return null;
  return defineConfig(raw);
}

export function getConfigPath(cwd: string) {
  for (const file of [
    "ui.config.cjs",
    "ui.config.js",
    "ui.config.mts",
    "ui.config.mjs",
    "ui.config.ts",
    "ui.js",
    "ui.json",
    "ui.jsonc",
    "ui.ts",
  ]) {
    const path = join(cwd, file);
    if (existsSync(path)) return path;
  }

  return null;
}

export function getRawConfig(cwd: string = process.cwd()): Raw | null {
  const configPath = getConfigPath(cwd);
  if (!configPath) return null;
  return loadConfigSync(configPath);
}

export function getUnoConfigPath(root: string) {
  for (const file of [
    "uno.config.ts",
    "uno.config.mts",
    "uno.config.mjs",
    "uno.config.js",
  ]) {
    const path = join(root, file);
    if (existsSync(path)) return path;
  }

  return null;
}

function loadConfigSync(path: string): Raw {
  const require = createRequire(import.meta.url);
  const ext = path.split(".").pop();

  try {
    if (path.endsWith(".json") || path.endsWith(".jsonc"))
      return rawSchema.parse(
        parseJson(readFileSync(path, "utf8"), ext === "jsonc")
      );
    if (path.endsWith(".js") || path.endsWith(".cjs"))
      return rawSchema.parse(require(path).default ?? require(path));

    throw new Error(`Unsupported config format: ${path}`);
  } catch (err) {
    if (err instanceof Error)
      throw new Error(`Failed to load config at ${path}: ${err.message}`, {
        cause: err,
      });
    throw new Error(`Failed to load config at ${path}`, { cause: err });
  }
}

function parseJson(input: string, isJsonc: boolean) {
  if (!isJsonc) return JSON.parse(input);
  const stripped = input
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .replace(/\/\/.*$/gm, "");
  return JSON.parse(stripped);
}
