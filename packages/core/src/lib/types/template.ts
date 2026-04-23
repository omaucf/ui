import type { Options } from "./ui.js";

export interface ImportEntry {
  from: string;
  names: string[];
}

export type ImportResolver = (options: Options) => ImportEntry[];

export interface Template {
  filename: string;
  getContents: (...args: any[]) => string;
  write?: boolean;
}
