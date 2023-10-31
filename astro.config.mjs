import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

// import compress from "astro-compress";

// https://astro.build/config
export default defineConfig({
  site: "https://beyond-souls.com",
  output: "static",
  build: {
    format: "file",
  },
  integrations: [
    sitemap({
      changefreq: "monthly",
      priority: 0.9,
      lastmod: new Date(),
    }),
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    // import.meta.env.MODE === "production" ? compress() : null,
  ],
  vite: {
    ssr: {
      noExternal: ["@radix-ui/*", "react-icons", "react-icons/*"],
    },
  },
});
