import { defineCollection, z, reference } from "astro:content";

const release = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      type: z.enum(["single", "ep", "album", "remixes"]),
      artists: z.array(reference("artist")),
      genre: z.string(),
      catalogNo: z.string(),
      eanNo: z.string(),
      releaseDate: z.string().transform((value) => new Date(value)),
      tracklist: z.array(reference("track")),
      masteringBy: reference("mastering-studio"),
      cover: image().refine((img) => img.width >= 1080, {
        message: "Cover image must be at least 1080 pixels wide!",
      }),
      coverDesignBy: reference("designer"),
      info: z.string(),
      purchase: z.optional(
        z.object({
          amazon: z.optional(z.string()),
          apple: z.optional(z.string()),
          beatport: z.optional(z.string()),
          juno: z.optional(z.string()),
          soundcloud: z.optional(z.string()),
          spotify: z.optional(z.string()),
          tidal: z.optional(z.string()),
          traxsource: z.optional(z.string()),
          youtube: z.optional(z.string()),
        }),
      ),
      recommended: z.optional(z.array(reference("release"))),
    }),
});

const track = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    version: z.string().default("Original Mix"),
    tempo: z.number(),
    genre: z.optional(z.string()),
  }),
});

const artist = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      country: z.string(),
      city: z.optional(z.string()),
      image: z.optional(image()),
      joinDate: z.string().transform((value) => new Date(value)),
      specialRole: z.optional(z.array(z.enum(["Founder", "A&R"]))),
      gender: z.enum(["non-binary", "male", "femal"]),
    }),
});

const masteringStudio = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    website: z.string(),
    engineer: z.string(),
  }),
});

const designer = defineCollection({
  type: "content",
  schema: z.object({
    name: z.string(),
    website: z.string(),
  }),
});

export const collections = {
  release,
  artist,
  track,
  designer,
  "mastering-studio": masteringStudio,
};
