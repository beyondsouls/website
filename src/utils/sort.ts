import type { CollectionEntry } from "astro:content";

export const sortByReleaseDate = (
  a: CollectionEntry<"release">,
  b: CollectionEntry<"release">,
) => b.data.releaseDate.valueOf() - a.data.releaseDate.valueOf();

export const sortByJoinDate = (
  a: CollectionEntry<"artist">,
  b: CollectionEntry<"artist">,
) => b.data.joinDate.valueOf() - a.data.joinDate.valueOf();
