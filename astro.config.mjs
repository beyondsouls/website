import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";

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
  ],
  vite: {
    ssr: {
      noExternal: ["@radix-ui/*", "react-icons", "react-icons/*"],
    },
  },
});
