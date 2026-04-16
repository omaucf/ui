import { createProgram } from "./program.js";

process.on("SIGINT", () => process.exit(0));
process.on("SIGTERM", () => process.exit(0));

export function main() {
  const program = createProgram();
  program.parse();
}
