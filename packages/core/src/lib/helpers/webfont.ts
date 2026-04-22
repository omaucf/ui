import { isArray, isString } from "radashi";

import type { Config } from "@/types/schema.js";
import type { FontProvider } from "@/types/ui.js";

const DEFAULT_WEIGHTS = ["400", "500", "600", "700"];

type FontsConfig = Extract<NonNullable<Config["fonts"]>, object>;
type Font = NonNullable<FontsConfig["family"]>[string];

interface FontDefinition {
  name: string;
  provider?: FontProvider;
  weights: string[];
}

export function encodeWebFonts({ fonts }: Config) {
  // biome-ignore lint/complexity/useOptionalChain: safe_to_set
  if (!(fonts && fonts.family)) return [];
  return Object.values(fonts.family).flatMap((font) => {
    const definition = normalizeFont(font);
    const provider = definition.provider ?? fonts.provider;
    const encoded = encodeFamily(provider, definition.name, definition.weights);
    return encoded ? [encoded] : [];
  });
}

function normalizeFont(font: Font): FontDefinition {
  if (isString(font)) {
    const [name, rawWeights] = font.split(":");

    return {
      name,
      weights: rawWeights ? rawWeights.split(",") : DEFAULT_WEIGHTS,
    };
  }

  if (isArray(font)) {
    const [name, ...weights] = font;

    return {
      name,
      weights: weights.length ? weights.map(String) : DEFAULT_WEIGHTS,
    };
  }

  return {
    name: font.name,
    provider: font.provider,
    weights: font.weights?.map(String) ?? DEFAULT_WEIGHTS,
  };
}

function encodeFamily(
  provider: FontProvider | undefined,
  name: string,
  weights: string[]
) {
  switch (provider) {
    case "bunny":
      return encodeBunnyFamily(name, weights);
    case "coollabs":
      return encodeCoollabsFamily(name, weights);
    case "google":
      return encodeGoogleFamily(name, weights);
    case "fontshare":
      return encodeFontshareFamily(name, weights);
    default:
      return null;
  }
}

function encodeBunnyFamily(name: string, weights: string[]) {
  const family = name.toLowerCase().replaceAll(" ", "-");
  return `https://fonts.bunny.net/css?family=${family}:${weights.join(",")}&display=swap`;
}

function encodeCoollabsFamily(name: string, weights: string[]) {
  const family = name.replaceAll(" ", "+");
  return `https://api.fonts.coollabs.io/css2?family=${family}:wght@${weights.join(";")}&display=swap`;
}

function encodeGoogleFamily(name: string, weights: string[]) {
  const family = name.replaceAll(" ", "+");
  return `https://fonts.googleapis.com/css2?family=${family}:wght@${weights.join(";")}&display=swap`;
}

function encodeFontshareFamily(name: string, weights: string[]) {
  const family = name.toLowerCase().replaceAll(" ", "-");
  return `https://api.fontshare.com/v2/css?f[]=${family}@${weights.join(",")}&display=swap`;
}
