import { Command } from "commander";

import pkg from "../package.json" with { type: "json" };
import draft from "./commands/draft.js";

export function createProgram() {
  return new Command()
    .name("iueev")
    .description("add resources to your project")
    .version(pkg.version, "-v, --version", "display the version number")
    .addCommand(draft);
}
