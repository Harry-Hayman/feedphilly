import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import netlify from "@astrojs/netlify";
import react from "@astrojs/react";
import rehypeMarkdownImages from "./src/utils/rehype-markdown-images.mjs";
import { fileURLToPath } from 'url';

// https://astro.build/config
export default defineConfig({
  site: 'https://feedphillycoalition.org',
  output: 'static',
  adapter: netlify(),
  integrations: [
    tailwind({
      // Ensure Tailwind classes are processed
      applyBaseStyles: false,
    }),
    mdx({
      // Enable MDX features
      syntaxHighlight: 'prism',
      remarkPlugins: ['remark-gfm'],
      rehypePlugins: ['rehype-prism-plus']
    }),
    // React powers the Keystatic admin UI only. No site page ships React.
    // The Keystatic routes themselves are hand wired in src/pages/keystatic
    // and src/pages/api/keystatic rather than injected from node_modules.
    react(),
    sitemap({
      // The CMS is not site content: keep it out of the sitemap.
      filter: (page) => !page.includes('/keystatic'),
    })
  ],
  // Blog posts are plain .md, so their pipeline is configured here. The
  // rehypePlugins on the mdx() integration above only ever applied to .mdx
  // files, of which the site has none.
  markdown: {
    rehypePlugins: [rehypeMarkdownImages],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    },
    // Optimize image quality and formats
    format: ['avif', 'webp'],
    quality: 80,
    minimumDimensions: true
  },
  compressHTML: true,
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
        '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
        '@data': fileURLToPath(new URL('./src/data_files', import.meta.url)),
        '@images': fileURLToPath(new URL('./src/images', import.meta.url)),
        '@scripts': fileURLToPath(new URL('./src/assets/scripts', import.meta.url)),
        '@styles': fileURLToPath(new URL('./src/assets/styles', import.meta.url)),
        '@utils': fileURLToPath(new URL('./src/utils', import.meta.url))
      }
    },
    build: {
      cssCodeSplit: true,
      assetsDir: '_astro',
      // Astro's default hashed chunk/asset names are kept on purpose: the
      // previous custom `manualChunks` forced every dependency into one
      // "vendor" bundle, which defeats route level code splitting and breaks
      // the server build the Keystatic routes need.
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    },
    css: {
      postcss: {
        plugins: async () => [
          (await import('tailwindcss')).default,
          (await import('autoprefixer')).default,
          (await import('cssnano')).default({
            preset: ['default', {
              discardComments: { removeAll: true },
              normalizeWhitespace: true
            }]
          })
        ],
      },
    }
  }
});
