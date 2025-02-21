import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import netlify from "@astrojs/netlify";

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify({
    edgeMiddleware: true // Enable edge middleware
  }),
  integrations: [
    tailwind()
  ]
});
