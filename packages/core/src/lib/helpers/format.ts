export function isFormattedIcon(
  value: string,
  prefix: string,
  transform: boolean
) {
  const p = formatIconPrefix(prefix, transform);
  return transform ? value.startsWith(`${p} `) : value.startsWith(p);
}

export function formatIconName(
  value: string,
  prefix: string,
  transform: boolean
) {
  const p = formatIconPrefix(prefix, transform);
  return transform ? `${p} ${value.replace(":", "--")}` : `${p}${value}`;
}

function formatIconPrefix(prefix: string, transform: boolean) {
  const normalized = prefix.replace(/^-+|-+$/g, "");
  return transform ? normalized : `${normalized}-`;
}
