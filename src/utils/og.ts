import { readFileSync } from "node:fs";
import { resolve } from "node:path";

export const getOgImageFile = (src: string) =>
  readFileSync(
    process.env.NODE_ENV === "development"
      ? resolve(src.replace(/\?.*/, "").replace("/@fs", ""))
      : resolve(src.replace("/", "dist/")),
  );

export const ogLogoUrl = `https://beyond-souls.com/og-logo.svg`;
