function createExports(helpers, config) {
  const map = {};

  const apply = (entries, fn) => {
    for (const name of entries || []) Object.assign(map, fn?.(name));
  };

  apply(config.dirsNoIndex, helpers.dirNoIndex);
  apply(config.dirs, helpers.dir);
  apply(config.components, helpers.component);
  apply(config.composables, helpers.composable);
  apply(config.providers, helpers.provider);
  apply(config.lib, helpers.lib);

  Object.assign(map, config.custom || {});
  apply(config.files, helpers.file);

  const sortablePrefixes = [
    ...(config.components || []),
    ...(config.composables || []),
  ].map((k) => `./${k}`);

  const isSortable = (key) =>
    sortablePrefixes.some((prefix) => key.startsWith(prefix));

  const sortable = [];
  const rest = [];

  for (const entry of Object.entries(map)) {
    (isSortable(entry[0]) ? sortable : rest).push(entry);
  }

  sortable.sort(([a], [b]) => a.localeCompare(b));
  return Object.fromEntries([
    ...rest.filter(([k]) => k === "."),
    ...sortable,
    ...rest.filter(([k]) => k !== "."),
  ]);
}

function createHelpers(fmt, options = {}) {
  const {
    lib: libRoot = "lib",
    components = joinPath(libRoot, "components"),
    composables = joinPath(libRoot, "composables"),
    providers = joinPath(libRoot, "providers"),
    suffix: libSuffix = libRoot,
  } = options;

  const file = (name, path) => ({
    [`./${name}`]: importPath(fmt(path ?? name)),
  });

  const lib = (name) => ({
    [`./${name}`]: fmt(joinPath(libRoot, name, "index")),
    [`./${name}/*`]: fmt(joinPath(libRoot, name, "*")),
  });

  const component = (name, suffix) => ({
    [`./${suffix ? joinPath(name, libSuffix) : name}`]: fmt(
      joinPath(components, name, "index")
    ),
  });

  const composable = (name, suffix) => ({
    [`./${suffix ? joinPath(name, libSuffix) : name}`]: fmt(
      joinPath(composables, name)
    ),
  });

  const provider = (name) => ({
    [`./${name}`]: fmt(joinPath(providers, name, "index")),
  });

  const dir = (name) => ({
    [`./${name}`]: fmt(joinPath(name, "index")),
    [`./${name}/*`]: fmt(joinPath(name, "*")),
  });

  const dirNoIndex = (name) => ({ [`./${name}/*`]: fmt(joinPath(name, "*")) });

  return {
    file,
    lib,
    component,
    composable,
    provider,
    dir,
    dirNoIndex,
  };
}

function importPath(value) {
  return typeof value === "string" ? value : value.import;
}

function joinPath(...parts) {
  return parts.filter(Boolean).join("/");
}

export { createExports, createHelpers };
