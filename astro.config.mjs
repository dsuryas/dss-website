// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // site: 'https://yoursite.com', // Replace with your actual domain
  // Optional: Use the following if you plan to deploy to Github Pages
  site: "https://dsuryas.github.io/",
  base: "/dss-website",
  integrations: [],
  markdown: {
    shikiConfig: {
      theme: "dracula",
      wrap: true,
    },
  },
  vite: {
    ssr: {
      noExternal: ["path-to-any-problematic-packages"],
    },
  },
});
