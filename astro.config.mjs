import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  output: 'server', // Enable server-side rendering
  integrations: [
    tailwind()
  ],
});
