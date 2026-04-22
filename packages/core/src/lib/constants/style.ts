export const ENGINE_KEYS = ["tailwind", "unocss"] as const;

export const OUTLINE_KEYS = ["default", "inverted"] as const;

export const BORDER_KEYS = [...OUTLINE_KEYS, "accented", "muted"] as const;

export const BACKGROUND_KEYS = [...BORDER_KEYS, "elevated"] as const;

export const TEXT_KEYS = [
  ...BORDER_KEYS,
  "dimmed",
  "highlighted",
  "toned",
] as const;
