type ExportValue = string | { import: string; [key: string]: any };

declare function createExports(
  helpers: ReturnType<typeof createHelpers>,
  config: {
    components?: string[];
    composables?: string[];
    providers?: string[];
    lib?: string[];
    dirs?: string[];
    dirsNoIndex?: string[];
    files?: string[];
    custom?: Record<string, ExportValue>;
  }
): Record<string, ExportValue>;

declare function createHelpers(
  fmt: (path: string) => ExportValue,
  options?: {
    lib?: string;
    components?: string;
    composables?: string;
    providers?: string;
    suffix?: string;
  }
): {
  file: (name: string, path?: string) => Record<string, string>;
  lib: (name: string) => Record<string, ExportValue>;
  component: (name: string, suffix?: boolean) => Record<string, ExportValue>;
  composable: (name: string, suffix?: boolean) => Record<string, ExportValue>;
  provider: (name: string) => Record<string, ExportValue>;
  dir: (name: string) => Record<string, ExportValue>;
  dirNoIndex: (name: string) => Record<string, ExportValue>;
};

export { createExports, createHelpers };
