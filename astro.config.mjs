// @ts-check
import { defineConfig } from "astro/config";

// https://astro.build/config
export default defineConfig({
  // Optional: Use the following if you plan to deploy to Github Pages
  site: "https://dsuryas.github.io/", // Put with your actual domain
  base: "/dss-website", // This should match your repository name
  outDir: "./dist", // This is the default output directory
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
