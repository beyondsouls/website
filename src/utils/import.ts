import path from "path";

export function dynamicViteArtistAssetImport(imageFileName: string) {
  const filename = path.parse(imageFileName);

  const name = filename.name;
  const ext = filename.ext;

  switch (ext) {
    case ".webp":
      return import(/* @vite-ignore */ `../images/artist/${name}.webp`);
    case ".jpg":
      return import(/* @vite-ignore */ `../images/artist/${name}.jpg`);
    case ".png":
      return import(/* @vite-ignore */ `../images/artist/${name}.png`);
    case ".svg":
      return import(/* @vite-ignore */ `../images/artist/${name}.svg`);
    case ".gif":
      return import(/* @vite-ignore */ `../images/artist/${name}.gif`);
    case ".avif":
      return import(/* @vite-ignore */ `../images/artist/${name}.avif`);
    case ".jpeg":
      return import(/* @vite-ignore */ `../images/artist/${name}.jpeg`);
    default:
      return import(/* @vite-ignore */ `../images/artist/${name}.jpg`);
  }
}

export function dynamicViteReleaseCoverAssetImport(imageFileName: string) {
  const filename = path.parse(imageFileName);

  const name = filename.name;
  const ext = filename.ext;

  switch (ext) {
    case ".webp":
      return import(/* @vite-ignore */ `../images/releases/${name}.webp`);
    case ".jpg":
      return import(/* @vite-ignore */ `../images/releases/${name}.jpg`);
    case ".png":
      return import(/* @vite-ignore */ `../images/releases/${name}.png`);
    case ".svg":
      return import(/* @vite-ignore */ `../images/releases/${name}.svg`);
    case ".gif":
      return import(/* @vite-ignore */ `../images/releases/${name}.gif`);
    case ".avif":
      return import(/* @vite-ignore */ `../images/releases/${name}.avif`);
    case ".jpeg":
      return import(/* @vite-ignore */ `../images/releases/${name}.jpeg`);
    default:
      return import(/* @vite-ignore */ `../images/releases/${name}.jpg`);
  }
}
