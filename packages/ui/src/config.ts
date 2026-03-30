import { readFileSync } from "node:fs";
import { join } from "node:path";

import { resolveConfig } from "./lib/helpers/ui.js";
import { rawConfigSchema } from "./lib/schemas/config.js";
import type { Config, Raw } from "./lib/types/schema.js";

export function getConfig(cwd: string): Config | null {
  return resolveConfig(getRawConfig(cwd));
}

export function getRawConfig(cwd: string): Raw | null {
  const configPath = join(cwd, "ui.json");
  try {
    const contents = readFileSync(configPath, "utf8");
    return rawConfigSchema.parse(JSON.parse(contents));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    if (error instanceof Error) throw error;
    throw new Error(`Invalid configuration found in ${configPath}.`);
  }
}
