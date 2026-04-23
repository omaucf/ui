import { readFileSync } from "node:fs";
import { join } from "node:path";

import { resolveConfig } from "./lib/helpers/index.js";
import { rawSchema } from "./lib/schemas/index.js";
import type { Config, Raw } from "./lib/types/index.js";

export function getConfig(cwd: string): Config | null {
  return resolveConfig(getRaw(cwd));
}

export function getRaw(cwd: string): Raw | null {
  const configPath = join(cwd, "ui.json");
  try {
    const contents = readFileSync(configPath, "utf8");
    return rawSchema.parse(JSON.parse(contents));
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    if (error instanceof Error) throw error;
    throw new Error(`Invalid configuration found in ${configPath}.`);
  }
}
