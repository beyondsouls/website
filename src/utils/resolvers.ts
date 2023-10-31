import { type CollectionEntry } from "astro:content";

export const resolveReleasesByArtist = (
  allReleases: CollectionEntry<"release">[],
  artistSlug: string,
) =>
  allReleases.filter((release) => {
    const artistsOfReleaseMatches = release.data.artists.filter(
      (info) => info.slug === artistSlug,
    );

    return artistsOfReleaseMatches.length > 0;
  });
