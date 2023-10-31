import type { CollectionEntry } from "astro:content";

export const formatArtistNames = (artists: CollectionEntry<"artist">[]) => {
  if (artists.length === 1) {
    return artists[0].data.name;
  }

  const artistsCopy = [...artists];
  const lastEntry = artistsCopy.pop();
  const artistNames = artistsCopy.map((artist) => artist.data.name).join(", ");

  return `${artistNames} & ${lastEntry?.data.name}`;
};

export const formatReleaseType = (
  releaseType: CollectionEntry<"release">["data"]["type"],
) => {
  switch (releaseType) {
    case "single":
      return "Single";
    case "ep":
      return "EP";
    case "album":
      return "Album";
    case "remixes":
      return "Remixes";
    default:
      return "";
  }
};
