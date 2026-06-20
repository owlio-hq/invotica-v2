// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// NOTE: We ship a fully STATIC site (output: 'static') for the lightest possible
// payload and best Lighthouse scores. The contact form is handled client-side via
// Web3Forms, so no SSR/serverless runtime is needed. Netlify serves /dist directly
// (see netlify.toml). If/when auth or payments require server routes, add the
// @astrojs/netlify adapter + `output: 'server'` on those routes only.
export default defineConfig({
  site: "https://invotica.com",
  output: "static",
  prefetch: {
    prefetchAll: true,
    defaultStrategy: "viewport",
  },
  integrations: [react(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
