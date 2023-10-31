import { getCollection, type CollectionEntry, getEntries } from "astro:content";
import { ImageResponse } from "@vercel/og";
import { formatArtistNames } from "@/utils/format";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"release"> };
}

export async function GET({ props }: Props) {
  const { post } = props;

  const artists = await getEntries(post.data.artists);
  const artistNames = formatArtistNames(artists);

  // post cover with Image is pretty tricky for dev and build phase
  //   const postCover = fs.readFileSync(
  //     process.env.NODE_ENV === "development"
  //       ? path.resolve(
  //           post.data.cover.src.replace(/\?.*/, "").replace("/@fs", ""),
  //         )
  //       : path.resolve(post.data.cover.src.replace("/", "dist/")),
  //   );

  // Astro doesn't support tsx endpoints so usign React-element objects
  const html = {
    type: "div",
    props: {
      children: [
        {
          key: "icon",
          type: "img",
          props: {
            src: `http://localhost:4321/imprint.svg`,
            tw: "absolute left-[40px] top-[40px]",
            width: 80,
            height: 100,
            style: {
              width: 80,
              height: 100,
            },
          },
        },
        {
          key: "title",
          type: "div",
          props: {
            tw: "pl-10 shrink text-center flex flex-col",
            children: [
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "48px",
                    fontWeight: "bold",
                  },
                  children: post.data.title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "30px",
                  },
                  children: `by ${artistNames}`,
                },
              },
            ],
          },
        },
        {
          key: "note",
          type: "div",
          props: {
            tw: "absolute right-[40px] bottom-[40px] flex items-center",
            children: [
              {
                key: "brand",
                type: "div",
                props: {
                  tw: "text-xl",
                  style: {
                    fontWeight: 800,
                  },
                  children: "© Beyond Souls Records",
                },
              },
              // {
              //   key: "sep",
              //   type: "div",
              //   props: {
              //     tw: "px-2 text-3xl",
              //     style: {
              //       fontSize: "30px",
              //     },
              //     children: "|",
              //   },
              // },
              // {
              //   key: "sublabel",
              //   type: "div",
              //   props: {
              //     tw: "text-3xl",
              //     children: "Catalog",
              //   },
              // },
            ],
          },
        },
      ],
      tw: "w-full h-full flex items-center justify-center relative px-22",
      style: {
        background: "#000000",
        color: "#ffffff",
        fontFamily: "DM Sans Regular",
      },
    },
  };

  // @ts-expect-error
  return new ImageResponse(html, {
    width: 1200,
    height: 600,
  });
}

// to generate an image for each blog posts in a collection
export async function getStaticPaths() {
  const blogPosts = await getCollection("release");
  return blogPosts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}
