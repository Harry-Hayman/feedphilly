import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import compressor from "astro-compressor";
import mdx from "@astrojs/mdx";
import remarkGfm from 'remark-gfm';
import rehypePrism from 'rehype-prism-plus';

// https://astro.build/config
export default defineConfig({
  site: "https://feedphilly.org",
  image: {
    domains: ["images.unsplash.com"],
  },
  prefetch: true,
  integrations: [
    tailwind(),
    sitemap(),
    compressor({
      gzip: false,
      brotli: true,
    }),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [rehypePrism],
      extendMarkdownConfig: true,
      gfm: true,
      smartypants: true,
    }),
  ],
  experimental: {
    clientPrerender: true,
  },
  markdown: {
    remarkPlugins: [remarkGfm],
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  // Add path aliases to match tsconfig.json
  vite: {
    resolve: {
      alias: {
        "@": "/src",
        "@components": "/src/components",
        "@content": "/src/content",
        "@data": "/src/data_files",
        "@images": "/src/images",
        "@scripts": "/src/assets/scripts",
        "@styles": "/src/assets/styles",
        "@utils": "/src/utils"
      }
    }
  }
});
