import { getCollection, type CollectionEntry, getEntries } from "astro:content";
import { ImageResponse } from "@vercel/og";
import { formatArtistNames } from "@/utils/format";
import { getOgImageFile, ogLogoUrl } from "@utils/og";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

interface Props {
  params: { slug: string };
  props: { post: CollectionEntry<"release"> };
}

const ROOT_URL = new URL("../../../", import.meta.url).toString();

export async function GET({ props }: Props) {
  const { post } = props;

  const artists = await getEntries(post.data.artists);
  const artistNames = formatArtistNames(artists);

  // const releaseImage = getOgImageFile(post.data.cover.src);
  // const fsImagePath = post.data.cover.src.replace("/@fs", "").split("?")[0];
  // const releaseImage2 = readFileSync(fsImagePath);

  const html = {
    type: "div",
    props: {
      children: [
        {
          key: "icon",
          type: "img",
          props: {
            src: ogLogoUrl,
            tw: "absolute left-[40px] top-[40px]",
            width: 80,
            height: 100,
            style: {
              width: 80,
              height: 100,
            },
          },
        },
        // {
        //   key: "cover-wrapper",
        //   type: "div",
        //   props: {
        //     style: {
        //       display: "flex",
        //       background: "#f6f6f6",
        //       width: "200px",
        //       height: "200px",
        //       flexDirection: "column",
        //       justifyContent: "center",
        //       alignItems: "center",
        //     },
        //     children: [
        //       {
        //         type: "img",
        //         props: {
        //           src: releaseImage2.buffer,
        //         },
        //       },
        //     ],
        //   },
        // },
        {
          key: "title",
          type: "div",
          props: {
            tw: "pl-10 shrink text-center flex flex-col justify-center",
            children: [
              {
                type: "div",
                tw: "font-bold",
                props: {
                  style: {
                    fontSize: "100px",
                    fontWeight: "800",
                  },
                  children: post.data.title,
                },
              },
              {
                type: "div",
                props: {
                  style: {
                    fontSize: "40px",
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
        fontFamily: "sans-serif",
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
